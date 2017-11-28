$(document).ready(function(){
var score = 0;
var countStartNumber = 3;
var panel = $("#quiz-area");
var questions = [];

function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                  // Pick a remaining element...
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex -= 1;

                  // And swap it with the current element.
                  temporaryValue = array[currentIndex];
                  array[currentIndex] = array[randomIndex];
                  array[randomIndex] = temporaryValue;
                }

                return array;
              }	


var queryURL = "https://opentdb.com/api.php?amount=50&type=multiple";
              // call to the trivia API
  $.ajax({
      url: queryURL,
       method: "GET"
     }).done(function(response) {
                  	// console.log(response.results[i]);
          for ( i = 0; i < 50; i ++) {        
      var question = [{
        question: response.results[i].question,
        answers: [response.results[i].correct_answer, response.results[i].incorrect_answers[0], response.results[i].incorrect_answers[1], response.results[i].incorrect_answers[2]],
        correctAnswer: response.results[i].correct_answer
       }];

       questions.push(question);
       
      }
console.log(questions);
});





       var timer;
       var scores;

       var game = {
            questions: questions,
            currentQuestion: 0,
            counter: countStartNumber,
            correct: 0,
            incorrect: 0,

           countdown: function() {
             game.counter--;
             $("#counter-number").html(game.counter);
             if (game.counter === 0) {
             console.log("Time up");
             game.timeUp();
              		}
            },

           loadQuestion: function() {
             timer = setInterval(game.countdown, 1000);
              panel.html("<h3>" + questions[this.currentQuestion][0].question + "</h3>");
              
              console.log("answers: " + questions[this.currentQuestion][0].answers);
              answers = shuffle(questions[this.currentQuestion][0].answers);	
              		// console.log("shuffled:" + answers);

              for (var i = 0; i < 4; i++) {
              	panel.append("<button type='button' class='btn btn-primary' id='question' name='one' data-name='" + answers[i] + "'>"+ answers[i] + "</button>");
              }

            },

		       nextQuestion: function() {
			
				    $("#counter-number").html(game.counter);
				    game.currentQuestion++;
				    console.log(game.currentQuestion);
				    game.loadQuestion();
				},

			   timeUp: function() {

			    clearInterval(timer);

			    $("#counter-number").html(game.counter);

			    panel.html("<h2>Out of Time!</h2>");
			    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion][0].correctAnswer);

			    $("#resultModal").modal('toggle');
			      // preventDefault();  
			    $(".scores").html(game.correct*20);
			    
			  },

			  results: function() {
			    
			  	var name = $("#InputUsername").val();

			  	var userData = {
	    		username: name,
	    		scores: game.correct*20
	    		}
	    		console.log(userData);
			    clearInterval(timer);
			    

			    // AJAX post the data to the friends API.
			    var currentURL = window.location.origin;

	    		$.post(currentURL + "/username/create", userData, function(data){
	    		});

	    		$("#scoresModal").modal('toggle');

			    // $("#counter-number").html(game.counter);

			    // panel.append("<h3>Correct Answers: " + game.correct*20 + "</h3>");
			    // panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
			    panel.append("<br><button type='button' class='btn btn-lg btn-primary' id='start-over'>Start Over</button>");

			  },

			  renderScores: function() {

			  	$.get("/scores" , function(data) {
			      console.log("Posts", data);
			      scores = data;
			    });

			  	var newPostPanelBody = $("<div>");
			    newPostPanelBody.addClass("panel-body");
			    var newPostBody = $("<p>");
			    newPostTitle.text(post.title + " ");
			    newPostBody.text(post.body);



			  },

			  clicked: function(e) {
			    clearInterval(timer);
			    if ($(e.target).attr("data-name") === questions[this.currentQuestion][0].correctAnswer) {
			      this.answeredCorrectly();
			    }
			    else {
			      this.answeredIncorrectly();
			    }
			  },

			  answeredIncorrectly: function() {

			    game.incorrect++;

			    game.counter = game.counter;

			    panel.html("<h2>Nope!</h2>");
			    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion][0].correctAnswer + "</h3>");
			   

			    if (game.currentQuestion === questions.length -1) {
			      setTimeout(game.results, 1000);
			    }
			    else {
			      setTimeout(game.nextQuestion, 750);
			    }
			  },

			  answeredCorrectly: function() {

			    game.counter = game.counter + 5;

			    game.correct++;

			    panel.html("<h2>Correct!</h2>");
			   
			    if (game.currentQuestion === questions.length - 1) {
			      setTimeout(game.results, 1000);
			    }
			    else {
			      setTimeout(game.nextQuestion, 750);
			    }
			  },

			  reset: function() {
			    this.currentQuestion = 0;
			    this.counter = countStartNumber;
			    this.correct = 0;
			    this.incorrect = 0;
			    this.loadQuestion();
			  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", "#question", function(e) {
  game.clicked(e);
});  

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>80</span> Seconds</h2>");
  game.loadQuestion();
});
$(document).on("click", "#submit", function(e) {
	e.preventDefault();
	game.results();
	});

});