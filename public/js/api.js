var api = function () {
    var self = this;

    self.drawRoom = function (room) {
        var element = '';

        if (room.free) {
            element = self.drawFreeRoom(room);
        } else {
            element = self.drawBusyRoom(room);
        }
        return element;
    };

    self.drawFreeRoom = function (room) {
        return '<div class="roombox room-free" onclick="selectRoom(' + room.id + ')"><h1 class="name">' + room.name + '</h1></div>';
    };

    self.drawBusyRoom = function (room) {
        var listEl = '<ul>';

        // add employees in the room to the list
        room.employees.forEach(function (emp) {
            listEl = listEl + '<li>' + emp.name + '</li>';
        });
        listEl = listEl + '</ul>';

        return '<div class="roombox room-busy" onclick="selectRoom(' + room.id + ')"><h1 class="name">' + room.name + '</h1>' + listEl + '</div>';
    }; 

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
            var elements = ''
            rooms.forEach(function (room) {
                elements = elements + self.drawRoom(room);
            });
            return elements;
        }
    }
}



