makeCalendar();

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
      dayFinalHtml += dayTemplateHtml.replace(/{{day}}/g, day.date());
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
  // Cache of moment object that contains all kinds of information about this moment in time
  var now = moment();
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

/*
var template = document.getElementById("template-list-item");
var templateHtml = template.innerHTML;

// Ajax Call
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState == XMLHttpRequest.DONE) {
    // On success
    if (xhr.state == 200) {
      // Convert JSON string response to an Object
      var dataObject = JSON.parse(xhr.responseText);

      document.getElementById("list").innerHTML = listCreateHtml(dataObject);
    }
  }
}

xhr.open("GET", "/url/to/get-data/", true);
xhr.send();

// Function to generate and returns the HTML.
// Accepts an object as a parameter
function listCreateHtml(dataObject) {
  var listHtml = "";

  for (key in dataObject) {\
    listHtml += templateHtml.replace(/{{id}}/g, dataObject[key]["id"])
                            .replace(/{{name}}/g, dataObject[key]["name"])
                            .replace(/{{city}}/g, dataObject[key]["city"])
                            .replace(/{{state}}/g, dataObject[key]["state"])
                            .replace(/{{url}}/g, dataObject[key]["url"]);
  }

  return listHtml;
}
 */