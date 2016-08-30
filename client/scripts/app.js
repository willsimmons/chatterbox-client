

$(document).ready(function() {
 app.fetch();

 $("#newMessage").on("submit", function(event){
  event.preventDefault();
  
  var message={};
  message.username=$("#username").val();
  message.room=$("#room").val();
  message.text=$("#message").val();

  app.send(message)
  

})

 

});

var app={};

app.fetch= function(){
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
};


app.send= function(message){
  console.log("inside send")

  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    dataType: "JSON",
    
    success: function (data) {
      console.log('chatterbox: Message sent');
      // 
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};


app.init= function(){}
app.addMessage= function(message){
  var appendThis;
  $.each(message.results, function(i, object){
    
    $.each(object, function(username, text, roomName){
     var cleanString= object.text
     if(cleanString.match(/^[0-9a-zA-Z]{1,16}$/)){
      //$("#chats").append("<div>"+ "<strong>" +object.username+ "</strong>"  + ": " + cleanString+ "   " + object.createdAt+"</div>");
      appendThis="<div>"+ "<strong>" +object.username+ "</strong>"  + ": " + cleanString+ "   " + object.createdAt+"</div>"    
    }
  })
    $("#chats").append(appendThis)
  })

  

}
app.addRoom= function(roomName) {};
app.addFriend= function(userName) {
 $(".friends").append("<div>" + userName + "</div>")
}
app.handleSubmit= function(){} ;


