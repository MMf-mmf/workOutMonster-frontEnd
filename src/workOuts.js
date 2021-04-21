const sideBar = document.querySelector("#sidebar")

// need to add a data set id to every work out in the drop down
function sideBarEventListener() {
    sideBar.addEventListener('click', event => {
       
        if (event.target.id == "workout-1") {
            clearPage()
            timerFunction()
            // renderWorkOut(event.target.dataset.id)
        }
    })
}

function renderWorkOut(workOutId) {
    
}
