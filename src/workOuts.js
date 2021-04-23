const sideBar = document.querySelector("#sidebar")
const sideBarChallengeUl = document.querySelector("#pageSubmenu")
const dynamicContentBody = document.querySelector("#app")
const workoutList = document.querySelector('#workout-list > a')
// let currentLeaderBoardArray
// let currentChallenge



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

// workoutCardListener()
function workoutCardListener() {
    dynamicContentBody.addEventListener('click', event => {
        if (event.target.matches('.card') || event.target.matches('h1')) {  // && !athleteID   test if user is Logged in before allowing 
            challengeID = event.target.dataset.id
           clearPage()
        //    console.log(event.target)
        //    console.log(event.target.dataset.id)
           fetch(`http://localhost:3000/challenges/${event.target.dataset.id}`)
            .then(response => response.json())
            .then(challenge => {currentChallenge = challenge
                console.log(currentChallenge)
                // console.log(checkProperties(challenge))
                if (challenge.max_time == 5 || challenge.max_time == 15) {
                    dynamicContentBody.innerHTML = `<div class="challengeDetails">
                <h1 id="challengeDetails">${challenge.name}</h1>
                <hr>
                <h4>Your Task:</h4>
                <p>${challenge.description}</p>
                <hr>
                <h4>Skill Level:</h4>
                ${challenge.skill_level}
                <br>
                <hr>
                <h4>Muscle Group:</h4>
                ${challenge.muscle_group}
               <hr></div>

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
                </div><hr>
                <div>
                <h6>Muscle Group:</h6>
                ${challenge.muscle_group}
                </div><hr>
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
                attemptButton.innerText = "Attempt This Challenge"
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
    <h1 data-id = "${challenge.id}">${challenge.name}</h1>

    Your task:<br>
    ${challenge.description}<br>
    </div>`
    cardDiv.addEventListener('click', event => {
        fetch(`http://localhost:3000/challenges/rankings/${challenge.id}`)
        .then(response => response.json())
        .then(leaderBoardArray => {
            currentLeaderBoardArray = leaderBoardArray.sort((a, b) => (a.score > b.score) ? 1 : -1).reverse()
            console.log(currentLeaderBoardArray)
        })
        
    })
    dynamicContent.append(cardDiv)
}