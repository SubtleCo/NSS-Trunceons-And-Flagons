import { getTeams, saveTeam, useTeams } from "./TeamDataProvider.js"

const eventHub = document.querySelector("#container")
const formContent = document.querySelector(".form")
const tableContent = document.querySelector(".table")

const TeamForm = () => {
  formContent.innerHTML = `
    <div class="form form__team">
      <label for="teamName">Team Name: </label>
      <input type="text" name="teamName" id="form__teamName" autocomplete="off">
    </div>
    <div class="form__submit">
      <input id="form__teamNameSubmit" type="submit" value="Start a New Team">
    </div>
  `
  let teamTableData = []
  const teamList = getTeams()
    .then(() => {
      const teamCollection = useTeams()

      teamTableData = teamCollection.map(team => {
        return `
        <tr><td>${team.teamName}</td></tr>
        `
      }).join("")
    })
    .then(() => {
      tableContent.innerHTML = `
        <div class="table table__team">
          <table>
            <tr><th>All Team Names</th></tr>
            ${teamTableData}
          </table>
        </div>
      `
    })

}

eventHub.addEventListener("click", e => {
  if (e.target.id === "form__teamNameSubmit") {
    let newTeam = {
      teamName: document.getElementById("form__teamName").value,
      timestamp: new Date()
    }

    saveTeam(newTeam)

    const customEvent = new CustomEvent("appStateDefault")
    eventHub.dispatchEvent(customEvent)
  }
})

eventHub.addEventListener("newTeamRequested", e => {
  TeamForm()
})