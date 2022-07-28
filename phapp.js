function regButtonClick(){
    const rbutton = document.getElementById("regButton");
    const rlabel = document.getElementById("regErrorLabel")

    rbutton.addEventListener('click', function onClick(event) { 
        window.location.href='feed.html'
        // // Need to add logic to capture information from fields 
        // number = 0;
        // if (number == 0) {
        //     rlabel.style.display="block";
        // } else{
        //     rlabel.style.display="none";
        // }
    });
}

function signinButtonClick(){
    const sbutton = document.getElementById("signinButton");
    const slabel = document.getElementById("signinErrorLabel")

    sbutton.addEventListener('click', function onClick(event) { 
        window.location.href="/post"
        // // Need to add logic to validate login credentials
        // number = 0;
        // if (number == 0) {
        //     slabel.style.display="block";
        // } else{
        //     slabel.style.display="none";
        // }
    });
}