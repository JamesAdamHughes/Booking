var api = function () {
    var self = this;

    self.drawRoom = function (room) {
        if (room.free) {
            self.drawFreeRoom(room);
        } else {
            self.drawBusyRoom(room);
        }
        return;
    };

    self.drawFreeRoom = function (room) {
        $.get('/templates/roomFree.mst', function(template){
            var rendered = Mustache.render(template, {room: room}); 
            $('#room-list').append(rendered);         
        });
        return;
    };

    self.drawBusyRoom = function (room) {
        room.prettyTime = self.getTimeStamp(room.bookedUntil);

        $.get('/templates/roomBooked.mst', function(template){
            var rendered = Mustache.render(template, {room: room}); 
            $('#room-list').append(rendered);         
        });
        return;
    }; 

    self.getTimeStamp = function (unix_timestamp) {
        var date = new Date(unix_timestamp);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();

        // Will display time in 10:30:23 format
        return hours + ':' + minutes.substr(-2);
    }

    return {
        getRooms: function () {
            return fetch('/api/getRooms', {
                method: 'GET',
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                console.log(response);
                return response.rooms;
            });
        },

        drawRooms: function (rooms) {
            $('#room-list').empty()
            rooms.forEach(function (room) {
                self.drawRoom(room);
            });
            return;
        },

        getAllPeople: function(){
            return fetch('/api/people/all', {
                method: 'GET',
            }).then(function(response){
                return response.json();
            }).then(function(response){
                console.log(response);
                return response.people;
            }).catch(function(err){
                console.log(err);
            });
        }
    }
}



