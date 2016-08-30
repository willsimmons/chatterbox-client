$(document).ready(function() {
  var friends = [];
  var rooms = [];
  //app initialization
  
  //event handlers
  $("#newMessage").on("submit", function(event){
    event.preventDefault();
    var message={};
    message.username=$("#username").val();
    message.room=$("#room").val();
    message.text=$("#message").val();
    app.send(message);
    // figure out how to put the new message up top
  });

  $("#clear").click(function(event){
    event.preventDefault();
    app.clearMessages();
  });

  $('#chats').on('click', '.friend', function(){ 
    console.log(this);
  });

  var app={

    clearMessages: function(){
     $("#chats").children().remove();
    },

    fetch: function(){
      $.ajax({
        url: "https://api.parse.com/1/classes/chatterbox",
        type: 'GET',
        contentType: "appication/json; charset=utf-8",
        data: {
          order:"-createdAt"
        },
        success: function(data) {
        // changes just use data.results;
        var JSONObject= data;
        app.addMessage(JSONObject,friends,rooms);
        app.cleanRooms(friends,rooms);
        app.addRoom(rooms);
        app.addFriend(friends);

      },
      error: function(data, textStatus, error) {
        console.log('error: ', data, 'data', textStatus, 'error', error);
      }
    });
    },

    send: function(message){
      $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        data: JSON.stringify(message),
        dataType: "JSON",
        success: function (data) {
          console.log('chatterbox: Message sent'); 
          //maybe put this on top of messages - worst case
          //automatically refresh when new message is added
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
    },

    init: function(){
      app.fetch();
    },

    addMessage: function(message,friends,rooms){
      var cleanString;
      $.each(message.results, function(index, object){
        $.each(object, function(){
          cleanString = object.text;
          if(cleanString !== undefined){
            cleanString.replace(/^[0-9a-zA-Z]{1,16}$/);
          }
          cleanString = '<div class="friend"><strong>'+object.username+ "</strong>"  + ": " + cleanString+ "   " + object.createdAt+"</div>";
          friends.push(object.username);
          rooms.push(object.roomname);
        });
        $("#chats").append(cleanString);
      });
      app.cleanRooms(friends,rooms);
    },

  //get only one copy of each room and each friend in the messages div
  cleanRooms: function (friends,rooms){
    friends = _(friends).unique();  // _.unique(friends);
    rooms =_(rooms).unique();
    //put all the rooms in the drop down menu
    // app.addFriend(friends);
  },
  //change drop down menus
  addRoom: function(roomList) {
    roomList =_(roomList).unique();
    for (var i = 0; i < roomList.length; i++) {
      $('#roomSelect').append("<option>"+ roomList[i]+"</option>");
    }
  },
  
  addFriend: function(friendList) {
    friendList =_(friendList).unique();
    for (var i = 0; i < friendList.length; i++) {
      $('#friendSelect').append("<option>"+ friendList[i]+"</option>");
    }
  },

  handleSubmit: function(){}

};

app.init();
});
