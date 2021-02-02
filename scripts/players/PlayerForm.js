import { getTeams, useTeams } from "../teams/TeamDataProvider.js"
import { getPlayersByTeamId, savePlayer } from "./PlayersDataProvider.js"
import {playerList} from "./PlayerList.js"

let teamArray = []

const contentTarget = document.querySelector(".form")
const eventHub = document.querySelector("#container")

export const render = (teams) => {
    let joinableTeams = []
    for(const team of teams){
        if(getPlayersByTeamId(team.id).length < 3){
            joinableTeams.push(team)
            
        }
    }
    contentTarget.innerHTML = `
        <label for="playerFirstName">First Name</label>
        <input type="text" name="playerFirstName" id="playerFirstName">
        <label for="playerLastName">Last Name</label>
        <input type="text" name="playerLastName" id="playerLastName">
        <label for="playerCountry">Country</label>
        <input type="text" name="playerCountry" id="playerCountry">
        <select class="dropdown" id="teamSelect">
            <option value="0">Please select a Team</option>
            ${joinableTeams.map(team => `<option value="${team.id}">${team.teamName}</option>`).join("")}  
        </select>
        <button id="savePlayer" value="savePlayer">Join Team</button>  
        <button id="playerForm__cancelButton">Cancel</button>        
    `
    // console.log(joinableTeams)
}

eventHub.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "teamSelect") {
        const selectedTeamId = changeEvent.target.value
        playerList(parseInt(selectedTeamId))
    }
})

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "savePlayer"){
        const firstName = document.querySelector("#playerFirstName").value
        const lastName = document.querySelector("#playerLastName").value 
        const country = document.querySelector("#playerCountry").value 
        const teamId = parseInt(document.querySelector("#teamSelect").value)
        if(firstName !== "" && lastName !== "" && country !== "" && teamId !== "0"){
            const player = {
                firstName : firstName,
                lastName : lastName,
                country : country,
                teamId : teamId
            }
            const customEvent = new CustomEvent("teamSetupState")
            eventHub.dispatchEvent(customEvent);
            
            // alert("saved player")
            savePlayer(player)
        }else{
        alert("please fill out forms")
        }
    }
})

eventHub.addEventListener("click", e => {
    if (e.target.id === "playerForm__cancelButton") {
      const customEvent = new CustomEvent("teamSetupState")
      eventHub.dispatchEvent(customEvent)
    }
  })

eventHub.addEventListener("newPlayerRequested", event =>{

    getTeams().then(()=>{
        teamArray = useTeams()
        render(teamArray)
    })
})




