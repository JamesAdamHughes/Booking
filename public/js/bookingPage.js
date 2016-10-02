var employee_names = ['Miranda', 'Jasmine', 'James', 'JB', 'Dainius', 'Kitty', 'Antionia', 'Heidi', 'Kevin', 'Joe', 'Graham'];
var employees = [];
var rooms = [{
    name: 'The Recuit',
    id: 0,
    free: true
}, {
    name: 'The Avengers',
    id: 1,
    free: true
}, {
    name: 'Captain America',
    id: 2,
    free: true
}];

// Setup list of emps and rooms
function createEmployees() {
    
    var API = api();

    employee_names.sort();

    // Add employees to available list
    employee_names.forEach(function(employee, index) {
        var emp = {
            name: employee,
            id: index,
            selected: false
        }
        employees.push(emp);

        addEmployeeToList(emp, '#availableEmployees ul');
    });

    API.getRooms().then(function(rooms){
        $('#room-list').append(API.drawRooms(rooms));
    });
}


// Handle an employee being selected
// Switch which list an employee is in
function employeeSelected(id) {
    var numSelectedEmployees = 0;

    employees[id].selected = !employees[id].selected;

    // clear both lists and then fill with updated selected and updated listts
    $('#availableEmployees ul').empty();
    $('#selectedEmployees ul').empty();

    employees.forEach(function(employee) {
        if (employee.selected) {
            numSelectedEmployees = numSelectedEmployees + 1;
            addEmployeeToList(employee, '#selectedEmployees ul');
        } else {
            addEmployeeToList(employee, '#availableEmployees ul');
        }
    });

    // If more than 2 people selected, allow move on to select room stage
    if (numSelectedEmployees > 1) {
        allowSelectRoom = true;
        $('#make-booking-button').css('background-color', 'green');
        $('#make-booking-button-text').text('Select a Meeting Room');

    } else {
        allowSelectRoom = false;
        $('#make-booking-button').css('background-color', 'red');
        $('#make-booking-button-text').text('Select Who\'s In the Meeting First');
    }


}

function addEmployeeToList(emp, list) {
    $(list).append('<li onclick="employeeSelected(' + emp.id + ')">' + emp.name + '</li>');
}

// Handle a room being Selected
// Subject request to book to server
//      if successful will move user back to room overview page with success screen
//      otherwise do something else
function makeBooking(id) {
    // don't allow another selecton in the meantime
    allowSelectRoom = false;

    var bookingRequest = {
        employees: employees.filter(function(emp){
            return emp.selected;
        }),
        room: getParameterByName('roomID')
    };

    console.log(bookingRequest);

    // Send booking request, if successful go back to home screen
    // Otherwise try another room
    fetch('/api/requestBooking/', {
        method: 'POST',
        body: JSON.stringify(bookingRequest),
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        })
    }).then(function(response){
        return response.json();
    }).then(function(response){
        console.log(response);
        // check if booking successful and do appriproiate action
        if(response.ok){
            window.location.href = '/';
        } else {

        }
    });
}

// FROM http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

