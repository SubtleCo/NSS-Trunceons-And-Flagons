const BannerElement = document.querySelector(".banner")
const TableElement = document.querySelector(".table")
const FormElement = document.querySelector(".form")
const eventHub = document.querySelector("#container")

export const TeamSetup = () => {
  BannerElement.innerHTML = "Truncheons and Flagons"
  TableElement.innerHTML = ""
  FormElement.innerHTML = `
    <div class="setupForm__buttons">
      <button class="setupButton" id="startNewTeam">Start a New Team</button>
      <button class="setupButton" id="joinTeam">Join a Team</button>
      <button class="setupButton" id="gameSetup">Game Setup</button>
    </div>
  `
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
  if (e.target.id === "gameSetup") {
    e.preventDefault()
    const customEvent = new CustomEvent("appStateDefault")
    eventHub.dispatchEvent(customEvent)
  }
})

eventHub.addEventListener("teamSetupState", e => {
  TeamSetup()
})