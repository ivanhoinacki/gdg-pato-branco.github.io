/*
  Quick quiz bootstrap extension
  */


  ;(function($) {

// keep track of number of quizes added to page
var quiz_count = 0;

// add jQuery selection method to create
// quiz structure from question json file
// "filename" can be path to question json
// or javascript object
$.fn.quiz = function(filename) {
  if (typeof filename === "string") {
    $.getJSON(filename, render.bind(this));
  } else {
    render.call(this, filename);
  }
};

// create html structure for quiz
// using loaded questions json
function render(quiz_opts) {


  // list of questions to insert into quiz
  var questions = quiz_opts.questions;

  // keep track of the state of correct
  // answers to the quiz so far
  var state = {
    correct : 0,
    total : questions.length
  };

  var $quiz = $(this)
  .attr("class", "carousel slide")
  .attr("data-ride", "carousel");

  // unique ID for container to refer to in carousel
  var name = $quiz.attr("id") || "urban_quiz_" + (++quiz_count);

  $quiz.attr('id', name);

  var height = $quiz.height();


  /*
    Add carousel indicators
    */
    var $indicators = $('<ol>')
    .attr('class', 'progress-circles')
    .appendTo($quiz);

    $.each(questions, function(question_index, question) {
      $('<li>')
      .attr('class', question_index ? "" : "dark")
      .appendTo($indicators);
    });

  /*
    Slides container div
    */
    var $slides = $("<div>")
    .attr("class", "carousel-inner")
    .attr("role", "listbox")
    .appendTo($quiz);

  /*
    Create title slide
    */
    var $title_slide = $("<div>")
    .attr("class", "item active")
    .attr("height", height + "px")
    .appendTo($slides);

    $('<h1>')
    .text(quiz_opts.title)
    .attr('class', 'quiz-title')
    .appendTo($title_slide);

    var $start_button = $("<div>")
    .attr("class", "quiz-answers")
    .appendTo($title_slide);

    $("<button>")
    .attr('class', 'btn btn-primary btn-lg')
    .text("Faça este teste para descobrir!")
    .click(function() {
      $quiz.carousel('next');
      $indicators.addClass('show');
    })
    .appendTo($start_button);


  /*
    Add all question slides
    */
    $.each(questions, function(question_index, question) {

      var last_question = (question_index + 1 === state.total);

      var $item = $("<div>")
      .attr("class", "item")
      .attr("height", height + "px")
      .appendTo($slides);

      $("<div>")
      .attr("class", "quiz-question")
      .text(question.prompt)
      .appendTo($item);

      var $answers = $("<div>")
      .attr("class", "quiz-answers")
      .appendTo($item);

    // if the question has an image
    // append a container with the image to the item
    var $img_div;
    if (question.image) {
      $img_div = $('<div>')
      .attr('class', 'question-image')
      .appendTo($item);
      $("<img>")
      .attr("class", "img-responsive img-rounded")
      .attr("src", question.image)
      .appendTo($img_div);
    }

    // for each possible answer to the question
    // add a button with a click event
    $.each(question.answers, function(answer_index, answer) {

      // create an answer button div
      // and add to the answer container
      color = answer == 'Sim' ? 'btn-success' : (answer == 'Não' ? 'btn-danger' : 'btn-default')
      icone = answer == 'Sim' ? 'glyphicon-remove' : 'glyphicon-ok'

      var ans_btn = $("<button type='button'>")
      .attr('class', 'btn btn-lg ' + color)
//        .text("<span class='glyphicon " + icone + "' aria-hidden='true'></span>'" + answer)
.text(answer)
.appendTo($answers);

      // This question is correct if it's
      // index is the correct index
      var correct = (question.correct.index === answer_index);

      // default opts for both outcomes
      var opts = {
        allowOutsideClick : false,
        allowEscapeKey : false,
        confirmButtonText: "Próxima questão",
        html : true,
        confirmButtonColor: "#0096D2"
      };

      // set options for correct/incorrect
      // answer dialogue
      if (correct) {
        opts = $.extend(opts, {
          title: "Legal!",
          text: "Correto! Bom trabalho!",
          type: "success"
        });
      } else {
        opts = $.extend(opts, {
          title: "Oh Não!",
          text: ("Você errou!<br/><br/> A resposta correta é <b>" + question.answers[question.correct.index] +  "</b> \ " +
            question.correct.text ?
            ("<div class=\"correct-text\">" +
              question.correct.text +
              "</div>"
              ) : ""),
          type: "error"
        });
      }

      if (last_question) {
        opts.confirmButtonText = "Ver resultados!";
      }

      // bind click event to answer button,
      // using specified sweet alert options
      ans_btn.on('click', function() {

        function next() {
          // if correct answer is selected,
          // keep track in total
          if (correct) state.correct++;
          $quiz.carousel('next');
          // if we've reached the final question
          // set the results text
          if (last_question) {
            $results_title.text(resultsText(state));
            $results_ratio.text(
              "Você acertou " +
              Math.round(100*(state.correct/state.total)) +
              "% das questões."
              );
            $twitter_link.attr('href', tweet(state, quiz_opts));
            $facebook_link.attr('href', facebook(state, quiz_opts));
            $indicators.removeClass('show');
            // indicate the question number
            $indicators.find('li')
            .removeClass('dark')
            .eq(0)
            .addClass('dark');
          } else {
            // indicate the question number
            $indicators.find('li')
            .removeClass('dark')
            .eq(question_index+1)
            .addClass('dark');
          }
          // unbind event handler
          $('.sweet-overlay').off('click', next);
        }

        // advance to next question on OK click or
        // click of overlay
        swal(opts, next);
        $('.sweet-overlay').on('click', next);

      });

    });

  });


  // final results slide
  var $results_slide = $("<div>")
  .attr("class", "item")
  .attr("height", height + "px")
  .appendTo($slides);

  var $results_title = $('<h1>')
  .attr('class', 'quiz-title')
  .appendTo($results_slide);

  var $results_ratio = $('<div>')
  .attr('class', 'results-ratio')
  .appendTo($results_slide);

  var $restart_button = $("<div>")
  .attr("class", "quiz-answers")
  .appendTo($results_slide);

  var $social = $("<div>")
  .attr('class', 'results-social')
  .appendTo($results_slide);

  var $twitter_link = $('<a>')
  .html("<span class='btn btn-block btn-social btn-twitter'><i class='fa fa-bitbucket'></i> Compartilhar no twitter</span>")
  .appendTo($social);

  var $facebook_link = $('<a>')
  .html("<span class='btn btn-block btn-social btn-facebook'><i class='fa fa-bitbucket'></i> Compartilhar no facebook</span>")
  .appendTo($social);

  $("<button>")
  .attr('class', 'quiz-button btn')
  .text("Tentar novamente")
  .click(function() {
    state.correct = 0;
    $quiz.carousel(0);
  })
  .appendTo($restart_button);

  $quiz.carousel({
    "interval" : false
  });

  $(window).on('resize', function() {
    $quiz.find(".item")
    .attr('height', $quiz.height() + "px");
  });

}

function resultsText(state) {

  var ratio = state.correct / state.total;
  var text;

  switch (true) {
    case (ratio === 1):
    text = "Wow você fez um excelente trabalho!";
    break;
    case (ratio > 0.9):
    text = "Bom trabalho, você acertou a maioria!";
    break;
    case (ratio > 0.60):
    text = "Muito bom, vamos dizer que foi bem!";
    break;
    case (ratio > 0.5):
    text = "Bom, pelo menos você acertou mais da metade...";
    break;
    case (ratio < 0.5 && ratio !== 0):
    text = "Parece que este foi difícil, tente a sorte na próxima vez!";
    break;
    case (ratio === 0):
    text = "Caramba, nenhuma correta. Tente outra vez!";
    break;
  }
  return text;

}


function tweet(state, opts) {

  var body = (
    "Eu acertei " + state.correct +
    " de " + state.total +
    " no @gdgpatobranco \"" + opts.title +
    "\" quiz. Teste seus conhecimentos aqui: " + opts.url
    );

  return (
    "http://twitter.com/intent/tweet?text=" +
    encodeURIComponent(body)
    );

}

function facebook(state, opts) {
  return "https://www.facebook.com/sharer/sharer.php?u=" + opts.url;
}


})(jQuery);
