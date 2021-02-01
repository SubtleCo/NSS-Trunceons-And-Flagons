import {getPlayersByTeamId} from '../players/PlayersDataProvider.js'

let teamCollection = []

export const useTeams = () => {
  return teamCollection.slice()
}

export const getTeams = () => {
  return fetch("http://localhost:8088/teams")
    .then(response => response.json())
    .then(parsedTeams => {
      teamCollection = parsedTeams
    })
}

export const fullTeams = () =>{
  getTeams().then(()=>{
    let fullTeams = []
    for(const team of teamCollection){
      if(getPlayersByTeamId(team.id).length === 3){
          fullTeams.push(team)
      }
      return fullTeams
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