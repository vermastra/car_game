//taking all the divs
const road = document.querySelector('.road');
const start = document.querySelector('.start');
const score = document.querySelector('.score');

highScore = 0;

let roadPositionLeft = road.getBoundingClientRect().left;
let roadPositionTop = road.getBoundingClientRect().top;
let roadPositionBottom = road.getBoundingClientRect().bottom;
let roadPositionRight = road.getBoundingClientRect().right;
let roadheight = road.getBoundingClientRect().height;

//to start the game
start.addEventListener('click', function () {
    run = 0;
    clearRoadElements();
    function clearRoadElements() {
        let enemyCar = document.querySelectorAll('.enemyCar');
        enemyCar.forEach((element) => {
            road.removeChild(element);
        })
        let roadLines = document.querySelectorAll('.roadLines');
        roadLines.forEach((element) => {
            road.removeChild(element);
        })
        let myCar = document.querySelectorAll('.myCar');
        myCar.forEach((element) => {
            road.removeChild(element);
        })
    }

    //animation to the body(background)
    let body = document.querySelector("body");
    body.style.animation = 'animate .3s infinite';

    //chaging css-display(actully by changing class)
    score.classList.remove('hide');
    start.classList.add('hide');
    start.style.display = "none";

    //creating road lines
    for (i = 0; i < 4; i++) {
        let roadLines = document.createElement('div');
        roadLines.setAttribute("class", "roadLines");
        roadLines.style.top = i * 12 + "rem";
        road.appendChild(roadLines);
    }

    //fun to animate roadLines
    function moveRoadLines() {
        let roadLines = document.querySelectorAll('.roadLines');
        roadLines.forEach((element) => {
            let roadLineHeight = element.getBoundingClientRect().height;
            let postionTop = element.offsetTop + 5;
            if (postionTop > roadheight) {
                postionTop = -roadLineHeight;
            }
            element.style.top = postionTop + "px";
        })
        run++;
        score.innerHTML = `<h3>SCORE:${run}`;
        if (highScore != 0) {
            score.innerHTML = `<h3>SCORE:${run}<br>HIGH SCORE: ${highScore}`;
        }
    }

    //creating enemyCar 
    setTimeout(create_enemy, 2000);
    function create_enemy() {
        for (i = 0; i < 3; i++) {
            let enemyCar = document.createElement('div');
            enemyCar.setAttribute("class", "enemyCar");
            enemyCar.style.top = i * (-28) + "rem";
            enemyCar.style.left = Math.round(Math.random() * (roadPositionRight - roadPositionLeft - 72 - 15)) + "px";
            road.appendChild(enemyCar);
        }
    };

    //creating the myCar
    let myCar = document.createElement('div');
    myCar.setAttribute("class", "myCar");
    road.appendChild(myCar);

    //fun to animate enemyCar
    function moveEnemyCar() {
        let myCar = document.querySelector('.myCar');
        let enemyCar = document.querySelectorAll('.enemyCar');
        enemyCar.forEach((element) => {
            let postionTop = element.getBoundingClientRect().top + 5;
            // or let postionTop = element.offsetTop + 5;
            myCarPosition = myCar.getBoundingClientRect();
            enemyCarPosition = element.getBoundingClientRect();
            ///imp********************
            if (((myCarPosition.top < enemyCarPosition.bottom && myCarPosition.bottom > enemyCarPosition.top) &&
                (myCarPosition.left < enemyCarPosition.right && myCarPosition.right > enemyCarPosition.left))) {

                clearInterval(enemyCarMovingInterval);
                clearInterval(linesMovingInterval);

                body.style.animation = 'none';

                //stopping draggability of myCar for PC
                $(".myCar").draggable({
                    disabled: true
                });

                //for mobile
                myCar.removeEventListener('touchmove', moveable)

                start.style.display = "block";

                start.innerHTML = 'Game Over<br>Click to start again'
                if (run > highScore) {
                    highScore = run;
                }
                //updating score and highscore
                score.innerHTML = `<h3>SCORE:${run}<br>HIGH SCORE: ${highScore}`;
            }
            ///********************************************** */
            if (postionTop > roadheight + 200) {//+130
                postionTop = -24 * 16;
                element.style.left = Math.round(Math.random() * (roadPositionRight - roadPositionLeft - 72 - 15)) + "px";
            }
            element.style.top = postionTop + "px";
        })
    }
    //to move myCar in PC
    $(".myCar").draggable({
        containment: "parent"
    });

    //to move myCar in mobile
    var moveable = function (event) {
        let touchLocation = event.targetTouches[0];
        let myCarWidth = myCar.getBoundingClientRect().width;
        let myCarHeight = myCar.getBoundingClientRect().height;
        if (touchLocation.pageY >= roadPositionTop + myCarHeight / 2 + 10 && touchLocation.pageY + myCarHeight / 2 + 5 <= roadPositionBottom) {
            myCar.style.top = touchLocation.pageY - myCarHeight / 2 + "px";
        }
        if (touchLocation.pageX >= roadPositionLeft + myCarWidth / 2 + 1 && touchLocation.pageX + myCarWidth / 2 + 15 <= roadPositionRight) {
            myCar.style.left = touchLocation.pageX - myCarWidth / 2 + "px";
        }   
    }
    myCar.addEventListener('touchmove', moveable);

    //setinterval to animate
    enemyCarMovingInterval = setInterval(moveEnemyCar, 5);
    linesMovingInterval = setInterval(moveRoadLines, 5);

});

