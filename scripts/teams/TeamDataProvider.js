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