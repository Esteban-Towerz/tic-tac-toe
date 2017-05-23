// Use the module pattern to wrap all into a single variable or inmediately invoked function
(function(){	
	var playerOne = '#player1';
	var playerTwo = '#player2';
	var winner = "";
	// Create an object to group the html, when the game start and end respectively
	var startEnd = {
		start: "<div class='screen screen-start' id='start'>" + 
			   "<header><h1>Tic Tac Toe</h1>" + 
			   "<a href='#' class='button'>Play Game</a><br>" + 
			   "</header></div>",
		end: "<div class='screen screen-win' id='finish'>" + 
    		 "<header><h1>Tic Tac Toe</h1>" + 
    		 "<p class='message'></p>" + 
    		 "<a href='#' class='button'>New game</a>" + 
    		 "</header></div>"
	};// Append the start and finish screens to the body, then hide them
	$('body').append(startEnd.start);
	$('body').append(startEnd.end);
	$('#start, #finish').hide();

//////////////////////////////////////////////////////

	// Assemble the HTML of our new element with the above variables

	function myName() {
		var name = prompt("Please enter your name", "Anonymous");
		if (name !== null) {
			$('#player1').html(name);
		} else {
			$('#player1').val();
		}
	}

///////////////////////////////////////////////////////

	// when the page loads, the startup screen should appear.
	// Load the starting screen on page load
	// when the player clicks the start button the start screen disappears, the board appears
	(function() {
		$('#start').show();
		$('.button').click(function(){
			$('#start, #finish').hide();
			myName();
			$('#board').show();
			$(".box").each(function () {
				// this.style.backgroundImage = "none";
				// this.setAttribute("style", "backgroundImage: none");
				
				// Add programming so that when the game end. the board disappears and the game screen appears
				this.style.cssText = "backgroundImage: none";
				$(this).removeClass("box-filled-1");
				$(this).removeClass("box-filled-2");
			});
			//Remove any previously assigned active classes
			// $('li.players').removeClass('active'); this is a good practice.
			//Randomly assign starting user to keep game fair
			var li = $("ul li");
			var random = Math.floor(Math.random() * 2);
			li.eq(random % li.length).addClass("active");
			startGame();
		});
	}());

	// var li = $("ul li");
	// 		var randomMove = Math.floor(Math.random() * $('.box').length);
	// 		$('.box').eq(randomMove % li.length).addClass("active");
	// 		startGame();

//////////////////////////////////////////////////////////

    // the current player is indicated at the top of the page, is highlighted for the current player
	// Start the gameplay
	var startGame = function() {
		$('.box').each(function(){
			$(this).mouseenter(function(){ // Add the background image on hover
				if ( $(playerOne).hasClass("active")) {
					this.style.backgroundImage = "url('img/o.svg')";
				} else {
					this.style.backgroundImage = "url('img/robot.svg')";
				}
			});
			$(this).mouseleave(function(){ // On mouseleave, remove the background image
				this.style.backgroundImage = "none";
			});
		});
		// Players can only click on empty squares. When the palyer clicks on an empty square, attach the corresponding class 
		$('.box').click(function(){ // On click, check to see if user already selected it. If not, then add class box-filled, add background image, unbind the mouseleave function using off, and trigger nextTurn function to switch active class to next player. Check for win condition.
			if ($(playerOne).hasClass("active")) {
				if ( $(this).hasClass("box-filled-1") === false && $(this).hasClass("box-filled-2") === false ) {
					$(this).addClass('box-filled-1');
					this.style.backgroundImage = "url('img/o.svg')";
					$(this).off('mouseenter mouseleave');
					checkWin();
					nextTurn();
				}
			} else if ($(playerTwo).hasClass("active")) {
				if ( $(this).hasClass("box-filled-1") === false && $(this).hasClass("box-filled-2") === false ) {
					$(this).addClass('box-filled-2');
					this.style.backgroundImage = "url('img/robot.svg')";
					$(this).off('mouseenter mouseleave');
					checkWin();
					nextTurn();
				}
			} else {
				console.log("No more turns!");
			}
			
		});	
	};

	var nextTurn = function() {
		if ( $(playerOne).hasClass('active') ) {
			$(playerOne).removeClass("active");
			$(playerTwo).addClass("active");
		} else {
			$(playerTwo).removeClass("active");
			$(playerOne).addClass("active");
		}
	};

	var checkWin = function() {
		// Create empty arrary of moves
		var winning = [];
		//Loop over boxes and add currently placed piece
		$('.box').each(function(){
			if ($(this).hasClass('box-filled-1')) {
				winning.push("player1");
			} else if ($(this).hasClass('box-filled-2')) {
				winning.push("player2");
			} else {
				winning.push("empty");
			}
		});
		// the game ends when one player has three of their symbols in a row either horizontally, vertically or diagonally. if all of the squares are filled and no players have three in a row thr game is a tie.
		// Check the array to find winning combinations. If pieces match one in 8 possible combinations, set the winner to matching name
			if (winning[0] !== "empty" && winning[0] === winning[1] && winning[1] === winning[2]) {
				winner = winning[0];
				showWinner();
			} else if (winning[3] !== "empty" && winning[3] === winning[4] && winning[4] === winning[5]) {
				winner = winning[3];
				showWinner();
			} else if (winning[6] !== "empty" && winning[6] === winning[7] && winning[7] === winning[8]) {
				winner = winning[6];
				showWinner();
			} else if (winning[0] !== "empty" && winning[0] === winning[3] && winning[3] === winning[6]) {
				winner = winning[0];
				showWinner();
			} else if (winning[1] !== "empty" && winning[1] === winning[4] && winning[4] === winning[7]) {
				winner = winning[1];
				showWinner();
			} else if (winning[2] !== "empty" && winning[2] === winning[5] && winning[5] === winning[8]) {
				winner = winning[2];
				showWinner();
			} else if (winning[0] !== "empty" && winning[0] === winning[4] && winning[4] === winning[8]) {
				winner = winning[0];
				showWinner();
			} else if (winning[2] !== "empty" && winning[2] === winning[4] && winning[4] === winning[6]) {
				winner = winning[2];
				showWinner();
			} else if (winning.includes("empty") === false){
				winner = "Tie Game";
				showWinner();
			}
		console.log(winning);
	};
	// Add appropiate class for the winning screen based on who won, or if it was a tie.
	var showWinner = function() {
		if (winner === "player1") {
			$("#finish").removeClass("screen-win-two");
			$("#finish").removeClass("screen-win-tie");
			$(".message").html("<em>" + name + " <br> Wins! </em>");
			$("#finish").addClass("screen-win-one");
			$("#finish").show();
			$("#board").hide();
		} else if (winner === "player2") {
			$("#finish").removeClass("screen-win-one");
			$("#finish").removeClass("screen-win-tie");
			$(".message").html("Computer wins! ;)");
			$("#finish").addClass("screen-win-two");
			$("#finish").show();
			$("#board").hide();
		} else if (winner === "Tie Game") {
			$("#finish").removeClass("screen-win-one");
			$("#finish").removeClass("screen-win-two");
			$(".message").html("It's a Tie!");
			$("#finish").addClass("screen-win-tie");
			$("#finish").show();
			$("#board").hide();
		}
	};
}());

