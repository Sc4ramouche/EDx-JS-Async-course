// Global variables
let clickedArray = [];

let interval;
let started = false;
let time = 0;

let ready = true;
let numCompleted = 0;

// Execution
setUp();

// Function Definitions

function randomAnswers() {
  const answers = [1, 1, 2, 2, 3, 3, 4, 4, 5];

  answers.sort(item => {
    return 0.5 - Math.random();
  });

  return answers;
}

function setUp() {
  const grid = document.getElementsByTagName('td');
  const answers = randomAnswers();

  for (let i = 0; i < grid.length; i++) {
    let cell = grid[i];
    cell.setAttribute('completed', false);
    cell.setAttribute('clicked', false);
    cell.setAttribute('value', answers[i]);

    cell.addEventListener('click', function revealTrigger() {
      startTimer();

      if (ready == false) return;

      if (this.getAttribute('clicked') === 'false' && this.getAttribute('completed') === 'false') {
        clickedArray.push(this);
        reveal(this);
      }

      if (clickedArray.length == 2) {
        if (clickedArray[0].getAttribute('value') == clickedArray[1].getAttribute('value')) {
          complete(clickedArray[0]);
          complete(clickedArray[1]);

          clickedArray = [];

          if (numCompleted == 8) {
            alert('You won in ' + time + ' seconds!');
            clearInterval(interval);
          }
        } else {
          ready = false;
          document.getElementById('gridTable').style.border = '3px solid #F44336';

          setTimeout(function () {
            hide(clickedArray[0]);
            hide(clickedArray[1]);

            clickedArray = [];

            ready = true;
            document.getElementById("gridTable").style.border = "3px solid #424242";
          }, 750);
        }
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key > 0 && event.key < 10) {
      grid[event.key - 1].click();
    }
  });

  document.getElementById('restart').addEventListener('click', function () {
    location.reload();
  });
}

function reveal(cell) {
  cell.style.backgroundColor = '#F44336';
  cell.innerHTML = cell.getAttribute('value');
  cell.setAttribute('clicked', true);
}

function hide(cell) {
  cell.style.backgroundColor = '#2196F3';
  cell.innerHTML = '';
  cell.setAttribute('clicked', false);
}

function complete(cell) {
  numCompleted++;
  cell.setAttribute('completed', true);
  cell.style.backgroundColor = '#9C27B0';
}

function startTimer() {
  if (!started) {
    interval = setInterval(function () {
      time++;
      document.getElementById('timer').innerHTML = 'Time elapsed: ' + time;
    }, 1000);
    started = true;
  }
}
