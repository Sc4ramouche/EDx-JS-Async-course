let time;
let interval;
let ready = true;

initialize();

function initialize() {
  const timer = document.getElementById('timer');
  const startStopBtn = document.getElementById('startStop');
  timer.setAttribute('started', false);

  time = Number(timer.innerHTML);

  startStopBtn.addEventListener('click', function () {
    if (timer.getAttribute('started') == 'true') {
      setTimeout(function () {
        timer.setAttribute('started', false);
      }, 10);
      clearInterval(interval);
    }

    if (timer.getAttribute('started') == 'false') {
      timer.setAttribute('started', true);

      interval = setInterval(function () {
        time += 0.01;
        timer.innerHTML = time.toFixed(2);
      }, 10);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key == 's' || event.key == 'S') {
      startStopBtn.click();
    }
  });


  makeRecords();
  reset();
}

function makeRecords() {
  const recordBtn = document.getElementById('record');
  const list = document.getElementById('list');

  recordBtn.addEventListener('click', function () {
    let newRecord = document.createElement('li');
    newRecord.innerHTML = document.getElementById('timer').innerHTML;
    list.appendChild(newRecord);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key == 't' || event.key == 'T') {
      recordBtn.click();
    }
  });
}

function reset() {
  const timer = document.getElementById('timer');
  const resetBtn = document.getElementById('reset');
  const list = document.getElementById('list');

  resetBtn.addEventListener('click', function () {
    clearInterval(interval);
    timer.setAttribute('started', false);
    timer.innerHTML = 0;
    time = 0;
    list.innerHTML = '';
  });

  document.addEventListener('keydown', function (event) {
    if (event.key == 'r' || event.key == 'R') {
      resetBtn.click();
    }
  });
}