/////////////////// METHODS USED and PATTERNS ///////////////////

// all are using in diferent situation, ex: in a if conditions, each loop that are wrapped in a function and so on
// .each(function () {}

// Object:
// var startEnd = {
// 	start: "<div class='screen screen-start' id='start'>" + 
// 		   "<header><h1>Tic Tac Toe</h1>" + 
// 		   "<a href='#' class='button'>Play Game</a><br>" + 
// 		   "</header></div>",
// 	end: "<div class='screen screen-win' id='finish'>" + 
// 		 "<header><h1>Tic Tac Toe</h1>" + 
// 		 "<p class='message'></p>" + 
// 		 "<a href='#' class='button'>New game</a>" + 
// 		 "</header></div>"
// };
// .append(startEnd.start);

// .hide();
// .show();

// this.style.backgroundImage = "none";
// this.setAttribute("style", "backgroundImage: none");
// this.style.cssText = "backgroundImage: none";

// .removeClass
// .addClass
// .hasClass
// .html("Player 1 wins!");
// if ( $(playerOne).hasClass("active")) {}
// if ( $(this).hasClass("box-filled-1") === false && $(this).hasClass("box-filled-2") === false ) {}
// if (winner === "player1") {}

// Math.floor(Math.random() * 2);
// .eq(random % li.length).addClass("active");

// .mouseenter(function(){}
// .mouseleave(function(){}

// .off('mouseenter mouseleave');

// Call functions inside other functions logic:
// startGame();
// checkWin();
// nextTurn();
// showWinner();

// console.log("No more turns!");

// winning.push("player1");
// winner = winning[3]; Assignment
// else if (winning[2] !== "empty" && winning[2] === winning[4] && winning[4] === winning[6]) {
