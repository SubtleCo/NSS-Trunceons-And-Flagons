import {getPlayers, getPlayersByTeamId} from '../players/PlayersDataProvider.js'
import {getScores} from '../scores/ScoreDataProvider.js'
import { GameSetup } from "../game/GameSetupForm.js"

const eventHub = document.querySelector("#container")

let teamCollection = []
let fullTeams = []

export const useTeams = () => {
  return teamCollection.slice()
}
export const useFullTeams = () =>{
  return fullTeams.slice()
}

export const getTeams = () => {
  return fetch("http://localhost:8088/teams")
    .then(response => response.json())
    .then(parsedTeams => {
      teamCollection = parsedTeams
    })
}


export const getFullTeams = () =>{
  fullTeams = []
  return getScores().then(getTeams).then(getPlayers).then(()=>{
    for(const team of teamCollection){
      if(getPlayersByTeamId(team.id).length === 3){
        if (fullTeams.includes(team) === false){
          fullTeams.push(team)
        }
      }
    }
  })
}

export const saveTeam = (teamName) => {
  fetch("http://localhost:8088/teams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(teamName)
  })
    .then(getTeams)
}

export const getTeamName = (id) => {
  const foundTeam = teamCollection.find(team => team.id === id)
  return foundTeam.teamName
}

eventHub.addEventListener("teamStateChanged", e => {
  getFullTeams()
})