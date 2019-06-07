window.onload = function (){
   // $("#submit").on("click", function);
    $("#start").on("click", start);

}
var timer;
var score;
var time = 120;
//reset the game 
function reset (){
    $("#display").text("0:00");
    $("#start").show;
    score = 0;
    time = 120;
}
//start the timer, display all questions, remove start button
function start (){
    $("#start").hide();
    $("#game").show();
    timer = setInterval(count, 1000);
}

function count (){
    time--;
    var converted = timeConverter(time);
    $("#display").text(converted);
}
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
