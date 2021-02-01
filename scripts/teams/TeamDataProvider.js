import {getPlayers, getPlayersByTeamId} from '../players/PlayersDataProvider.js'
import {getScores} from '../scores/ScoreDataProvider.js'

let teamCollection = []
let fullTeams = []

export const useTeams = () => {
  return teamCollection.slice()
}
export const useFullTeams = () =>{
  return fullTeams
}

export const getTeams = () => {
  return fetch("http://localhost:8088/teams")
    .then(response => response.json())
    .then(parsedTeams => {
      teamCollection = parsedTeams
    })
}


export const getFullTeams = () =>{
  return getScores().then(getTeams).then(getPlayers).then(()=>{
    for(const team of teamCollection){
      if(getPlayersByTeamId(team.id).length === 3){
          fullTeams.push(team)
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