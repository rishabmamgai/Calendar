const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const currDate = new Date();


function fetch(month) {
    // Create Calendar.

    let thisMonth = findDays(month);
    
    var calendar = `<tr><th> Sunday </th><th> Monday </th><th> Tuesday </th><th> Wednesday </th><th> Thursday </th><th> Friday </th><th> Saturday </th></tr><tr>`;
    
    // Move to first day of month.
    var day1 = days.indexOf(thisMonth[0]), j = 0;
    while (j < day1) {
        calendar += "<td></td>";
        j++;
    }

    // Place dates under respective days 
    j = 1;
    thisMonth.forEach(day => {
        calendar += "<td>" + j + "</td>";

        if(days.indexOf(day) % 7 === 6) {
            calendar += "</tr> <tr>";
        }

        j++;
    });

    // Add empty tags
    j = days.indexOf(thisMonth[thisMonth.length-1]);
    while (j != 6) {
        calendar += "<td></td>";
        j++;
    }

    calendar += "</tr>";

    document.getElementById("calendar").innerHTML = calendar;
}


function findDays(month) {
    // Orders days in a month and returns a list.

    let currYear = currDate.getFullYear();
    let numberOfDays = daysInMonth(months.indexOf(month)+1, currYear);

    let thisMonth = [];

    for (let date = 1; date <= numberOfDays; ++date) {
        let day = new Date(month + " " + date + ", " + currYear).getDay();
        thisMonth.push(days[day]);
    }

    return thisMonth;
}


function daysInMonth(month, year) {
    // Finds number of days in a month.

    return new Date(year, month, 0).getDate();
}


window.onload = function() {
    // Loads calendar.

    document.getElementById("month").innerHTML = "January";
    fetch("January");
}


function slider(where) {
    // Navigates to next or previous month.

    let curr = months.indexOf(document.getElementById("month").innerHTML);

    if(where === 0) {
        if(curr != 0) {
            fetch(months[curr-1]);
            document.getElementById("month").innerHTML = months[curr-1];
        }

        else {
            fetch(months[11]);
            document.getElementById("month").innerHTML = months[11];
        }
    }

    else if(where === 1) {
        if(curr != 11) {
            fetch(months[curr+1]);
            document.getElementById("month").innerHTML = months[curr+1];
        }

        else {
            fetch(months[0]);
            document.getElementById("month").innerHTML = months[0];
        }
    }
}
