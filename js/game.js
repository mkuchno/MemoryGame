
$(document).ready(function(){

	//each cards number
	var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

	//shuffle cards numbers
	var positions = randomCards(cards);

	var dir = "photos/";
	var type = ".png";

	var top = "photos/top.png";

	var element1 = "";
	var element2 = "";
	var id1 = "";
	var id2 = "";

	var clicks = 0;
	var unhide_cards = 0;

	//bool to move between two cards
	var clicked = false;

	//bool to check if two card is clicked
	var two_clicked = false;

	//game engine
	$("img").click(function(){

		//manually triggering the mouseout event to deactivate hover when an item is clicked
		$(this).mouseout();

		if(!clicked && two_clicked == false && $(this).attr("src") == top){

			//the number of the clicked card
			id1 = $(this).attr("id");

			//check what card is under this number
			element1 = positions[id1.substr(1) - 1];

			//show this first card
			$(this).attr("src", dir + element1 + type);

			clicked = true;
			clicks++;

		}else if(two_clicked == false && $(this).attr("src") == top){

			//the number of the clicked card
			id2 = $(this).attr("id");

			//check what card is under this number
			element2 = positions[id2.substr(1) - 1];

			//show this second card
			$(this).attr("src", dir + element2 + type);

			clicked = false;
			two_clicked = true;
			clicks++;

			//check if these two cards are the same and hide or leave them
			if(element1 != element2){

				id1 = "#" + id1;
				id2 = "#" + id2;

				//wait before hide cards
				setTimeout(function() {

					$(id1).attr("src", top);
					$(id2).attr("src", top);
					two_clicked = false;

				}, 500)

			}else{

				two_clicked = false;
				unhide_cards += 2;
			}

		}

		//show actual number of clicks
		$("#score").text(clicks);

		//condition if all cards are unhide
		if(unhide_cards == 28){

			alert("You Win!");

			//shuffle cards number for next game
			positions = randomCards(cards);

			setTimeout(function() {

				//change best score if new score is better
				if($("#best-score").text() > clicks || $("#best-score").text() == 0){

					$("#best-score").text(clicks);
				}

				//clean the actual score and hide all cards
				$("#score").text(0);
				$("img").attr("src",top);

				//reset variables
				clicks = 0;
				unhide_cards = 0;

			}, 1000)

		}

	});
	
	//new-game button click listener
	$("#new-game").click(function() {

		//clean the actual score and hide all cards
		$("#score").text(0);
		$("img").attr("src",top);

		//reset all variables and
		//shuffle cards number for next game
		clicks = 0;
		unhide_cards = 0;

		clicked = false;
		two_clicked = false;

		positions = randomCards(cards);

	});

	//hover function for hidden cards
	$("img").hover(function(){

		//condition to check if card is hidden
	  	if($(this).attr("src") == top){

	  		$(this).closest("td").css("background-color", "#446c9c");
	  	}

	}, function(){

	  	$(this).closest("td").css("background-color", "white");

	});

});

//shuffle cards numbers
//returns shuffled card numbers as an array
function randomCards(cards) {

	//Create an array of 28 elements, each card number twice
	var positions = cards.concat(cards);

	var random;
	var tmp;

	//replace each element of the array with another randomly selected element of this array
	for(var i = 0; i < 28; i++){

		//random integer from 0 to 27
		random = Math.floor(Math.random() * 28);

		//replace elements
		tmp = positions[i];
		positions[i] = positions[random];
		positions[random] = tmp;
	}

	return positions;
}