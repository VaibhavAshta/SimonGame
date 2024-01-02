var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    // Check if the LAST button clicked is right
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
      // set a variable to count how many colors the user got right
      var count = 0;
      // loop through the two arrays, and compare if EACH ONE of the values is the same as the other
      for (var i = 0; i < gamePattern.length; i++) {
        if(gamePattern[i] === userClickedPattern[i]){
          // if the two values matche, count + 1
          count++;
        }
      }
      // ONLY if the count is the same number as gamePattern length,
      // (meaning each one of the colors was right) then it's success
      if(count === gamePattern.length){
        console.log("success");
        setTimeout(function(){
            nextSequence();
          }, 1000);
      }
      // otherwise, it's wrong and trigger Game Over
    } else {
      console.log("wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
  }

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
