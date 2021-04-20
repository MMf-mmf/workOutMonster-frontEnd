const dynamicContent = document.querySelector(".dynamicContent")
topNavBarListener()























function topNavBarListener() {
    const topNavBar = document.querySelector(".container-fluid")
topNavBar.addEventListener('click', event => {
    if (event.target.matches("#sign-up")) {
        // clear page 
        clearPage()
        // render sign up form
        signUpForm()

    }
})
}

function signUpForm() {
    const signUpHtml = `<form class="sign-up-form">
  <div class="col-auto">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <div id="emailHelp" class="form-text"></div>
  </div>

  <div class="col-auto">
  <label>Name</label>
  <input type="text" class="form-control"  placeholder="Enter Name">
</div>

  <div class="col-auto">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter password">
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
}


function clearPage() {
    while (dynamicContent.firstChild) {
        dynamicContent.removeChild(dynamicContent.firstChild)
    }
}


// Side bar this will toggle the side par open and closed
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});





