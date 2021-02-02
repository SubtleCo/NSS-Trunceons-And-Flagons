import { Score } from './Score.js'
const eventHub = document.querySelector('#container')

let scoreCollection = []

export const getScores = () => {
    return fetch("http://localhost:8088/scores")
        .then(res => res.json())
        .then(parsedScore => {
            scoreCollection = parsedScore
        })
}

export const useScores = () => {
    return scoreCollection.slice()
}

const saveScore = (score) => {
    fetch("http://localhost:8088/scores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify(score)
    })
}


eventHub.addEventListener("saveScoresRequested", e => {
    const gameScore = e.detail
    const team1Score = Score(gameScore.team1ID, gameScore.team1Score)
    const team2Score = Score(gameScore.team2ID, gameScore.team2Score)
    const team3Score = Score(gameScore.team3ID, gameScore.team3Score)
    saveScore(team1Score)
    saveScore(team2Score)
    saveScore(team3Score)
})
