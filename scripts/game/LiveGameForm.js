const bannerElement = document.querySelector(".banner")
const formElement = document.querySelector('.form')
const eventHub = document.querySelector('#container')

// Keep track of current round and scores

let currentRound = 1;
let team1Score = 0;
let team2Score = 0;
let team3Score = 0;

//dummy Data for teamIDs
const team1ID = 1;
const team2ID = 2;
const team3ID = 3;

//HTML for a live game, dynamic with current round number
const LiveGameForm = (round) => {
    return `
    <form action="" class="liveGameForm">
    <article class='scoreCard'>
        <div class="scoreCard__col teamNames">
            <h3 class="scoreCard__banner--teams">Teams</h3>
            <p id="scoreCard__team1--name">Jim-Jams</p>
            <p id="scoreCard__team2--name">Flimpies</p>
            <p id="scoreCard__team3--name">Charmanders</p>
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
export const LiveGame = (round = 1) => {
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
            logScores()
            LiveGame(2)
        } else if (currentRound === 2) {
            calculateScores()
            logScores()
            LiveGame(3)
        } else if (currentRound === 3) {
            calculateScores()
            logScores()
            saveScores()
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

// just for testing purposes, delete later

const logScores = () => {
    console.log("Team 1 score is " + team1Score)
    console.log("Team 2 score is " + team2Score)
    console.log("Team 3 score is " + team3Score)
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