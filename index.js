var buttonColours = ['red','blue','green','yellow'];

var gamePattern = [];

var userClickedPattern = [];
var started = false;
var level = 0;


document.addEventListener('keypress',function(){
    if (!started){
        started = true;

        nextSequence();

        $('#level-title').text(`Nivel ${level}`);
    }
})



function nextSequence(){
    level+=1;

    userClickedPattern = [];
    $('#level-title').text(`Nivel ${level}`);

    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audioPlayer = new Audio(`sounds/${name}.mp3`);
    audioPlayer.play();
};

function animatePress(currentColour){
    $(`#${currentColour}`).addClass('pressed');
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
            
        }
    }else{
        gameOver();
    }
}

function gameOver(){
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function(){
        $('body').removeClass('game-over');
    },200);
    $('h1').text('Perdiste, presiona una tecla reiniciar');
    

    started = false;
    gamePattern=[];
    userClickedPattern=[];
    level=0;
}


$('.btn').click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);
    
    console.log(userClickedPattern);

    

    checkAnswer(userClickedPattern.length-1);

})