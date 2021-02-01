import { getTeams, saveTeam, useTeams } from "./TeamDataProvider.js"

const eventHub = document.querySelector("#container")
const formContent = document.querySelector(".form")
const tableContent = document.querySelector(".table")
const bannerContent = document.querySelector(".banner")

const TeamForm = () => {
  bannerContent.innerHTML = "Create a New Team"

  formContent.innerHTML = `
    <div class="teamForm">
      <div class="teamForm__team">
        <label for="teamName">Team Name: </label>
        <input type="text" name="teamName" id="teamForm__teamName" autocomplete="off">
      </div>
      <div class="teamForm__buttons">
        <button id="teamForm__cancelButton">Cancel</button>
        <input id="teamForm__submitButton" type="submit" value="Start a New Team">
      </div>
    </div>
  `
  const teamList = getTeams()
    .then(() => {
      const teamCollection = useTeams()

      let teamTableData = teamCollection.map(team => {
        return `
        <tr><td>${team.teamName}</td></tr>
        `
      }).join("")

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
  if (e.target.id === "teamForm__submitButton") {
    if (document.querySelector("#teamForm__teamName").value !== "") {
      let newTeam = {
        teamName: document.getElementById("teamForm__teamName").value,
        timestamp: new Date()
      }
  
      saveTeam(newTeam)
  
      const customEvent = new CustomEvent("appStateDefault")
      eventHub.dispatchEvent(customEvent)
    } else {
      alert("Team Name Required")
    }
  }
})

eventHub.addEventListener("click", e => {
  if (e.target.id === "teamForm__cancelButton") {
    const customEvent = new CustomEvent("appStateDefault")
    eventHub.dispatchEvent(customEvent)
  }
})

eventHub.addEventListener("newTeamRequested", e => {
  TeamForm()
})