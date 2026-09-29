const hero = document.querySelector(".hero");
const character = document.querySelector(".character");
const message = document.querySelector("#message");

let currentZone = "center";
let timer;

function reactToZone(zone) {

    if (zone === currentZone) {
        return;
    }

    currentZone = zone;

    clearTimeout(timer);

    if (zone === "left") {

        character.style.transform =
            "translateX(-15px) rotate(-3deg)";

        message.textContent =
            "Anyone here on the left?";

    } else if (zone === "right") {

        character.style.transform =
            "translateX(15px) rotate(3deg)";

        message.textContent =
            "Anyone here on the right?";

    } else {

        character.style.transform =
            "translateX(0) rotate(0deg)";

        message.textContent =
            "Hey, it's you!";

        timer = setTimeout(() => {

            message.textContent =
                "Check out the portfolio";

        }, 1500);
    }

    timer = setTimeout(() => {

        character.style.transform =
            "translateX(0) rotate(0deg)";

        if (zone !== "center") {
            message.textContent =
                "Back to work...";
        }

    }, 2500);
}


function handlePointer(x) {

    const width = window.innerWidth;

    if (x < width * 0.33) {

        reactToZone("left");

    } else if (x > width * 0.66) {

        reactToZone("right");

    } else {

        reactToZone("center");
    }
}


/* Desktop */

document.addEventListener("mousemove", (event) => {

    handlePointer(event.clientX);

});


/* Mobile */

document.addEventListener("touchmove", (event) => {

    if (event.touches.length > 0) {

        handlePointer(event.touches[0].clientX);

    }

}, { passive: true });


/* Initial greeting */

window.addEventListener("load", () => {

    setTimeout(() => {

        message.textContent =
            "Hey, it's you!";

    }, 500);

});