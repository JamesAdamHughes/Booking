exports.createController = function () {
    var self = this;

    var rooms = buildRooms();
    
    var bookRoom = function(roomID, employees){
        var room = rooms.filter(function(rm){
            return rm.id === roomID;
        })[0];

        if(room && room.free){
            room.free = false;
            room.employees = employees;
            return true;
        } else {
            // room already booked
            return false;
        }
    }

    var getRooms = function(){
        return rooms;
    }

    return {
        bookRoom: bookRoom,
        getRooms: getRooms
    };
}

function buildRooms() {
    return [{
        name: 'The Recuit',
        id: 0,
        free: true,
        employees: []
    }, {
            name: 'The Avengers',
            id: 1,
            free: true,
            employees: []
        }, {
            name: 'Captain America',
            id: 2,
            free: true,
            employees: []
        }];
}