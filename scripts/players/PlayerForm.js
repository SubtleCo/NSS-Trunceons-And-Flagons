const teamArray = [{
    id : 1,
    name : "griffons",
    date : "today"
},
{
    id : 2,
    name : "buffoons",
    date : "today"
},
{
    id : 1,
    name : "toads",
    date : "today"
},
{
    id : 1,
    name : "squirrels",
    date : "today"
},
]

const contentTarget = document.querySelector(".form")
const eventHub = document.querySelector("#container")

export const render = (teams) => {
    contentTarget.innerHTML = `
        <label for="playerFirstName">First Name</label>
        <input type="text" name="playerFirstName" id="playerFirstName">
        <label for="playerLastName">Last Name</label>
        <input type="text" name="playerLastName" id="playerLastName">
        <label for="playerCountry">Country</label>
        <input type="text" name="playerCountry" id="playerCountry">
        <select class="dropdown" id="teamSelect">
            <option value="0">Please select a Team</option>
            ${teams.map(team => `<option value="${team.id}">${team.name}</option>`)}  
        </select>
        <button id="savePlayer" value="savePlayer">Join Team</button>  
        <button id="playerForm__cancelButton">Cancel</button>        
    `
}

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "savePlayer"){
        const firstName = document.querySelector("#playerFirstName").value
        const lastName = document.querySelector("#playerLastName").value 
        const country = document.querySelector("#playerCountry").value 
        const teamId = document.querySelector("#teamSelect").value 
        if(firstName !== "" && lastName !== "" && country !== "" && teamId !== "0"){
            const player = {
                firstName : firstName,
                lastName : lastName,
                country : country,
                teamId : teamId
            }
            alert("saved player")
            //savePlayer(player)
            const customEvent = new CustomEvent("appStateDefault", {})
            //appStateDefault
            eventHub.dispatchEvent(customEvent);
            
        }else{
        alert("please fill out forms")
        }
    }
})

eventHub.addEventListener("click", e => {
    if (e.target.id === "playerForm__cancelButton") {
      const customEvent = new CustomEvent("appStateDefault")
      eventHub.dispatchEvent(customEvent)
    }
  })

eventHub.addEventListener("newPlayerRequested", event =>{
    //get teams
    //render teams
    render(teamArray)
})




