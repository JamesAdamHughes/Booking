var RoomController = require('../controllers/roomController.js');
var PeopleController = require('../controllers/peopleController.js');
var roomController = RoomController.createController()
var peopleController = PeopleController.createController()

exports.getRooms = function(req, res){
  console.log('GET /api/getRooms');

  var response = {
    ok: true
  };

  response.rooms = roomController.getRooms();

  res.json(response);
}

exports.requestBooking = function(req, res) {
  console.log("PUT /api/requestBooking" + JSON.stringify(req.body));

  var response = {
    ok: false
  };

  // Try to book the room
  if(roomController.bookRoom(req.body.room, req.body.employees, req.body.time)){
    // Booking successful, go back to home screen
    response.ok = true;
  } else {
    // Booking not successful, try another room
  }

  console.log(response);
  res.json(response);
}

exports.getAllPeople = function(req, res) {
  console.log("GET /api/people/all");

  var response = {
    ok: true,
    people: peopleController.getAllPeople()
  };

  res.json(response);
}