var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer((userClickedPattern.length) - 1);
});

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
            nextSequence();
            }, 1000);
    
        }
    } else {
        console.log("Wrong!");
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 100);
        $("h1").text("Game over, press any key to restart.");
        startOver();
    }

}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("h1").text(`Level ${level}`);

    let randomChosenColour = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var selectedButton = new Audio(`sounds/${name}.mp3`);
    selectedButton.play();
}

function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}