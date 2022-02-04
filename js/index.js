/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
    
      TASKS DONE:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options)

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {

  const topAlert = document.querySelector('#top-alert');
  // This constant keeps track of when the quiz is over
  // It is important for the timer (in the start function)
  //  When the quiz is done, in the endQuiz function (called by hitting reset, or the timer in start)
  //  quizOver will be set to true, and the timer will know to end! 
  let quizOver = false; 

  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';

    // timer:
    let timeLeft = 60 * 5;
    const timer = setInterval(() => {
      timeLeft--;
      if(timeLeft <= 0 || quizOver) {
        timeContainer.innerHTML = "Time's up!"
        clearInterval(timer);
        endQuiz();
        
      }
      // display time left as 00:00
      const secLeft = (timeLeft % 60);
      const minLeft = (timeLeft - secLeft)/60;
      topAlert.innerHTML = `Time remaining – ${minLeft < 10 ? '0' : ''}${minLeft}:${secLeft < 10 ? '0' : ''}${secLeft}`
    }, 1000)
  });

  function endQuiz() {
    quizOver = true;
    // disable the submit button after the quiz ends:
    submit.classList.remove("btn-primary");
    submit.classList.add("btn-light");
    submit.disabled = true;
    calculateScore();
  }

  const submit = document.querySelector('#btnSubmit');
  submit.addEventListener('click', endQuiz);

  const reset = document.querySelector("#btnReset");
  reset.addEventListener('click', () => {
    console.log('You clicked the reset button!');
    window.location.reload();
  });

  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: `What is (mainland) Australia's tallest mountain?`,
      o: ['Mt Druit', 'Mt Kosciuszko', 'Mt Panorama', 'Mt Owen'],
      a: 1
    },
    {
      q: `Who was Australia's first PM?`,
      o: ['Edmund Barton', 'John Howard', 'Alfred Deakin', 'Andrew Fisher' ],
      a: 0
    }
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);

        radioElement.disabled = true;

        if (quizItem.a == i) {
          // check if it is 
          if(radioElement.checked) {
            // if that radio item was checked!
            
            
            // make the bg color green!
            liElement.classList.add("text-success", "font-weight-bold");
          } else {
            // make text color red!
            liElement.classList.add("text-danger", "font-weight-bold");
          }
        }

        if (radioElement.checked) {
          // highlight the bg color!
          liElement.classList.add("bg-light")

          if(quizItem.a == i){
            console.log(`You got question ${index + 1} right`)
            score++;
          }
        }
      }
    });
    console.log(score);
    
    topAlert.innerHTML = `You scored ${score} ${(score === 1) ? 'point' : 'points'}!`
    topAlert.classList.remove('alert-danger');
    topAlert.classList.add('alert-primary')
  };

  // call the displayQuiz function
  displayQuiz();
});
