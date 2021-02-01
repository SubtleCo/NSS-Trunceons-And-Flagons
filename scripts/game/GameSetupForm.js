import { getTeams, useTeams, getTeamName } from "../teams/TeamDataProvider.js"
import { getScores, useScores } from "../scores/ScoreDataProvider.js"


const bannerElement = document.querySelector(".banner")
const formElement = document.querySelector('.form')
const eventHub = document.querySelector('#container')
const tableElement = document.querySelector(".table")

const GameSetupForm = (fullTeams) => {
    return `
        <form action="" class="setupForm">
        <article class="setupForm__teamSelect">
            <div class="teamSelect__team1">
                <label for="team1Select">Team One:</label>
                <select name="team1Select" id="team1Select">
                    <option value="0">select a team...</option>
                    ${fullTeams.map(team => `<option value="${team.id}">${team.teamName}</option>`).join("")}
                </select>
            </div>
            <div class="teamSelect__team2">
                <label for="team2Select">Team Two:</label>
                <select name="team2Select" id="team2Select">
                    <option value="0">select a team...</option>
                    ${fullTeams.map(team => `<option value="${team.id}">${team.teamName}</option>`).join("")}
                </select>
            </div>
            <div class="teamSelect__team3">
                <label for="team3Select">Team Three:</label>
                <select name="team3Select" id="team3Select">
                    <option value="0">select a team...</option>
                    ${fullTeams.map(team => `<option value="${team.id}">${team.teamName}</option>`).join("")}
                </select>
            </div>
        </article>
        <div class="setupForm__buttons">
            <button class="setupButton" id="startNewTeam">Start a New Team</button>
            <button class="setupButton" id="joinTeam">Join a Team</button>
            <button class="setupButton" id="startGame">Start A Game</button>
        </div>
        </form>` 
}

const GameSetupTable = () => {
    getTeams()
        .then(getScores())
        .then(() => {
            let teamsWithScores = []
            const teamsArr = useTeams()
            const scoresArr = useScores()

            for (const team of teamsArr) {
                let teamScore = 0
                for (const score of scoresArr) {
                    if (team.id === score.teamID) {
                        teamScore += score.teamScore
                    }
                }
                const teamWithScore = {
                    "teamName": team.teamName,
                    "totalScore": teamScore
                }
                teamsWithScores.push(teamWithScore)
            }

            let leaderboardsTableData = `
            ${teamsWithScores.map(team => {
                return `
                <tr><td>${team.teamName}</td><td>${team.totalScore}</td></tr>
                `
            }).join("")}
            `

            tableElement.innerHTML = `
            <div class="table__leaderboards">
                <table>
                    <tr><th>Leaderboards</th></tr>
                    ${leaderboardsTableData}
                </table>
            </div>
            `
        })
}


eventHub.addEventListener("click", e => {
    if (e.target.id === "startNewTeam") {
        e.preventDefault()
        // alert("Launch New Team Form")
        const customEvent = new CustomEvent("newTeamRequested")
        eventHub.dispatchEvent(customEvent)
    }
})
eventHub.addEventListener("click", e => {
    if (e.target.id === "joinTeam") {
        e.preventDefault()
        // alert("Launch New Player Form")
        const customEvent = new CustomEvent("newPlayerRequested")
        eventHub.dispatchEvent(customEvent)
    }
})
eventHub.addEventListener("click", e => {
    if (e.target.id === "startGame") {
        e.preventDefault()
        const team1 = parseInt(document.querySelector("#team1Select").value)
        const team2 = parseInt(document.querySelector("#team2Select").value)
        const team3 = parseInt(document.querySelector("#team3Select").value)
        if (allTeamsChosen(team1, team2, team3)) {
            if (areUnique(team1, team2, team3)) {
                const cE = new CustomEvent("startNewGame", {
                    detail: {
                        team1ID: team1,
                        team1Name: getTeamName(team1),
                        team2ID: team2,
                        team2Name: getTeamName(team2),
                        team3ID: team3,
                        team3Name: getTeamName(team3)
                    }
                })
                eventHub.dispatchEvent(cE)
            } else {
                alert("Teams cannot play themselves. Well, not easily, anyway.")
            }
        } else {
            alert("Please pick 3 teams. Not 2 or 1 or 0.")
        }
    }
})

const areUnique = (a,b,c) => {
    if (a === b) return false
    if (a === c) return false
    if (b === c) return false
    return true
}

const allTeamsChosen = (a,b,c) => {
    if (a === "0") return false
    if (b === "0") return false
    if (c === "0") return false
    return true
}

//Listen for "appStateDefault"
eventHub.addEventListener("appStateDefault", e => {
    GameSetup()
})


export const GameSetup = () => {
    bannerElement.innerHTML = "Select teams for a new game"

    let allTeams = []
    let fullTeams = []
    getTeams()
        .then(()=>{
            allTeams = useTeams()
            fullTeams = [...allTeams]
            formElement.innerHTML = GameSetupForm(fullTeams)
        })
    GameSetupTable()
}

