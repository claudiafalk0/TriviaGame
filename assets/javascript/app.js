// ![Advanced](Images/2-advanced.jpg)

// **[Click Here to Watch the demo](https://youtu.be/xhmmiRmxQ8Q)**.

// * You'll create a trivia game that shows only one question until the player answers it or their time runs out.

// * If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

// * The scenario is similar for wrong answers and time-outs.

//   * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
//   * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

// * On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).


var images =  { CorrectGuess:[
    {name: "fairy", img: "./assets/images/fairy.jpg", shown: false}, 
    {name: "dragon", img: "./assets/images/dragon.jpg", shown: false}, 
    {name: "centaur", img: "./assets/images/centaur.jpg", shown: false}, 
    {name: "gnome", img: "./assets/images/gnome.jpg", shown: false}, 
    {name: "mermaid", img: "./assets/images/mermaid.jpg", shown: false}
]};
var wrongAnswer = ["griffin", "pixie", "basilisk", "selkie", "ghoul", "werewolf", "vampire"];
var timer;
var score;
var time = 30;
var position;
var done;
				
//reset the game 

function reset (){
    $("#start").show;
    score = 0;

}
//start the timer, display a question, remove start button
function start (){
    $("#start").hide();
    clearInterval(timer);
    timer = setInterval(count, 1000);
    trivia();
    time = 30;
    $("#display").text("0:30");
    done = false;
}


function count (){
    if(time > 0) {
        time--;
        var converted = timeConverter(time);
        $("#display").text(converted);
    } else if(!done) {
        Choice(false);
        done = true;
    }
}
//display question with three different answer choices (1 correct, 2 incorrect)
function trivia(){
    do {
        position = Math.floor(Math.random() * images.CorrectGuess.length);
    } while (images.CorrectGuess[position].shown);
    images.CorrectGuess[position].shown = true;
    var temp = new Image();
    temp.src = images.CorrectGuess[position].img;
    $("#question").html("<img id='img'/>");
    $("#img").attr("src", temp.src);
    
    //Determine which position the correct answer will be in
    var RN = Math.floor(Math.random() * 3) + 1;
    
    //Set the choices based on the correct answer position
    $("#choice1").text(RN === 1 ? images.CorrectGuess[position].name : wrongAnswer[Math.floor(Math.random()*wrongAnswer.length)]);
    $("#choice2").text(RN === 2 ? images.CorrectGuess[position].name : wrongAnswer[Math.floor(Math.random()*wrongAnswer.length)]);
    $("#choice3").text(RN === 3 ? images.CorrectGuess[position].name : wrongAnswer[Math.floor(Math.random()*wrongAnswer.length)]);
    
    $("#endResult").hide();
    $("#game").show();
}

//save answer chosen, change questions after click, once all questions have been submitted, stop timer, show #correct/correct answers
function Choice(win){
    if (win === true) {
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=win&api_key=TEjv4DhokKiGmbR0CqNmeMPDL5lC9h6u";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            $("#game").hide();
            $("#endResult").show();
            var temp = new Image();
            temp.src = response.data[Math.floor(Math.random() * response.data.length)].images.fixed_height.url;
            $("#endResult").html("<p id = 'winning'>Yay! You got it right!</p><img id='giphy'/><button id = 'next'>Next Question</button>");
            $("#giphy").attr("src", temp.src);
            
        })
    } else {
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=loser&api_key=TEjv4DhokKiGmbR0CqNmeMPDL5lC9h6u";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            $("#game").hide();
            $("#endResult").show();
            var temp = new Image();
            temp.src = response.data[Math.floor(Math.random() * response.data.length)].images.fixed_height.url;
            $("#endResult").html("<p id = 'winning'>Loooooser!!!!</p><img id='giphy'/><button id = 'next'>Next Question</button>");
            $("#giphy").attr("src", temp.src);
        })
    }
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

$("#start").on("click", function (){
    start();
});

$("#choice1").on("click", function(){
    $("#choice1").text() === images.CorrectGuess[position].name ? Choice(true) : Choice(false);
});

$("#choice2").on("click", function(){
    $("#choice2").text() === images.CorrectGuess[position].name ? Choice(true) : Choice(false);
});

$("#choice3").on("click", function(){
    $("#choice3").text() === images.CorrectGuess[position].name ? Choice(true) : Choice(false);
});

$("body").on("click", 'button#next', function(){
    start();
});
