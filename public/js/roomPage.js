/*
    Fetch all the rooms from server
    Draw rooms on page with different styles if they are free or not
*/
var rooms = [];

function getRooms() {
    var API = api();
    console.log(API);
    API.getRooms().then(function(rms){
        rooms = rms;
        $('#room-list').append(API.drawRooms(rooms));
    });
}

// Go to room booking page
function bookRoom(){
    window.location.href = '/book';
}

function selectRoom(id) {
    var room = rooms.filter(function(rm){
        return rm.id === id;
    })[0];

    if(room && room.free){
        window.location.href = '/book?roomID=' + id;
    }
}
