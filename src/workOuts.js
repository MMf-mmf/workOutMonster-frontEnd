const sideBar = document.querySelector("#sidebar")
const sideBarChallengeUl = document.querySelector("#pageSubmenu")
const dynamicContentBody = document.querySelector("#app")

// need to add a data set id to every work out in the drop down
function sideBarEventListener() {
    sideBar.addEventListener('click', event => {
       
        if (event.target.id == "workout-1") {
            clearPage()
            startTimer()
            // renderWorkOut(event.target.dataset.id)
        }
    })
}

function renderWorkOut(workOutId) {

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
            dynamicContentBody.innerHTML=`
            <h1>${challenge.name}</h1>
            <div>
            Your task:<br>
            ${challenge.description}<br>
            ${challenge.min_reps}<br>
            ${challenge.min_weight}<br>
            ${challenge.skill_level}<br>
            ${challenge.min_time}<br>
            ${challenge.max_time}<br>
            ${challenge.muscle_group}<br>
            ${challenge.image}<br>
            </div>
            `
            
        })
        
        
    })
    })
}
