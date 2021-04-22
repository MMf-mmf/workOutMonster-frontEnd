function timerInputField() {
    const timerDiv = document.querySelector('.base-timer')
    const timerForm = document.createElement('form')

    // fetch(`http://localhost/challenges/${challengeID}`)
    // .then(response => response)
    // .then(challenge => {


   if (challengeID  == 2) {
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
      
     const newChallengeResults = {challenge_id: challengeID, athlete_id: athleteID, reps }
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
      console.log(updatedChallenge)
      backToHomePage(message = `great job ${athleteObject.name}`)
    })
  
    })

   }else if (challengeID  == 1) {
      
    timerForm.innerHTML =  `
    <div class="col-auto">
    <label for="quantity">Squat weight</label>
    <input type="number" id="weight" name="squat" min="7" max="20"  class="form-control"  placeholder="Enter squat weight">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>`
  
    timerDiv.append(timerForm)
    const inputField = document.querySelector('form')
   
    inputField.addEventListener('submit', event => {
      event.preventDefault()
      const max_weight = event.target.squat.value
      
     const newChallengeResults = {challenge_id: challengeID, athlete_id: athleteID, max_weight }
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
      console.log(updatedChallenge)
      backToHomePage(message = `great job ${athleteObject.name}`)
    })
  
    })
   }

    
    
// })
  }