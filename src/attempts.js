let myAttemptsButton = document.querySelector("#sidebar > ul > li:nth-child(3) > a")
let filteredArray

myAttemptsButton.addEventListener('click', event => {
    console.log('attempts clicked')
    
    fetch(`http://localhost:3000/attempts`)
    .then(response => response.json())
    .then(array => {
        filteredArray = array.filter(attempt => attempt.athlete_id == athleteID)
        console.log(filteredArray)
    })
    
    dynamicContentBody.innerHTML=""
    let ulTag = document.createElement('ul')
    filteredArray.forEach(attempt => {
        let attemptLi = document.createElement('li')
        attemptLi.innerText = ``
        
    })

})
