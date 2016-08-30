$(document).ready(function() {

  //app initialization
  app.init();
  
  //app event handlers this should be refactored and put into init
  $("#newMessage").on("submit", function(event){
    event.preventDefault();
    var message={};
    message.username=$("#username").val();
    message.room=$("#room").val();
    message.text=$("#message").val();
    app.send(message);
  });
});

var app={

  fetch: function(){
    $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: 'GET',
      contentType: "appication/json; charset=utf-8",
      data: {
        order:"-createdAt"
      },
      success: function(data) {
        var JSONObject= data;
        app.addMessage(JSONObject);
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
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  init: function(){
    app.fetch();
  },
  
  addMessage: function(message){
    var appendThis;
    $.each(message.results, function(i, object){
      $.each(object, function(username, text, roomName){
        var cleanString= object.text;
         if(cleanString.match(/^[0-9a-zA-Z]{1,16}$/)){
           appendThis="<div>"+ "<strong>" +object.username+ "</strong>"  + ": " + cleanString+ "   " + object.createdAt+"</div>"    
         }
      });
      $("#chats").append(appendThis);
    });
  },
  
  addRoom: function(roomName) {},
  
  addFriend: function(userName) {
    $(".friends").append("<div>" + userName + "</div>")
  },
 
 handleSubmit: function(){}

};
