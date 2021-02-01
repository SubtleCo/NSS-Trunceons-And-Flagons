let players = []

export const usePlayers = () => {
    return players.slice()
}


export const getPlayers = () => {
    return fetch('http://localhost:8088/players')
        .then(response => response.json())
        .then(parsedPlayers => {
            players = parsedPlayers
        })

}

export const savePlayer = player => {
    return fetch('http://localhost:8088/players', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(player)
    })
    .then(getPlayers)
}

export const getPlayersByTeamId = teamId => {
    return players.filter(player => player.teamId === teamId)
}