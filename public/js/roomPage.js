/*
    Fetch all the rooms from server
    Draw rooms on page with different styles if they are free or not
*/
function getRooms() {
    var API = api();
    console.log(API);
    API.getRooms().then(function(rooms){
        $('#room-list').append(API.drawRooms(rooms));
    });
}

// Go to room booking page
function bookRoom(){
    window.location.href = '/book';
}
