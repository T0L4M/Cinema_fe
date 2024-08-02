// Back to top button
let mybutton = document.getElementById("myBtn");
window.onscroll = function () {
    scrollFunction();
    myFunction();
};
function scrollFunction() {
    if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

var navbar_sticky = document.getElementById("navbar_sticky");
var sticky = navbar_sticky.offsetTop;
var navbar_height = document.querySelector(".navbar").offsetHeight;

function myFunction() {
    if (window.pageYOffset >= sticky + navbar_height) {
        navbar_sticky.classList.add("sticky");
        document.body.style.paddingTop = navbar_height + "px";
    } else {
        navbar_sticky.classList.remove("sticky");
        document.body.style.paddingTop = "0";
    }
}

// SIGN
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});
