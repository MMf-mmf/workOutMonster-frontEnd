const profileButtonElement = document.querySelector("#profile")

profileButtonElement.addEventListener('click', event =>{
    renderAthleteInfo(athleteObject)
    addEditButton()
})

function renderAthleteInfo(athlete) {
    dynamicContentBody.innerHTML =`<div class="profile-details">
    <h4>Name: ${athlete.name}</h4>
    <h4>Email: ${athlete.email}</h4>
    <h4>Password: (hidden)</h4>
    <h4>Age: ${athlete.age}</h4>
    <h4>Height(in): ${athlete.height_in_inches}</h4>
    <h4>Weight(lbs): ${athlete.weight_in_lbs}</h4>
    </div>
`
}

function addEditButton() {
    let editProfileButtonElement = document.createElement('button')
    editProfileButtonElement.dataset.type = "button"
    editProfileButtonElement.innerText = "Edit Your Profile"
    editProfileButtonElement.addEventListener('click', event => {
        
    })
    dynamicContentBody.append(editProfileButtonElement)
}