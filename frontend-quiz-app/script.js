const toggleInput = document.getElementById("toggle");
const setBodyStyle = document.body.style;

toggleInput.addEventListener("click", (e) => {
    if (toggleInput.checked) {
        setBodyStyle.backgroundColor = "#F4F6FA";
        setBodyStyle.backgroundImage = 'url("/assets/images/pattern-background-mobile-light.svg")';
    } else {
        setBodyStyle.backgroundColor = "#313E51";
        setBodyStyle.backgroundImage = 'url("/assets/images/pattern-background-mobile-dark.svg")';
    }
});