
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

function nextSequence()
{
    userClickedPattern=[];
    level = level+1;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".btn").click(function() 
{
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.indexOf(userChosenColour));
    //console.log(userClickedPattern);
});

function playSound(name)
{
    var audio1 = new Audio("sounds/" + name + ".mp3");
    audio1.play();
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass('pressed');
    setTimeout(function()
    {
        $("#" + currentColor).removeClass('pressed')
    },100);
}

function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {
        if (userClickedPattern.length === gamePattern.length)
        {
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
    }
    else
    {
        $("#level-title").text("Game Over. Press any key to restart");
        var audio2 = new Audio("sounds/wrong.mp3");
        audio2.play();
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },100);
        startover();
    }
}

function startover()
{
    //var userClickedPattern = [];
    gamePattern = [];
    level = 0;
    started = false;
}