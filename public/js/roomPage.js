function getRooms() {
    fetch('/api/getRooms', {
        method: 'GET',
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        console.log(response);

        response.rooms.forEach(function (room) {

            if (room.free) {
                $('#roomList').append('<div class="roombox room-free" onclick="selectRoom(' + room.id + ')"><h1 class="name">' + room.name + '</h1></div>');
            } else {
                $('#roomList').append('<div class="roombox room-taken" onclick="selectRoom(' + room.id + ')"><h1 class="name">' + room.name + '</h1></div>');
            }

        });
    });
}