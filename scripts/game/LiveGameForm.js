import { ScoreTable } from "../scores/ScoreTable.js";

const bannerElement = document.querySelector(".banner")
const formElement = document.querySelector('.form')
const eventHub = document.querySelector('#container')
const winnerElement = document.querySelector(".winner")
const tieElement = document.querySelector(".tie")

// Keep track of current round and scores

let currentRound = 1;

let team1Score = 0;
let team2Score = 0;
let team3Score = 0;

let team1ID = 0;
let team2ID = 0;
let team3ID = 0;

let team1Name = "";
let team2Name = "";
let team3Name = "";

const zeroScores = () => {
    team1Score = 0;
    team2Score = 0;
    team3Score = 0;
}

const roles = [
    'Knights',
    'Fairies',
    'Goblins',
    'Knights',
    'Fairies'
]

//HTML for a live game, dynamic with current round number

// We need to dynamically rotate the team roles each round
const LiveGameForm = (round) => {
    return `
    <form action="" class="liveGameForm">
    <article class='scoreCard'>
        <div class="scoreCard__col teamNames">
            <h3 class="scoreCard__banner--teams">Teams</h3>
            <p id="scoreCard__team1--name">${team1Name}</p>
            <p id="scoreCard__team2--name">${team2Name}</p>
            <p id="scoreCard__team3--name">${team3Name}</p>
        </div>
        <div class="scoreCard__col teamRoles">
            <h3 class="scoreCard__banner--roles">Current Role</h3>
            <p id="scoreCard__team1--role">${roles[-1 + round]}</p>
            <p id="scoreCard__team2--role">${roles[0 + round]}</p>
            <p id="scoreCard__team3--role">${roles[1 + round]}</p>
        </div>
        <div class="scoreCard__col teamScores">
            <h3 class="scoreCard__banner--scores">Enter your round score:</h3>
            <input type="number" name="team1Score" id="team1Score" value="0">
            <input type="number" name="team2Score" id="team2Score" value="0">
            <input type="number" name="team3Score" id="team3Score" value="0">
        </div>
    </article>
    <button id="endRound">${round === 3 ? "End Game" : "End Round " + round}</button>
</form>`
}

// This function replaces the ".form" section with a live game.

// This will need to know teamIDs. If no round parameter is passed in, it'll default as round 1
const LiveGame = (round = 1) => {
    currentRound = round
    bannerElement.innerHTML = `Round ${round}`
    const liveGameForm = LiveGameForm(round)
    render(liveGameForm)
    displayScores()
}

const render = (liveGameForm) => {
    formElement.innerHTML = liveGameForm
}

/* Logic for how to handle each "endRound" click, including 
updating the current scores and moving to the next round 
or ending the game, saving the score, and going home */

eventHub.addEventListener("click", e => {
    if (e.target.id === "endRound") {
        e.preventDefault()
        if (currentRound === 1){
            calculateScores()
            LiveGame(2)
        } else if (currentRound === 2) {
            calculateScores()
            LiveGame(3)
        } else if (currentRound === 3) {
            saveScores()
            findWinner()
            zeroScores()
            goHome()
        }
    }
})

// grabbing score from inputs and adding to team score, parsing to integer from HTML
const calculateScores = () => {
    team1Score += parseInt(document.getElementById("team1Score").value)
    team2Score += parseInt(document.getElementById("team2Score").value)
    team3Score += parseInt(document.getElementById("team3Score").value)
}

// dispatch "appStateDefault"

const goHome = () => {
    const customEvent = new CustomEvent("appStateDefault")
    eventHub.dispatchEvent(customEvent)
}

// dispatch "saveScoresRequested" event with team & score data

const saveScores = () => {
    const customEvent = new CustomEvent("saveScoresRequested", {
        detail: {
            team1ID: team1ID,
            team1Score: team1Score,
            team2ID: team2ID,
            team2Score: team2Score,
            team3ID: team3ID,
            team3Score: team3Score
        }
    })
    eventHub.dispatchEvent(customEvent)
}

eventHub.addEventListener("startNewGame", e => {
    team1ID = e.detail.team1ID
    team2ID = e.detail.team2ID
    team3ID = e.detail.team3ID
    team1Name = e.detail.team1Name
    team2Name = e.detail.team2Name
    team3Name = e.detail.team3Name
    LiveGame()
})

const currentScore = () => {
    return {
        team1: {
            name: team1Name,
            score: team1Score
        },
        team2: {
            name: team2Name,
            score: team2Score
        },
        team3: {
            name: team3Name,
            score: team3Score
        }
    }
}

const displayScores = () => {
    const score = currentScore()
    ScoreTable(score)
}

const findWinner = () => {
    const scores = [team1Score, team2Score, team3Score]
    const sortedScores = scores.sort((a,b) => b-a)
    if (checkForTie(sortedScores)) {
        announceTie()
    } else {
        if (sortedScores[0] === team1Score) {
            announceWinner(team1Name)
        } else if (sortedScores[0] === team2Score) {
            announceWinner(team2Name)
        } else if (sortedScores[0] === team3Score) {
            announceWinner(team3Name)
        }
    }
}

const announceWinner = team => {
    winnerElement.innerHTML = `Congratulations to team ${team}, who probably made the other teams cry. You win!`
}
const announceTie = () => {
    tieElement.innerHTML = `There was a tie. No one won. No one is better than anyone else. All is full of love.`
}


const checkForTie = sortedScores => {
    if (sortedScores[0] === sortedScores[1]) return true
    return false
}