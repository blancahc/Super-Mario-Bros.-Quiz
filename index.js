'use strict';
const STORE = [
  {
  question: 'What year was Super Mario Bros. released to market?',
  answers: [
    '1982',
    '1983',
    '1985',
    '1987'],
    correctAnswer: '1985'
    },
    {
  question: 'In the two-player mode, what is the name of the second player?',
  answers: [
    'Princess Peach',
    'Luigi',
    'Toad',
    'Bowser'],
    correctAnswer: 'Luigi'
    },
    {
  question: 'What is the name of  the main villain?',
  answers: [
    'Toad',
    'Goomba',
    'Evil Mushroom',
    'Bowser'],
    correctAnswer: 'Bowser'
    },
    {
  question: 'Where is Mario\'s mission?',
  answers: [
    'Mario World',
    'Peach World',
    'Mushroom Kingdom',
    'Toads Kingdom'],
    correctAnswer: 'Mushroom Kingdom'
    },
    {
  question: 'How can you get \'infinite\' lives?',
  answers: [
    'By hitting a brick several times',
    'By jumping over the flag at the end of each level',
    'By catching a turtle coming down stairs and jumping on it repetitively',
    'By getting killed by Bowser right when you hit the axe'],
    correctAnswer: 'By catching a turtle coming down stairs and jumping on it repetitively'
    },
    {
  question: 'Who designed and produced Mario?',
  answers: [
    'Oda Nobugana',
    'Yasuko Miyamoto',
    'Shigeru Miyamoto',
    'Mario Smith'],
    correctAnswer: 'Shigeru Miyamoto'
    },
    {
  question: 'Who was Mario named after?',
  answers: [
    'It was Miyamoto\'s names translated to Italian.',
    'A worker at Nintendo\'s office',
    'The landlord of Nintendo\'s office',
    'Miyamoto\'s best friend'],
    correctAnswer: 'The landlord of Nintendo\'s office'
    },
    {
  question: 'How many physical copies have been sold of Super Mario Bros.?',
  answers: [
    'About 10 million',
    'About 20 million',
    'About 40 million',
    'About 3 billion'],
    correctAnswer: 'About 40 million'
    },
    {
  question: 'The Goombas are:',
  answers: [
    'Aliens from planet Mars who invade Mushroom Kingdom',
    'The Koopa\'s children',
    'Princesses turned into Goombas by a spell of the Koopas',
    'Habitants of Mushroom Kingdom turned into Goombas by a spell of the Koopas'],
    correctAnswer: 'Habitants of Mushroom Kingdom turned into Goombas by a spell of the Koopas'
    },
    {
  question: 'How big was the file that contained the original Super Mario Bros. game?',
  answers: [
    '256 kilobits',
    '256 kilobytes',
    '256 megabytes',
    '256 gigabytes'],
    correctAnswer: '256 kilobits'
    }
    ];
    
let questionNumber = 0;
let score = 0;

/*render question template for each question by accessing the keys of each property in the STORE array until there are no more questions
When there are no more questions, display the Results page and run the restartQuiz function
 Enter 0 for the score text*/
function generateQuestion () {
  if (questionNumber < STORE.length) {
    return `<div class="textContainer">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
     <legend>Select an answer</legend>
    <label>
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label>
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label>
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label>
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    
    </fieldset>
    <button type="submit" class="submitButton">Submit</button>
    </form>
    </div>`;
} else {
    displayResults();
    restartQuiz();
    $('js-showScore').text(0);
  }
}

/*increase questionNumber by one and display the new question number in the html element with the js-showQuestionNumber element*/
function changeQuestionNumber () {
    questionNumber ++;
  $('.js-showQuestionNumber').text(questionNumber+1);
}


