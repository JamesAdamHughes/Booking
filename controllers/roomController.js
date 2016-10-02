exports.createController = function () {
    var self = this;

    var rooms = buildRooms();
    
    var bookRoom = function(roomID){
        var room = rooms.filter(function(rm){
            return rm.id === roomID;
        })[0];

        if(room && room.free){
            room.free = false;
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
}