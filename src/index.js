
const dynamicContent = document.querySelector(".dynamicContent")
let athleteID = null
let athleteObject
let challengeID = null
let currentLeaderBoardArray
let currentChallenge
topNavBarListener()
fetchChallenges().then(renderChallengeLinks)
workoutsChallengesEventListener()






















function topNavBarListener() {
    const topNavBar = document.querySelector(".container-fluid")
topNavBar.addEventListener('click', event => {
    if (event.target.matches("#sign-up")) {
        // clear page 
        clearPage()
        // render sign up form
        signUpForm()
    }else if (event.target.matches('#login')) {
      clearPage()
      logInForm()
    }
})
}

function signUpForm() {
    const signUpHtml = `<form class="sign-up-form">
  <div class="col-auto">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <div id="emailHelp" class="form-text"></div>
  </div>

  <div class="col-auto">
  <label>Name</label>
  <input type="text" name="name" class="form-control"  placeholder="Enter Name">
</div>

  <div class="col-auto">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Enter password">
  </div>

  <div class="col-auto">
  <label for="quantity">age</label>
  <input type="number" id="age" name="age" min="16" max="99"  class="form-control"  placeholder="Enter age">
</div>

<div class="col-auto">
<label for="quantity">weight</label>
<input type="number" id="weight" name="weight" min="100" max="500"  class="form-control"  placeholder="Enter weight in lb">
</div>


  <button type="submit" class="btn btn-primary">Submit</button>
</form>`
    dynamicContent.innerHTML = signUpHtml
    signUp()
}

function signUp() {
  //const signUpFormElement = document.querySelector(".dynamicContent")
  
  dynamicContent.addEventListener('submit', event => {
    event.preventDefault()
    const email = event.target.email.value
    const name = event.target.name.value
    const password = event.target.password.value
    const age = event.target.age.value
    const weight_in_lbs = event.target.weight.value
    const newAthleteObj = {email, name, password, age, weight_in_lbs}
    console.log(newAthleteObj)
    pushNewUserToDatabase(newAthleteObj)
  })
  
}

function logInForm() {
  dynamicContent.innerHTML = `<form class="log-in-form">
  <div class="col-auto">
  <label for="exampleInputEmail1" class="form-label">Email address</label>
  <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
  <div id="emailHelp" class="form-text"></div>
  </div>

  <div class="col-auto">
  <label for="exampleInputPassword1" class="form-label">Password</label>
  <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Enter password">
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
  </form>`
  pushLoginData()
} 

function pushLoginData() {
    dynamicContent.addEventListener('submit', event => {
      event.preventDefault()
      const email = event.target.email.value
      const password = event.target.password.value
      const loginFormData = {email, password}
      loginFetchRequest(loginFormData)
    })
}














function clearPage() {
    while (dynamicContent.firstChild) {
        dynamicContent.removeChild(dynamicContent.firstChild)
    }
}
function pushNewUserToDatabase(athleteObj) {
  // debugger
  fetch("http://localhost:3000/athletes",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(athleteObj)
  })
  .then(resp => resp.json())
  .then(newAthleteObj => {
    athleteID = newAthleteObj.id
    backToHomePage(message = newAthleteObj.name)
  })
}
function loginFetchRequest(loginFormData) {
  fetch("http://localhost:3000/athletes/login",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(loginFormData)
  })
  .then(resp => resp.json())
  .then(loggedInUser => {
    athleteID = loggedInUser.id
    athleteObject = loggedInUser
    backToHomePage(message = loggedInUser.name)
  })
  .catch(error => window.alert("Your username or password is incorrect. Please try again."))
}

function backToHomePage(message = nill) {

  
  if (message) {
    const sigUpElement = document.querySelector('#sign-up')
    const sigInElement = document.querySelector('#login')
    const profileElement = document.querySelector("#profile")
    const sigOutElement = document.querySelector('#log-out')

    sigInElement.style.display = 'none'
    sigUpElement.style.display = 'none'
    profileElement.style.display = 'block'
    sigOutElement.style.display = 'block'

    
    dynamicContent.innerHTML = `<p>Hello  ${message}</p>
    <p>Welcome to Faceoff - Iron Fist</p>
        <p><b>the place where "Some Quote"</b></p>`
  }else{
  dynamicContent.innerHTML = `<p>Welcome to Faceoff - Iron Fist</p>
                                <p><b>the place where "Some Quote"</b></p>`
  }
  
}



















// Side bar this will toggle the side par open and closed
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});



