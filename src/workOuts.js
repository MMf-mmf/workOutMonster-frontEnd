const sideBar = document.querySelector("#sidebar")
const sideBarChallengeUl = document.querySelector("#pageSubmenu")
const dynamicContentBody = document.querySelector("#app")
const workoutList = document.querySelector('#workout-list > a')



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
           timerFunction()
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
    ${challenge.image}<br>`
    dynamicContent.append(cardDiv)
}