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
        $('#room-list').empty();
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

function poll(fn, callback, errback, timeout, interval) {
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

    (function p() {
            // If the condition is met, we're done! 
            if(fn()) {
                callback();
            }
            // If the condition isn't met but the timeout hasn't elapsed, go again
            else if (Number(new Date()) < endTime) {
                console.log("happended");

                getRooms();
                setTimeout(p, interval);
            }
            // Didn't match and too much time, reject!
            else {
                errback(new Error('timed out for ' + fn + ': ' + arguments));
            }
    })();
}
