import { ScoreTable } from "../scores/ScoreTable";

const bannerElement = document.querySelector(".banner")
const formElement = document.querySelector('.form')
const tableElement = document.querySelector('.table')
const eventHub = document.querySelector('#container')

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
            <p id="scoreCard__team1--role">Knights</p>
            <p id="scoreCard__team2--role">Fairies</p>
            <p id="scoreCard__team3--role">Goblins</p>
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
            displayScores()
            LiveGame(2)
        } else if (currentRound === 2) {
            calculateScores()
            displayScores()
            LiveGame(3)
        } else if (currentRound === 3) {
            calculateScores()
            saveScores()
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
    team1Name = getTeamName(team1ID)
    team2Name = getTeamName(team2ID)
    team3Name = getTeamName(team3ID)
    console.log(team3ID)
    LiveGame()
})

const displayScores = () => {
    const currentScore = {
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
        },
    }
    ScoreTable(currentScores)
}