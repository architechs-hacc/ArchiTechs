
// Cache of moment object that contains all kinds of information about this moment in time
var now = moment();
var trainings = [];
var filteredTrainings = [];

document.getElementById('next').addEventListener('click', getNextMonth);
document.getElementById('prev').addEventListener('click', getPrevMonth);

getTrainings();
updateMonth();

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
          html += `<button>Training</button>`;
        }
      });

      dayFinalHtml += dayTemplateHtml.replace(/{{day}}/g, html);
    });
    weekFinalHtml += weekTemplateHtml.replace(/{{week}}/g, dayFinalHtml);
  });

  // Replace the HTML of the calendar with modified HTML string
  document.getElementById('calendar').innerHTML = weekFinalHtml;
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