/* start quiz
when the user clicks on the start button, hide the html element with the js-startQuiz class
and unhide the html element with the js-questionAnswers class
also change the text with the js-showQuestionNumber element to 1 */
function startQuiz () {
  $('.js-startQuiz').on('click', '.js-startButton', function (event) {
    $('.js-startQuiz').remove();
    $('.js-questionAnswers').css('display', 'block');
    $('.js-showQuestionNumber').text(1);
    $('js-showScore').text(0);
});
}

/*Get the element with the js-questionAnswers class and display the question by putting the text created by the generateQuestion function in the html*/
function displayQuestion () {
    $('.js-questionAnswers').html(generateQuestion());
    }

/*user submits answer
  on click of the form submit button, do the following:
    prevent default event of when a form is sibmitted
    make the selected input field get checked
    let the answer be the one selected
    compare the selsected answer with the correctAnswer
    If the answers match, then run the ifAnswerIsCorrect function
    If not, then run the ifAnswerIsWrong function*/
function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      ifAnswerIsCorrect();
    } else {
      ifAnswerIsWrong();
    }
  });
}

/*if answer is correct, get the element with the class js-questionAnswers and add the html in the paranthesis
also run the updateScore function*/
function ifAnswerIsCorrect () {
   $('.js-questionAnswers').html(`<section class="textContainer">
      <h2>You got that right!</h2>
      <img class="containerImg" src="https://cdn.videogamesblogger.com/wp-content/uploads/2011/01/how-to-jump-flagpole-in-super-mario-bros-screenshot.jpg" alt="Mario passing level">
      <button type="submit" class="submitButton js-nextButton">Next</button>
      </section>`);
      updateScore();
}

/*make the correctAnswer be the key for the property of the current question
 if answer is correct, get the element with the class js-questionAnswers and add the html in the paranthesis*/
function ifAnswerIsWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.js-questionAnswers').html(`<section class="textContainer col-4 col-12">
      <h2>Mama mia! That's wrong.</h2>
      <img class="containerImg" src="http://theologygaming.com/wp-content/uploads/2013/07/fig4.gif" alt="Mario dying">
      <p>The correct answer is "${correctAnswer}"</p>
      <button type="submit" class="submitButton js-nextButton">Next</button>
      </section>`);
}

/*Increase the score by 1 in the console, and display the score in the text of the html element that has a class of js-showScore*/
function updateScore () {
  score++;
  $('.js-showScore').text(score);
  }
  

/*This is for when user clicks next
  the question number changes
	The next question is displayed to the user
 runs the userSelectsAnswer function*/
function displayNextQuestion () {
  $('main').on('click', '.js-nextButton', function (event) {
    changeQuestionNumber();
    displayQuestion();
    userSelectAnswer();
  });
}

/*This tells the user total score
	removes the element with a class of js-Banner
	gets the element with the js-questionAnswers class and adds html in parenthesis to that element*/
function displayResults () {
    $('.js-questionAnswers').html(`<div class="textContainer col-4 col-12"><h1>You got ${score} / 10</h1><img class="containerImg" src="https://img.diply.com/article-images/a/cc2a5070-2eed-461f-b2f5-c140844d2065.gif?impolicy=desktop" alt="Mario swimming"><button class="js-tryAgainButton">Try Again</button></div>`);
    $('.js-banner').addClass('hideQuestionAnswers');
}
/*
restart quiz when user clicks Try Again button
set the question number and score to zero so that the quiz starts from the first question with the score reseted to 0. 
unhide the banner showing the question number and score
run the displayQuestion function and the user selectAnswer*/
function restartQuiz () {
      $('main').on('click', '.js-tryAgainButton', function (event) {
        questionNumber = 0;
        score = 0;
        $('.js-banner').removeClass('hideQuestionAnswers');
    displayQuestion();
    userSelectAnswer();
    $('.js-showScore').text(score);
    $('.js-showQuestionNumber').text(1);
  }
)}
  

//run quiz functions
function runQuiz() {
  startQuiz();
  displayQuestion();
  userSelectAnswer();
  displayNextQuestion();
}

//when the page DOM is done loading, run the quiz functions
$(runQuiz);
