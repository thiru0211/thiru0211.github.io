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

const hero =
    document.querySelector(".hero");


/* =========================================
   STATE
========================================= */

let currentZone = "center";

let reactionTimer = null;

let lastPointerX =
    window.innerWidth / 2;


/* =========================================
   CHARACTER REACTION
========================================= */

function reactToZone(zone) {

    if (!character || !message) {
        return;
    }


    if (zone === currentZone) {
        return;
    }


    currentZone = zone;


    clearTimeout(reactionTimer);


    /* =====================================
       LEFT
    ===================================== */

    if (zone === "left") {

        character.style.transform =
            "translateX(-28px) rotate(-2deg)";


        message.style.opacity = "0";


        setTimeout(function () {

            message.textContent =
                "Anyone here on the left?";

            message.style.opacity = "1";

        }, 180);

    }


    /* =====================================
       RIGHT
    ===================================== */

    else if (zone === "right") {

        character.style.transform =
            "translateX(28px) rotate(2deg)";


        message.style.opacity = "0";


        setTimeout(function () {

            message.textContent =
                "Anyone here on the right?";

            message.style.opacity = "1";

        }, 180);

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

        }, 180);


        reactionTimer =
            setTimeout(function () {


                message.style.opacity = "0";


                setTimeout(function () {

                    message.textContent =
                        "Check out my portfolio ↓";

                    message.style.opacity = "1";

                }, 250);


            }, 1500);

    }


    /* =====================================
       RETURN TO NORMAL
    ===================================== */

    if (zone !== "center") {

        reactionTimer =
            setTimeout(function () {


                character.style.transform =
                    "translateX(0) rotate(0deg)";


                message.style.opacity = "0";


                setTimeout(function () {

                    message.textContent =
                        "Back to work...";

                    message.style.opacity = "1";

                }, 250);


            }, 2200);

    }

}


/* =========================================
   DETECT INTERACTION ZONE
========================================= */

function detectZone(x) {

    const width =
        window.innerWidth;


    if (x < width * 0.30) {

        return "left";

    }


    if (x > width * 0.70) {

        return "right";

    }


    return "center";

}


/* =========================================
   POINTER MOVEMENT
========================================= */

document.addEventListener(
    "mousemove",
    function (event) {

        lastPointerX =
            event.clientX;


        const zone =
            detectZone(
                event.clientX
            );


        reactToZone(zone);

    }
);


/* =========================================
   TOUCH START
========================================= */

document.addEventListener(
    "touchstart",
    function (event) {


        if (
            event.touches &&
            event.touches.length > 0
        ) {


            lastPointerX =
                event.touches[0].clientX;


            const zone =
                detectZone(
                    lastPointerX
                );


            reactToZone(zone);

        }

    },
    {
        passive: true
    }
);


/* =========================================
   TOUCH MOVE
========================================= */

document.addEventListener(
    "touchmove",
    function (event) {


        if (
            event.touches &&
            event.touches.length > 0
        ) {


            lastPointerX =
                event.touches[0].clientX;


            const zone =
                detectZone(
                    lastPointerX
                );


            reactToZone(zone);

        }

    },
    {
        passive: true
    }
);


/* =========================================
   IDLE CHARACTER MOVEMENT
========================================= */

let idleTime = 0;


function idleAnimation() {


    if (
        character &&
        currentZone === "center"
    ) {


        idleTime += 0.015;


        const movement =
            Math.sin(idleTime) * 2;


        character.style.transform =
            "translateY(" +
            movement +
            "px)";

    }


    requestAnimationFrame(
        idleAnimation
    );

}


if (character) {

    idleAnimation();

}


/* =========================================
   CREATE FLOATING PARTICLES
========================================= */

function createParticles() {


    if (!hero) {
        return;
    }


    const particleContainer =
        document.createElement(
            "div"
        );


    particleContainer.className =
        "particles";


    for (
        let i = 0;
        i < 25;
        i++
    ) {


        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "particle";


        particle.style.left =
            Math.random() * 100 + "%";


        particle.style.top =
            Math.random() * 100 + "%";


        particle.style.animationDelay =
            Math.random() * 5 + "s";


        particle.style.animationDuration =
            4 + Math.random() * 5 + "s";


        particleContainer.appendChild(
            particle
        );

    }


    hero.appendChild(
        particleContainer
    );

}


createParticles();


/* =========================================
   INITIAL MESSAGE
========================================= */

window.addEventListener(
    "load",
    function () {


        setTimeout(
            function () {


                if (message) {

                    message.textContent =
                        "Hey, it's you!";

                }


            },
            500
        );

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
                    this.getAttribute(
                        "href"
                    );


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
   RESIZE HANDLING
========================================= */

window.addEventListener(
    "resize",
    function () {


        lastPointerX =
            window.innerWidth / 2;


    }
);