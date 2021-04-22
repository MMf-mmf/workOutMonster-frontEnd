const sideBar = document.querySelector("#sidebar")
const sideBarChallengeUl = document.querySelector("#pageSubmenu")
const dynamicContentBody = document.querySelector("#app")
const workoutList = document.querySelector('#workout-list > a')
let currentLeaderBoardArray
let currentChallenge


// function sideBarEventListener() {
//     sideBar.addEventListener('click', event => {
//         if (event.target.id == "workout-1") {

//         }
//     })
// }


function workoutsChallengesEventListener() {
    workoutList.addEventListener('click', event => {
        clearPage()
        renderAllWorkOuts()
    })
}

function renderAllWorkOuts() {
         fetch('http://localhost:3000/challenges')
               .then(response => response.json())
               .then(workOutArray => {
                workOutArray.forEach(challenge => {
                    showChallenge(challenge)
                })
                workoutCardListener()
               }) 
}

function workoutCardListener() {
    dynamicContentBody.addEventListener('click', event => {
        if (event.target.matches('.card')) {
           clearPage()
           setTimeout
           console.log(event.target)
           console.log(event.target.dataset.id)
           fetch(`http://localhost:3000/challenges/${event.target.dataset.id}`)
            .then(response => response.json())
            .then(challenge => {currentChallenge = challenge
                console.log(currentChallenge)
                // console.log(checkProperties(challenge))
                if (challenge.max_time == 5) {
                    dynamicContentBody.innerHTML = `
                <h1>${challenge.name}</h1>
                <div>
                <h6>Your Task:</h6>
                ${challenge.description}
                </div><br>
                <div>
                <h6>Max Time Allowed:</h6>
                ${challenge.max_time} Minutes
                </div><br>
                <div>
                <h6>Skill Level:</h6>
                ${challenge.skill_level}
                </div><br>
                <div>
                <h6>Muscle Group:</h6>
                ${challenge.muscle_group}
                </div><br>
                `
                }

                if (challenge.name == "Bodyweight Plank Hold" ) {
                    dynamicContentBody.innerHTML = `
                <h1>${challenge.name}</h1>
                <div>
                <h6>Your Task:</h6>
                ${challenge.description}
                </div><br>
                <h6>Skill Level:</h6>
                ${challenge.skill_level}
                </div><br>
                <div>
                <h6>Muscle Group:</h6>
                ${challenge.muscle_group}
                </div><br>
                `
                }

                let leaderboard = document.createElement('table')
                let toptrElement = document.createElement('tr')

                if (challenge.max_time == 5) {
                let fields = ["Name", "Best Attempt (Reps)", "Faceoff Point Ranking"]
                fields.forEach( field => {
                    let topthElement = document.createElement('th')
                    topthElement.innerText=`${field}`
                    toptrElement.append(topthElement)
                })
                leaderboard.append(toptrElement)
                dynamicContentBody.append(leaderboard)
                
                currentLeaderBoardArray.forEach( athlete => {
                    let newtrElement = document.createElement('tr')
                    let namethElm = document.createElement('th')
                    namethElm.innerText=`${athlete.name}`
                    newtrElement.append(namethElm)
                    let repAttemptElement = document.createElement('th')
                    repAttemptElement.innerText=`${athlete.reps}`
                    newtrElement.append(repAttemptElement)
                    let scoreElement = document.createElement('th')
                    scoreElement.innerText=`${(athlete.score +300).toFixed(2)}`
                    newtrElement.append(scoreElement)
                    leaderboard.append(newtrElement)
                } )
            }

            if (challenge.name == "Bodyweight Plank Hold") {
                let fields = ["Name", "Best Attempt (Seconds)", "Faceoff Point Ranking"]
                fields.forEach( field => {
                    let topthElement = document.createElement('th')
                    topthElement.innerText=`${field}`
                    toptrElement.append(topthElement)
                })
                leaderboard.append(toptrElement)
                dynamicContentBody.append(leaderboard)
                
                currentLeaderBoardArray.forEach( athlete => {
                    let newtrElement = document.createElement('tr')
                    let namethElm = document.createElement('th')
                    namethElm.innerText=`${athlete.name}`
                    newtrElement.append(namethElm)
                    let timeAttemptElement = document.createElement('th')
                    timeAttemptElement.innerText=`${athlete.time}`
                    newtrElement.append(timeAttemptElement)
                    let scoreElement = document.createElement('th')
                    scoreElement.innerText=`${(athlete.score +200).toFixed(2)}`
                    newtrElement.append(scoreElement)
                    leaderboard.append(newtrElement)
                } )
            }

                let attemptButton = document.createElement('button')
                attemptButton.dataset.type = "button"
                attemptButton.innerText = "Attempt This Challenge - NEW"
                dynamicContentBody.append(attemptButton)

            })

        //    timerFunction()
        }
    })
}


function fetchChallenges() {
    return fetch('http://localhost:3000/challenges')
           .then(response => response.json())
           .then(array => array) 
}

function renderChallengeLinks(array) {
    array.forEach( challenge => {
    let challengeLi = document.createElement('li')
    challengeLi.innerHTML =`<a data-id="${challenge.id}" href="#">${challenge.name}</a>`
    sideBarChallengeUl.append(challengeLi)
    challengeLi.addEventListener('click', event => {
        fetch(`http://localhost:3000/challenges/${challenge.id}`)
        .then(response => response.json())
        .then(challenge => {
            clearPage()
            showChallenge(challenge)   
        })
    })
    })
}


function showChallenge(challenge) {
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    
 
    cardDiv.dataset.id = challenge.id
    cardDiv.innerHTML=`
   
    <h1>${challenge.name}</h1>
    Your task:<br>
    ${challenge.description}<br>
    ${challenge.min_reps}<br>
    ${challenge.min_weight}<br>
    ${challenge.skill_level}<br>
    ${challenge.min_time}<br>
    ${challenge.max_time}<br>
    ${challenge.muscle_group}<br>
    ${challenge.image}<br>
    </div>`
    cardDiv.addEventListener('click', event => {
        fetch(`http://localhost:3000/challenges/rankings/${challenge.id}`)
        .then(response => response.json())
        .then(leaderBoardArray => {
            currentLeaderBoardArray = leaderBoardArray.sort((a, b) => (a.score > b.score) ? 1 : -1).reverse()
        })
        
    })
    dynamicContent.append(cardDiv)
}