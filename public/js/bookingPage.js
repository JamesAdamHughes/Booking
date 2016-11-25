var employees = [];
var meetingLengths = ["1", "5", "10", "30", "60", "90"];

// Empty booking request object
var bookingRequest = {};
var numSelectedEmployees = 0;

function setup(){
    createEmployees();
    createTimes();
    checkAllowBooking();
}

// Setup list of emps and rooms
function createEmployees() {

    var API = api();

    //get the employees from the server
    API.getAllPeople().then(function(nms){
        
        // Add employees to available list
        nms.forEach(function(employee, index) {
            var emp = {
                name: employee,
                id: index,
                selected: false
            }
            employees.push(emp);

            addEmployeeToList(emp, '#availableEmployees ul');
        });

        return API.getRooms();
    }).then(function(rooms){
         $('#room-list').append(API.drawRooms(rooms));
    });
}

function createTimes() {
    meetingLengths.forEach(function(meets){
        $.get('templates/timeListElement.mst', function(template){
            var rendered = Mustache.render(template, {meets:meets});
            $('#time-select ul').append(rendered);
        });
    });
}


// Handle an employee being selected
// Switch which list an employee is in
function employeeSelected(id) {

    numSelectedEmployees = 0;

    // If deslecting a current employee, reduce count
    if(employees[id].selected){
       numSelectedEmployees = numSelectedEmployees - 1;
    }

    employees[id].selected = !employees[id].selected;

    // clear both lists and then fill with updated selected and updated listts
    $('#availableEmployees ul').empty();
    $('#selectedEmployees ul').empty();

    employees.forEach(function(employee) {
        if (employee.selected) {
            numSelectedEmployees = numSelectedEmployees + 1;
            addEmployeeToList(employee, '#selectedEmployees ul', true);
        } else {
            addEmployeeToList(employee, '#availableEmployees ul', false);
        }
    });

    checkAllowBooking();
}

// Set the length of time of the meeting
function timeSelected(time){
    console.log(time);
    $('#time-item-'+bookingRequest.time).removeClass('btn-info');


    // Visually deselect previous time
    if(bookingRequest.time){
        console.log(bookingRequest.time)
        $('#time-item-'+bookingRequest.time).addClass('btn-default');
    }

    bookingRequest.time = time;
    // $('#time-item-'+time).css('color', 'green');
    $('#time-item-'+bookingRequest.time).addClass('btn-info');


    checkAllowBooking();
}

function addEmployeeToList(emp, list, selected) {
    var selectedClass = 'btn-default';
    if(selected){
        selectedClass = 'btn-info';
    }
    $(list).append('<li onclick="employeeSelected(' + emp.id + ')"><button type="button" class="btn btn-default ' + selectedClass +' emp-button">' + emp.name + '</button></li>');
}

function checkMeetingNameSet(){
    return (getMeetingName().length > 1);
}

function getMeetingName(){
    return $('#meeting-name-input').val();
}

// Check if the all the booking info is correct and allow user to request booking
function checkAllowBooking(){

    // Check if a name has been set
    var nameSet = checkMeetingNameSet();

    if (numSelectedEmployees > 1 && bookingRequest.time && nameSet) {
        allowSelectRoom = true;
        $('#make-booking-button').addClass('btn-success');
        $('#make-booking-button').removeClass('btn-warning');
        $('#make-booking-button').html('Book Room');
    } else {
        var error = "Select ";
        var errors = [];

        if(numSelectedEmployees <= 1) {
            errors.push("Members");
        }

        if(!bookingRequest.time) {
            errors.push(" Time");
        }

        if(!nameSet) {
            errors.push(" Name");
        }

        console.log("not allowed");
        allowSelectRoom = false;

        console.log(errors.join(","));

        $('#make-booking-button').addClass('btn-warning');
        $('#make-booking-button').removeClass('btn-success');
        $('#make-booking-button').html('Select ' + errors.join(","));
    }
}

// Handle a room being Selected
// Subject request to book to server
//      if successful will move user back to room overview page with success screen
//      otherwise do something else
function makeBooking(id) {
    // don't allow another selecton in the meantime
    allowSelectRoom = false;

    // Create booking request
    bookingRequest.employees = employees.filter(function(emp){
            return emp.selected;
        });
        
    bookingRequest.room = getParameterByName('roomID');

    bookingRequest.name = getMeetingName();

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

