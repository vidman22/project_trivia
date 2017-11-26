var transformProp = Modernizr.prefixed('transform');


var questions = [];
var score = 0;

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

   

function getValue() {

    console.log('clicked');
  }

$(document).on('click', '.btn', function() {
     var userInput = $(this).val(); 
    console.log(userInput);
      for (i = 0; i < answers.length; i++) { 
      if (userInput == answers[i]) {
        score ++;
        console.log("answer: " + answers[i]);
      }
    }
      
      console.log("score: " + score);
});

  
    function Carousel3D ( el ) {
      this.element = el;

      this.rotation = 0;
      this.panelCount = 0;
      this.totalPanelCount = this.element.children.length;
      this.theta = 0;
      this.isHorizontal = true;

    }

    Carousel3D.prototype.modify = function() {

      var panel, angle, i;

      this.panelSize = this.element[ this.isHorizontal ? 'offsetWidth' : 'offsetHeight' ];
      this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
      this.theta = 360 / this.panelCount;

      // do some trig to figure out how big the carousel
      // is in 3D space
      this.radius = Math.round( ( this.panelSize / 2) / Math.tan( Math.PI / this.panelCount ) );

      for ( i = 0; i < this.panelCount; i++ ) {
        panel = this.element.children[i];
        angle = this.theta * i;
        panel.style.opacity = 1;
        // rotate panel, then push it out in 3D space
        panel.style[ transformProp ] = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
    if (angle = 0) {
      this.addClassName('frontFace'); 
    }
      }

      // hide other panels
      for (  ; i < this.totalPanelCount; i++ ) {
        panel = this.element.children[i];
        panel.style.opacity = 0;
        panel.style[ transformProp ] = 'none';
      }

      // adjust rotation so panels are always flat
      this.rotation = Math.round( this.rotation / this.theta ) * this.theta;

      this.transform();

};

    Carousel3D.prototype.transform = function() {
      // push the carousel back in 3D space,
      // and rotate it
      this.element.style[ transformProp ] = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
    
    };

     
 

 var init = function() {



      var carousel = new Carousel3D( document.getElementById('carousel') ),
          panelCountInput = document.getElementById('panel-count'),

          onNavButtonClick = function( event ){


            var increment = parseInt( event.target.getAttribute('data-increment') );
            carousel.rotation += carousel.theta * increment * -1;
            carousel.transform();
          };
            
      // populate on startup
      carousel.panelCount = parseInt( panelCountInput.value, 10);
      carousel.modify();

         $('button#next').on("click", onNavButtonClick);
         $('button#previous').on("click", onNavButtonClick);


        setTimeout( function(){
        document.body.addClassName('ready');
      }, 0);

};
  



// var currentFig = "#fig" + inc;
//               if (inc == 10) {
//                 nextFig = "#fig1";
//               } else {
//                 nextFig = "#fig" + (inc + 1);
//               }
//               $(nextFig).addClass('showFig');
//               $(currentFig).removeClass('showFig'); 
//               inc++;
//               if (inc == 11) { inc = 1; } 
//             console.log(inc);

$(document).one('click', 'figure', function() {
     var currentFig = $(this).attr('id');
     $(".col-2").hide();
     console.log(currentFig); 
       

            switch (currentFig) {
              // any
              case "fig1":
                url = "amount=50";
                break;
                // sports
              case "fig2":
              url = "amount=50&category=21";
              break;
              // art
              case "fig3":
              url = "amount=16&category=25";
              break;
              // entertainment movies
              case "fig4":
              url = "amount=50&category=11";
              break;
              // geography
              case "fig5":
              url = "amount=50&category=22";
              break;
              // history
              case "fig6":
              url = "amount=50&category=23";
              break;
              // general knowledge
              case "fig7":
              url = "amount=50&category=9";
              break;
              // mythology
              case "fig8":
              url = "amount=34&category=20";
              break;
              // politics
              case "fig9":
              url = "amount=31&category=9";
              break;
              // science
              case "fig10":
              url ="amount=50&category=17";
              break;

              default:
              url = "amount=50";


            }

            var queryURL = "https://opentdb.com/api.php?"+url+"&type=multiple";
              // call to the trivia API
              $.ajax({
      url: queryURL,
       method: "GET"
     }).done(function(response) {
          for ( i = 0; i < 10; i ++) {        
      var question = [{
        question: response.results[i].question,
        answers: [response.results[i].correct_answer, response.results[i].incorrect_answers[0], response.results[i].incorrect_answers[1], response.results[i].incorrect_answers[2]],
        correctAnswer: response.results[i].correct_answer
       }];

       questions.push(question);
       $(".category").empty();
       if (currentFig === "fig1") {
        var category = "Any";
       } else {
          var category = response.results[0].category;
        }
          console.log(category);
          $(".category").html('<b>'+ category + '</b>');
       
      answers = shuffle(questions[i][0].answers);

      $(".question" + i).append(questions[i][0].question);

      for (var j = 0; j < 4; j++) {
      $(".answers" + i).append("<button type='button' class='btn btn-primary'  name='one' data-name='" + answers[j] + "'>"+ answers[j] + "</button>");
              }
    }

      });
});
 window.addEventListener( 'DOMContentLoaded', init, false);

