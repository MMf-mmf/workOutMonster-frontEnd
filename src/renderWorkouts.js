
let newChallengeResults
function timerInputField() {
  const timertext = document.querySelector('#base-timer-label')
   
    const timerDiv = document.querySelector('.base-timer')
    const timerForm = document.createElement('form')
    timerForm.classList = "timer-form"

    // fetch(`http://localhost/challenges/${challengeID}`)
    // .then(response => response)
    // .then(challenge => {

   if (challengeID  == 2) {
    TIME_LIMIT = 600
    timeLeft = 600
    timePassed = 0
    timertext.textContent = "10:00"
    timerForm.innerHTML =  `
    <div class="col-auto">
    <label for="quantity">Push up total</label>
    <input type="number" id="weight" name="pushUps" min="75" max="500"  class="form-control"  placeholder="Enter total push ups">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>`
  
    timerDiv.append(timerForm)
    const inputField = document.querySelector('form')
   
    inputField.addEventListener('submit', event => {
      event.preventDefault()
      const reps = event.target.pushUps.value
      
     newChallengeResults = {challenge_id: challengeID, athlete_id: athleteID, reps }
    //  console.log(newChallengeResults)
      fetch("http://localhost:3000/attempts",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newChallengeResults)
    })
    .then(resp => resp.json())
    .then(updatedChallenge => {
      clearInterval(timerInterval)
      console.log(updatedChallenge)
      backToHomePage(message = `great job ${athleteObject.name}`)
    })
  
    })

   }else if (challengeID  == 1) {
      timePassed = 0
    timerForm.innerHTML =  `
    <div class="col-auto">
    <label for="quantity">Squat weight</label>
    <input type="number" id="weight" name="squat" min="100" max="1500"  class="form-control"  placeholder="Enter squat weight">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>`
  
    timerDiv.append(timerForm)
    const inputField = document.querySelector('form')
   
    inputField.addEventListener('submit', event => {
      event.preventDefault()
      const weight = parseInt(event.target.squat.value)
      
     newChallengeResults = {challenge_id: challengeID, athlete_id: athleteID, weight}
    //  console.log(newChallengeResults)
      fetch("http://localhost:3000/attempts",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newChallengeResults)
    })
    .then(resp => resp.json())
    .then(updatedChallenge => {
      clearInterval(timerInterval)
      console.log(updatedChallenge)
      backToHomePage(message = `great job ${athleteObject.name}`)
    })
  
    })
   }else if (challengeID == 3) {
     timePassed = 0
    const timeVal = document.querySelector("#base-timer-label")
    timerForm.innerHTML =  `
    <button type="submit" class="btn btn-primary">Done</button>`
  
    timerDiv.append(timerForm)
    const doneButton = document.querySelector('#app > div > form > button')
   
    doneButton.addEventListener('click', event => {
    console.log(timePassed)
      const time = parseInt(timePassed)
      
     newChallengeResults = {challenge_id: challengeID, athlete_id: athleteID, time }
     
     console.log(newChallengeResults)
      fetch("http://localhost:3000/attempts",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newChallengeResults)
    })
    .then(resp => resp.json())
    .then(updatedChallenge => {
      clearInterval(timerInterval)
      console.log(updatedChallenge)
      backToHomePage(message = `great job ${athleteObject.name}`)
    })
  
    })
   }

    
    
// })
  }