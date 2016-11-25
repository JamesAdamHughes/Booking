var numRooms = 3;
var names = ["The Recruit", "The Avengers", 'Captain America'];

var BOOKINGTIMEMINUTES = true;

exports.createController = function () {
    var self = this;

    var rooms = buildRooms();


    // TODO cehck if the room needed to be freed up by checking bookedUntil
    var getRooms = function(){

        //check if rooms need to be freed up after timestamp
        rooms.forEach(function(rm){
            if(rm.bookedUntil < Date.now()){
                console.log('LOG: Freed room:' + rm.id + ' at: ' + rm.bookedUntil);
                rm.free = true;
                rm.bookedUntil = undefined;
                rm.employees = [];
                rm.meetingName = "";
            }
        })
        return rooms;
    }
    
    // Making a booking for a given room
    // Returns true if the booking was successful
    // Time is in minutes (nee to chnage to minutes)
    var bookRoom = function(roomID, employees, timeBooked, meetingName){
        
        // find the room
        var room = rooms.filter(function(rm){
            return rm.id === Number(roomID);
        })[0];


        // Book the room, set when it should be free again
        if(room && room.free){
            room.free = false;
            room.employees = employees;
            room.meetingName = meetingName;
            
            var now = Date.now();            
            if(BOOKINGTIMEMINUTES) {
                var until = now + Number(timeBooked)*1000*60; //miliseconds to minutes
            } else {
                var until = now + Number(timeBooked)*1000; //miliseconds to seconds
            }
            room.bookedUntil = until;

            console.log("LOG: Booked room:" + room.id + ' for ' + timeBooked + ' seconds');

            return true;
        } else {
            // room already booked
            return false;
        }
    }

    return {
        bookRoom: bookRoom,
        getRooms: getRooms
    };
}

function buildRooms() {
    var rooms = [];
    for(var i = 0; i < numRooms; i++){
        rooms.push(makeRoom(names[i], i));
    }
    return rooms;    
}

function makeRoom(name, id){
    return {
        name: name,
        id: id,
        free: true,
        employees:[],
        meetingName: ""
    };
}