/* =========================================
   THIRUMARAN R - INTERACTIVE PORTFOLIO
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const character =
    document.querySelector(".character");

const message =
    document.querySelector("#message");


/* =========================================
   STATE
========================================= */

let currentZone = "center";

let reactionTimer = null;


/* =========================================
   REACT TO USER POSITION
========================================= */

function reactToZone(zone) {

    if (!character || !message) {
        return;
    }


    /* Don't repeat the same reaction */

    if (zone === currentZone) {
        return;
    }


    currentZone = zone;


    /* Clear previous timer */

    clearTimeout(reactionTimer);


    /* =====================================
       LEFT
    ===================================== */

    if (zone === "left") {

        character.style.transform =
            "translateX(-25px) rotate(-2deg)";


        message.style.opacity = "0";


        setTimeout(function () {

            message.textContent =
                "Anyone here on the left?";

            message.style.opacity = "1";

        }, 200);

    }


    /* =====================================
       RIGHT
    ===================================== */

    else if (zone === "right") {

        character.style.transform =
            "translateX(25px) rotate(2deg)";


        message.style.opacity = "0";


        setTimeout(function () {

            message.textContent =
                "Anyone here on the right?";

            message.style.opacity = "1";

        }, 200);

    }


    /* =====================================
       CENTER
    ===================================== */

    else {

        character.style.transform =
            "translateX(0) rotate(0deg)";


        message.style.opacity = "0";


        setTimeout(function () {

            message.textContent =
                "Hey, it's you!";

            message.style.opacity = "1";

        }, 200);


        /* After a short delay */

        reactionTimer = setTimeout(function () {

            message.style.opacity = "0";


            setTimeout(function () {

                message.textContent =
                    "Check out the portfolio";

                message.style.opacity = "1";

            }, 250);

        }, 1500);

    }


    /* =====================================
       RETURN TO NORMAL
    ===================================== */

    if (zone !== "center") {

        reactionTimer = setTimeout(function () {


            character.style.transform =
                "translateX(0) rotate(0deg)";


            message.style.opacity = "0";


            setTimeout(function () {

                message.textContent =
                    "Back to work...";

                message.style.opacity = "1";

            }, 250);


        }, 2500);

    }

}


/* =========================================
   DETECT LEFT / CENTER / RIGHT
========================================= */

function detectZone(x) {

    const screenWidth =
        window.innerWidth;


    /*
        LEFT
        0% - 33%
    */

    if (x < screenWidth * 0.33) {

        return "left";

    }


    /*
        RIGHT
        66% - 100%
    */

    if (x > screenWidth * 0.66) {

        return "right";

    }


    /*
        CENTER
        33% - 66%
    */

    return "center";
}


/* =========================================
   DESKTOP MOUSE
========================================= */

document.addEventListener(
    "mousemove",
    function (event) {

        const zone =
            detectZone(event.clientX);


        reactToZone(zone);

    }
);


/* =========================================
   MOBILE TOUCH START
========================================= */

document.addEventListener(
    "touchstart",
    function (event) {


        if (
            event.touches &&
            event.touches.length > 0
        ) {


            const touchX =
                event.touches[0].clientX;


            const zone =
                detectZone(touchX);


            reactToZone(zone);

        }

    },
    {
        passive: true
    }
);


/* =========================================
   MOBILE TOUCH MOVE
========================================= */

document.addEventListener(
    "touchmove",
    function (event) {


        if (
            event.touches &&
            event.touches.length > 0
        ) {


            const touchX =
                event.touches[0].clientX;


            const zone =
                detectZone(touchX);


            reactToZone(zone);

        }

    },
    {
        passive: true
    }
);


/* =========================================
   INITIAL GREETING
========================================= */

window.addEventListener(
    "load",
    function () {


        setTimeout(function () {


            if (message) {

                message.textContent =
                    "Hey, it's you!";

            }


        }, 500);

    }
);


/* =========================================
   SMOOTH NAVIGATION
========================================= */

const navigationLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


navigationLinks.forEach(
    function (link) {


        link.addEventListener(
            "click",
            function (event) {


                const targetId =
                    this.getAttribute("href");


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }
);


/* =========================================
   CHARACTER IDLE ANIMATION
========================================= */

let idleDirection = 1;

let idlePosition = 0;


function idleAnimation() {


    /*
        Don't override a user reaction.
        Keep this very subtle.
    */

    if (
        currentZone === "center"
    ) {


        idlePosition +=
            0.02 * idleDirection;


        if (idlePosition > 2) {

            idleDirection = -1;

        }


        if (idlePosition < -2) {

            idleDirection = 1;

        }


        character.style.transform =
            "translateY(" +
            idlePosition +
            "px)";

    }


    requestAnimationFrame(
        idleAnimation
    );

}


if (character) {

    idleAnimation();

}