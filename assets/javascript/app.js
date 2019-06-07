window.onload = function (){
   $("#submit").on("click", submit);
    $("#start").on("click", start);

}
var images =  { CorrectGuess:[{ name: "fairy", img: "../images/fairy.jpg"}, 
{name: "dragon", img: "../images/dragon.jpg"}, {name: "centaur", img: "../images/centaur.jpg"}, {name: "gnome", img: "../images/gnome.jpg"}
, { name: "mermaid", img: "../images/mermaid.jpg"}]};
var wrongAnswer = ["griffin", "pixie", "basilisk", "selkie", "ghoul", "werewolf", "vampire"];
var timer;
var score;
var time = 120;
var Submitted = false;
//reset the game 


function reset (){
    $("#display").text("0:00");
    $("#start").show;
    score = 0;
    time = 120;
}
//start the timer, display a question, remove start button
function start (){
    $("#start").hide();
    $("#game").show();
    timer = setInterval(count, 1000);
    trivia();
}

function count (){
    time--;
    var converted = timeConverter(time);
    $("#display").text(converted);
}
//display question with three different answer choices (1 correct, 2 incorrect)
function trivia(){
    for(var i = 0; i <images.length; i++){
        var random = wrongAnswer[Math.floor(Math.random()*wrongAnswer.length)];
        $("#question").html("<img src = " + images.CorrectGuess[i].img + "/>");
        $("#choice1").html(images.CorrectGuess[i].name);
        $("#choice2").text(random);
        $("#choice3").text(random);
    }

}
console.log($("#question"));
console.log($("#choice1"));
//save answer chosen, change questions after click, once all questions have been submitted, stop timer, show #correct/correct answers
// function submit (){
//     $("#submit").on("click", function())

// }
function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    return minutes + ":" + seconds;
  }
