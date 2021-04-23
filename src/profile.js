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
        renderEditProfileForm()
    })
    dynamicContentBody.append(editProfileButtonElement)
}

function renderEditProfileForm() {
    dynamicContentBody.innerHTML= ""
    let formElement = document.createElement('form')
    formElement.innerHTML =`
    <h4>Enter desired changes below</h4>
    <input type="text" name="name" placeholder="Enter Name" value="" />
    <input type="text" name="email" placeholder="Enter Email" value="" />
    <input type="text" name="password" placeholder="New Password" value="" />
    <input type="integer" name="age" placeholder="Age" value="" />
    <input type="integer" name="height_in_inches" placeholder="Height (inches)" value="" />
    <input type="integer" name="weight_in_lbs" placeholder="Weight (lbs)" value="" />
    <input type="submit" value="Submit Changes" />
    `
  formElement.addEventListener('submit', event =>{
        event.preventDefault()
        updateProfile(event)
    })
    dynamicContentBody.append(formElement)

}

function updateProfile(event) {
    console.log(event.target.name.value)
}