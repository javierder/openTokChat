(function ( $ ) {
 	var $self;
  var $chatBox;
  var $inputBox;
  var $sendButton;
  var $chatMessages;
  var $chatInput;
  var $chatSendButton;
  var openSession;

  var openTokChatSettings;

  $.fn.openTokChat = function( command, options ) {

  	if(command == "init")
  	{
      $self = this;

    	// save default settings.
        openTokChatSettings = $.extend({
        	width: "640",
        	height:"480",
          user:'Anonymous',
          session: null,
          onStart: function () {}
        }, options );

        openSession = openTokChatSettings.session;

        openSession.on('sessionConnected', sessionConnectedHandler);     
        openSession.on("signal:chat", signalReceived)
        openSession.on("sessionDisconnected", sessionDisconnectedHandler);

        drawChat(); //start up all the other js we need
        addSystemMessage("Component initialized");

        openTokChatSettings.onStart(this); 
        return this;
  	}
  };

  function drawChat () {
      // $self.text("esta");

      $self.addClass("openToKChatMain");
      $chatBox = $("<div>").addClass("messageContainer");
      $chatBox.css("width",openTokChatSettings.width);
      $chatBox.css("height",openTokChatSettings.height);

      $chatMessages = $("<ul>").addClass("chatMessages");
      $chatMessages.css("height",$chatBox.height());
      $chatMessages.css("max-height",$chatBox.height());
      $chatMessages.css("min-height",$chatBox.height());
      // $chatMessages.css("height",)

      $chatMessages.css("scroll","overwflow");

      $chatBox.append($chatMessages);

      $chatInput = $("<input>").attr("type","text").attr("class","messageInput");
      $chatInput.css("width", $chatBox.width() - 50);
      $chatInput.css("height","30px");
      $chatInput.css("padding-top","0px");


      $chatSendButton = $("<input>").attr("type","button").attr("value","Send").addClass('btn btn-success btn-sm');
      $chatSendButton.click(function  () {
        sendMessage();
      })

      $chatInput.keypress(function(e) {
        if(e.which == 13) {
            sendMessage();
        }
      });

      $chatInput.attr("disabled",true);
      $chatSendButton.attr("disabled",true)

      $self.append($chatBox);
      $self.append($chatInput);
      $self.append($chatSendButton);

  }

  function sendMessage () {
    var msg = $chatInput.val();
    if(msg == "")
      return;
    else {
      $chatInput.val("");
    }
    var data = new Object();
    data.msg = msg;
    data.user = openTokChatSettings.user;
    openSession.signal({type:"chat",data:JSON.stringify(data)})
  }

  function addUserLine(data) {
      main = $("<span>");
      obj = $("<span>").addClass("userName");
      obj.text(data.user + ": ");
      main.append(obj);
      obj2 = $("<span>").addClass("userMessage");
      obj2.text(strip(data.msg));
      main.append(obj2);
      addNewLine(main.html());
  }
  function addNewLine(html) {
      new_il = $("<li></li>");
      new_il.html(html);
      $chatMessages.append(new_il);
      $chatMessages.scrollTop(999999*9999999999); 
  }

  function signalReceived(event) {
    if(event.type == "signal:chat") {
      data = $.parseJSON(event.data);
      addUserLine(data);
    }
  }

  function sessionConnectedHandler (event) {
      $("#id_open_myllamada").text("Transmitir").removeClass("disabled");
      addSystemMessage("Chat session connected.");
      $chatInput.removeAttr("disabled");
      $chatSendButton.removeAttr("disabled");
  }

  function sessionDisconnectedHandler (event) {
    addSystemMessage("You have been disconected from the server.");
    $chatInput.attr("disabled",true);
    $chatSendButton.attr("disabled",true)

  }

  function addSystemMessage(text) {
    addNewLine("<span class='systemMessage'>"+strip(text)+"</span>");
  }



  function strip(html)
  {
     return $("<div>").text(html).html();
  }




}( jQuery ));
