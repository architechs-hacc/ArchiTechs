
// Cache of moment object that contains all kinds of information about this moment in time
var now = moment();
var trainings = [];
var filteredTrainings = [];
var selectedTraining = {};
var isHelperOn = false;

document.getElementById('next').addEventListener('click', getNextMonth);
document.getElementById('prev').addEventListener('click', getPrevMonth);
document.getElementById('logout').addEventListener('click', logout);
document.getElementById('toggle').addEventListener('click', toggleHelper);

getTrainings();
updateMonth();
loadUserInfo();

function loadUserInfo() {
  document.getElementById('name').innerText = 'Username: ' + window.localStorage.getItem('pipe-name');
}

// Clear stored user's name and email, and redirect back to landing page.
function logout() {
  window.localStorage.clear();
  window.location.href = '/index.html';
}

// Toggle visibility of helper elements.
function toggleHelper() {
  // Get a NodeList of elements whose class name contains 'helper'.
  var helpers = document.getElementsByClassName('helper');
  if (isHelperOn) {
    // Note: NodeList != normal list. We cannot use forEach function on it...
    for (var i = 0; i < helpers.length; i++) {
      helpers.item(i).style.display = 'none';
    }
  } else {
    for (var i = 0; i < helpers.length; i++) {
      helpers.item(i).style.display = 'block';
    }
  }

  isHelperOn = !isHelperOn;
}

function makeCalendar() {
  // Calendar object
  var calendar = getCalendar();
  // Cache of the template HTML
  var weekTemplateHtml = '<tr>{{week}}</tr>',
      dayTemplateHtml = '<td>{{day}}</td>';
  // Final HTML strings
  var weekFinalHtml = '',
      dayFinalHtml = '';

  // Loop through array, add <tr> Week </tr> for each week of the month
  calendar.forEach(function (week) {
    // Reset the day final HTML variable
    dayFinalHtml = '';
    // Loop through the week array, add <td> Date </td> for each day of the week
    week.forEach(function (day) {
      var html = `${day.date()}<br>`;

      // Add a training button for each training session found for that date.
      filteredTrainings.forEach(function (training) {
        if (training.day === day.date()) {
          html += `<button id="training-${training.id}" class="button">Training</button>`;
        }
      });

      dayFinalHtml += dayTemplateHtml.replace(/{{day}}/g, html);
    });
    weekFinalHtml += weekTemplateHtml.replace(/{{week}}/g, dayFinalHtml);
  });

  // Replace the HTML of the calendar with modified HTML string
  document.getElementById('calendar').innerHTML = weekFinalHtml;

  registerTrainingClicks();
}

// Inspired by https://stackoverflow.com/a/39803848
function getCalendar() {
  // Array that will store calendar data
  var calendar = [];
  // Numeric value of starting week and ending week of the month, relative to the whole year
  var startWeek = now.startOf('month').week(),
      endWeek = now.endOf('month').week();

  // December is an exception: manually set endWeek to 52 otherwise it will set it to 1
  if (now.month() === 11) {
    endWeek = 52;
  }

  for (var week = startWeek; week <= endWeek; week++) {
    calendar.push(
        (new Array(7)).fill(0).map(function (n, i) {
          return moment().week(week).startOf('week').clone().add(n + i, 'day');
        })
    );
  }

  return calendar;
}

function getNextMonth() {
  now.add(1, 'months');
  filterTrainings();
  makeCalendar();
  updateMonth();
}

function getPrevMonth() {
  now.subtract(1, 'months');
  filterTrainings();
  makeCalendar();
  updateMonth();
}

// Updates the month indicator UI to represent correct month.
function updateMonth() {
  document.getElementById('month').textContent = now.format('MMMM');
}

function getTrainings() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      // On success
      if (xhr.status == 200) {
        trainings = JSON.parse(xhr.responseText);
        filterTrainings();
        makeCalendar();
      }
    }
  }

  xhr.open("GET", "/api/trainings", true);
  xhr.send();
}

// Filter trainings based on current month (one that the user is looking at on the calendar).
function filterTrainings() {
  filteredTrainings = trainings.filter(function(training) {
    return training.month === now.month() + 1;
  });
}

function registerTrainingClicks() {
  filteredTrainings.forEach(function(training) {
    document.getElementById(`training-${training.id}`).addEventListener('click', selectTraining(training));
  });
}

// Returns callback function
function selectTraining(training) {
  return function() {
    console.log(training);
    selectedTraining = training;
    document.getElementById('training-id').textContent = training.id;
    document.getElementById('training-month').textContent = training.month;
    document.getElementById('training-date').textContent = training.day;
    document.getElementById('training-year').textContent = training.year;
  }
}