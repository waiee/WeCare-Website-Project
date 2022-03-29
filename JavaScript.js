(function(){

    function buildQuiz(){

      const output = [];
  
      // for each question
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          //for each available answer
          for(letter in currentQuestion.answers){
  

            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  

      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  

      const answerContainers = quizContainer.querySelectorAll('.answers');
  

      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;

        //alert patient about this condition
        if (numCorrect >= 4) {
        alert("You have mental illness.")
        } else {
        alert(" You do not have mental illness.")
        }
    }
  
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "Question 1 out of 6 :Do you find yourself sweating excessively when you are not exercising?",
        answers: {
          a: "Yes",
          b: "No",
        },
        correctAnswer: "a"
      },
      {
        question: " Question 2 out of 6 :Do you ever have trouble sleeping?",
        answers: {
          a: "Yes",
          b: "No",
        },
        correctAnswer: "a"
      },
      {
        question: "Question 3 out of 6 :Are you suffering from burnout, anxiety disorders or depression?",
        answers: {
          a: "Yes",
          b: "No",
        },
        correctAnswer: "a"
      },
      {
        question: "Question 4 out of 6 :Are you getting regular exercise?",
        answers: {
          a: "Yes",
          b: "No",
        },
        correctAnswer: "a"
      },
      {
        question: "Question 5 out of 6 :Do you find yourself smoking and/or drinking to excess as a way to deal with stress?",
        answers: {
          a: "Yes",
          b: "No",
        },
        correctAnswer: "a"
      },
      {
        question: "Question 6 out of 6 :Do you often find yourself with tension headaches?",
        answers: {
          a: "Yes",
          b: "No",
        },
        correctAnswer: "a"
      },
    ];

  
    // Start Quiz with this
    buildQuiz();
  

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  