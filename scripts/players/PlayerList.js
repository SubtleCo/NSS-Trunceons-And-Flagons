import  { getPlayers, getPlayersByTeamId } from "./PlayersDataProvider.js"
const eventHub = document.querySelector("#container")
const tableContent = document.querySelector(".table")




export const playerList = (teamId) =>{
    let playerTableData = []
      getPlayers()
        .then(() => {
          const playerCollection = getPlayersByTeamId(teamId)
    
          playerTableData = playerCollection.map(player => {
            return `
            <tr><td>${player.firstName} </td></tr>
            `
          }).join("")
        })
        .then(() => {
          tableContent.innerHTML = `
            <div class="table table__team">
              <table>
                <tr><th>Players</th></tr>
                ${playerTableData}
              </table>
            </div>
          `
        })

}
