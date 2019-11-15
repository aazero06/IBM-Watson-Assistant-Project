// The ConversationPanel module is designed to handle
// all display and behaviors of the conversation column of the app.
/* eslint no-unused-vars: "off" */
/* global Api: true, Common: true*/

var ConversationPanel = (function() {
  var settings = {
    selectors: {
      chatBox: '#scrollingChat',
      fromUser: '.from-user',
      fromWatson: '.from-watson',
      latest: '.latest'
    },
    authorTypes: {
      user: 'user',
      watson: 'watson'
    }
  };

  // Publicly accessible methods defined
  return {
    init: init,
    inputKeyDown: inputKeyDown
  };

  // Initialize the module
  function init() {
    chatUpdateSetup();
    Api.sendRequest( '', null );
    setupInputBox();
  }
  // Set up callbacks on payload setters in Api module
  // This causes the displayMessage function to be called when messages are sent / received
  function chatUpdateSetup() {
    var currentRequestPayloadSetter = Api.setRequestPayload;
    Api.setRequestPayload = function(newPayloadStr) {
      currentRequestPayloadSetter.call(Api, newPayloadStr);
      displayMessage(JSON.parse(newPayloadStr), settings.authorTypes.user);
    };

    var currentResponsePayloadSetter = Api.setResponsePayload;
    Api.setResponsePayload = function(newPayloadStr) {
      currentResponsePayloadSetter.call(Api, newPayloadStr);
	  
	  var get = JSON.parse(newPayloadStr) ;
	  
	  if ( get.context ) {  
	  
	    // deal with whole clothes set up
	    if (get.context.shirt_finish && get.context.pants_finish) {
			// document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlycloth_t-shits/t-shirt_black.png";
			var img_src = new String() ;
			var tmp = new String() ;
			var shirt = new String() ;
			var pants = new String() ;
			
			// 上衣樣式與長短袖
			if (String(get.context.shirt_type) == "毛衣") {
				shirt = "sweater_" ;
			}
			
			else if (String(get.context.shirt_type) == "T恤") {
				shirt = "t-shit_" ;
			}
			// 襯衫
			else {
				
				if (String(get.context.shirt_size) == "短袖") {
			 		shirt = "shortsuit_" ;
				}
				// 長袖
				else {
					shirt = "longsuit_" ;
				}
				
			}
			
			// 上衣顏色
			// 黑色
			if (String(get.context.shirt_color) == "黑色") {
				shirt = shirt + "black_" ;
			}
			
			// 白色
			else if (String(get.context.shirt_color) == "白色") {
				shirt = shirt + "white_" ;
			}
			
			// 藍色
			else {
				shirt = shirt + "blue_" ;
			}
			
			// 褲子長短
			// 短褲
			if (String(get.context.pants_size) == "短") {
				pants = "shortpants_" ;
			}
			// 長褲
			else {
				pants = "longpants_" ;
			}
			
			// 褲子版型
			if (String(get.context.pants_type) == "牛仔裤") {
				pants = pants + "cow.png" ;
			}
			
			else if (String(get.context.pants_type) == "西装裤") {
				pants = pants + "suit.png" ;
			}
			
			else {
				pants = pants + "sports.png" ;
			}
			
			img_src = "https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/clothandpants/" + shirt + pants ;
			console.log(img_src) ;
			document.getElementById("img_men").src=img_src ;
		} 
		
		// 選好上衣
		else if (get.context.shirt_finish) {
			var shirt_size = get.context.shirt_size ;
			var shirt_type = get.context.shirt_type ;
			var shirt_color = get.context.shirt_color ;
			setupShirt(shirt_size, shirt_type, shirt_color) ;
		} 
		
		// 選好褲子
		else if (get.context.pants_finish) {
			var pants_size = get.context.pants_size ;
			var pants_type = get.context.pants_type ;
			setupPants(pants_size, pants_type);	
		}

	  }
	  
      displayMessage(JSON.parse(newPayloadStr), settings.authorTypes.watson);
    };
  }

  function setupPants(pants_size, pants_type) {
	
	// 處理長短袖問題
	// 短袖
	if (String(pants_size) == "短") {	
	
		// 樣式
		// 牛仔褲
		if (String(pants_type) == "牛仔裤") {
			document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlypants/shortpants_cow.png";		
		}
		// 運動褲
		else {
			document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlypants/shortpants_sports.png";	
		}
	
	}
		// 長袖
	else {
		
		// 樣式
		// 牛仔褲
		if (String(pants_type) == "牛仔裤") {
			document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlypants/longpants_cow.png";	
		}
		// 西裝褲
		else {
			document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlypants/longpants_suit.png";
		}
		
	}
	  
  }
  
  function setupShirt(shirt_size, shirt_type, shirt_color) {
	  
	// 處理長短袖問題
	// 短袖
	if (String(shirt_size) == "短袖") {	
	
		// 樣式
		// T恤
		if (String(shirt_type) == "T恤") {
			
			// 顏色
			// 黑色
			if (String(shirt_color) == "黑色") {
				document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlycloth_t-shits/t-shirt_black.png";
			}
			
			// 白色
			else if (String(shirt_color) == "白色") {
				document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlycloth_t-shits/t-shirt_white.png";
			}
			
			// 藍色
			else {
				document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlycloth_t-shits/t-shirt_blue.png";
			}
			
		}
		// 襯衫
		else {
			
			// 顏色
			// 黑色
			if (String(shirt_color) == "黑色") {
				document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlycloth_shortsuits/shortsuit_black.png";
			}
			
			// 白色
			else if (String(shirt_color) == "白色") {
				document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlycloth_shortsuits/shortsuit_white.png";
			}
			
		}
	
	}
	// 長袖
	else {
		
		// 樣式
		// 毛衣
		if (String(shirt_type) == "毛衣") {
			
			// 顏色
			// 黑色
			if (String(shirt_color) == "黑色") {
				document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlycloth_sweater/sweater_black.png";
			}
			
			// 白色
			else if (String(shirt_color) == "白色") {
				document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlycloth_sweater/sweater_white.png";
			}
			
			// 藍色
			else {
				document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlycloth_sweater/sweater_blue.png";
			}
			
		}
		// 襯衫
		else {
			
			// 顏色
			// 黑色
			if (String(shirt_color) == "黑色") {
				document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlycloth_longsuits/longsuit_black.png";
			}
			
			// 白色
			else if (String(shirt_color) == "白色") {
				document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlycloth_longsuits/longsuit_white.png";
			}
			
			// 藍色
			else {
				document.getElementById("img_men").src="https://731719a7-40e9-4d9c-8b89-5182b49aa8ee-bluemix.cloudant.com/cloth/onlycloth_longsuits/longsuit_blue.png";
			}
			
		}
		
	}
			
	  
  }
// Set up the input box to underline text as it is typed
  // This is done by creating a hidden dummy version of the input box that
  // is used to determine what the width of the input text should be.
  // This value is then used to set the new width of the visible input box.
  function setupInputBox() {
    var input = document.getElementById('textInput');
    var dummy = document.getElementById('textInputDummy');
    var minFontSize = 14;
    var maxFontSize = 16;
    var minPadding = 4;
    var maxPadding = 6;

    // If no dummy input box exists, create one
    if (dummy === null) {
      var dummyJson = {
        'tagName': 'div',
        'attributes': [{
          'name': 'id',
          'value': 'textInputDummy'
        }]
      };

      dummy = Common.buildDomElement(dummyJson);
      document.body.appendChild(dummy);
    }

    function adjustInput() {
      if (input.value === '') {
        // If the input box is empty, remove the underline
        input.classList.remove('underline');
        input.setAttribute('style', 'width:' + '100%');
        input.style.width = '100%';
      } else {
        // otherwise, adjust the dummy text to match, and then set the width of
        // the visible input box to match it (thus extending the underline)
        input.classList.add('underline');
        var txtNode = document.createTextNode(input.value);
        ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height',
          'text-transform', 'letter-spacing'].forEach(function(index) {
            dummy.style[index] = window.getComputedStyle(input, null).getPropertyValue(index);
          });
        dummy.textContent = txtNode.textContent;

        var padding = 0;
        var htmlElem = document.getElementsByTagName('html')[0];
        var currentFontSize = parseInt(window.getComputedStyle(htmlElem, null).getPropertyValue('font-size'), 10);
        if (currentFontSize) {
          padding = Math.floor((currentFontSize - minFontSize) / (maxFontSize - minFontSize)
            * (maxPadding - minPadding) + minPadding);
        } else {
          padding = maxPadding;
        }

        var widthValue = ( dummy.offsetWidth + padding) + 'px';
        input.setAttribute('style', 'width:' + widthValue);
        input.style.width = widthValue;
      }
    }

    // Any time the input changes, or the window resizes, adjust the size of the input box
    input.addEventListener('input', adjustInput);
    window.addEventListener('resize', adjustInput);

    // Trigger the input event once to set up the input box and dummy element
    Common.fireEvent(input, 'input');
  }

  // Display a user or Watson message that has just been sent/received
  function displayMessage(newPayload, typeValue) {
    var isUser = isUserMessage(typeValue);
    var textExists = (newPayload.input && newPayload.input.text)
      || (newPayload.output && newPayload.output.text);
    if (isUser !== null && textExists) {
      // Create new message DOM element
      var messageDivs = buildMessageDomElements(newPayload, isUser);
      var chatBoxElement = document.querySelector(settings.selectors.chatBox);
      var previousLatest = chatBoxElement.querySelectorAll((isUser
              ? settings.selectors.fromUser : settings.selectors.fromWatson)
              + settings.selectors.latest);
      // Previous "latest" message is no longer the most recent
      if (previousLatest) {
        Common.listForEach(previousLatest, function(element) {
          element.classList.remove('latest');
        });
      }

      messageDivs.forEach(function(currentDiv) {
        chatBoxElement.appendChild(currentDiv);
        // Class to start fade in animation
        currentDiv.classList.add('load');
      });
      // Move chat to the most recent messages when new messages are added
      scrollToChatBottom();
    }
  }

  // Checks if the given typeValue matches with the user "name", the Watson "name", or neither
  // Returns true if user, false if Watson, and null if neither
  // Used to keep track of whether a message was from the user or Watson
  function isUserMessage(typeValue) {
    if (typeValue === settings.authorTypes.user) {
      return true;
    } else if (typeValue === settings.authorTypes.watson) {
      return false;
    }
    return null;
  }

  // Constructs new DOM element from a message payload
  function buildMessageDomElements(newPayload, isUser) {
    var textArray = isUser ? newPayload.input.text : newPayload.output.text;
    if (Object.prototype.toString.call( textArray ) !== '[object Array]') {
      textArray = [textArray];
    }
    var messageArray = [];

    textArray.forEach(function(currentText) {
      if (currentText) {
        var messageJson = {
          // <div class='segments'>
          'tagName': 'div',
          'classNames': ['segments'],
          'children': [{
            // <div class='from-user/from-watson latest'>
            'tagName': 'div',
            'classNames': [(isUser ? 'from-user' : 'from-watson'), 'latest', ((messageArray.length === 0) ? 'top' : 'sub')],
            'children': [{
              // <div class='message-inner'>
              'tagName': 'div',
              'classNames': ['message-inner'],
              'children': [{
                // <p>{messageText}</p>
                'tagName': 'p',
                'text': currentText
              }]
            }]
          }]
        };
        messageArray.push(Common.buildDomElement(messageJson));
      }
    });

    return messageArray;
  }

  // Scroll to the bottom of the chat window (to the most recent messages)
  // Note: this method will bring the most recent user message into view,
  //   even if the most recent message is from Watson.
  //   This is done so that the "context" of the conversation is maintained in the view,
  //   even if the Watson message is long.
  function scrollToChatBottom() {
    var scrollingChat = document.querySelector('#scrollingChat');

    // Scroll to the latest message sent by the user
    var scrollEl = scrollingChat.querySelector(settings.selectors.fromUser
            + settings.selectors.latest);
    if (scrollEl) {
      scrollingChat.scrollTop = scrollEl.offsetTop;
    }
  }

  // Handles the submission of input
  function inputKeyDown(event, inputBox) {
    // Submit on enter key, dis-allowing blank messages
    if (event.keyCode === 13 && inputBox.value) {
      // Retrieve the context from the previous server response
      var context;
      var latestResponse = Api.getResponsePayload();
      if (latestResponse) {
        context = latestResponse.context;
      }

      // Send the user message
      Api.sendRequest(inputBox.value, context);

      // Clear input box for further messages
      inputBox.value = '';
      Common.fireEvent(inputBox, 'input');
    }
  }
}());
