/* Code by @curioushiva */
/* Importing elements */
let UserSpeed = document.querySelector(".userinput input");
let SpeedBtn = document.querySelector(".userinput button");
let SpeedErr = document.querySelector(".content p");

/* Function to run */
SpeedBtn.addEventListener("click", () => {
    new Audio('/icons/click.mp3').play();
    let EnterSpeed = parseFloat(UserSpeed.value.trim().slice(0, 3));

    if (EnterSpeed >= 0.2 && EnterSpeed <= 8) {
        /* Chrome Scripting */
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: setVideoSpeed,
                args: [EnterSpeed]
            });
        });
        window.close();
    } else {
        SpeedErr.style.display = "block";
    }
});

UserSpeed.addEventListener('click', () => {
    SpeedErr.style.display = "none";
});

/* function call */
function setVideoSpeed(EnterSpeed) {
    let video = document.querySelector("video");
    if (video) {
        video.playbackRate = EnterSpeed;
    }
}
