window.addEventListener("load", function(){
	var containerEl = document.getElementById("games-list");
	var gameModels = new Games();
	gameModels.getAll().then(displayAllGames);
	
	var createButton = document.getElementById("create");
	createButton.addEventListener("click", function() {
		$.ajax({
			url: "https://games-world.herokuapp.com/games",
			method: 'POST',
			payload: {
				title: "Call of Duty®: WWII Returned",
				releaseDate: 1333929600,
				genre: "First Person Shooter",
				publisher: "Activision",
				imageUrl: "https://psmedia.playstation.com/is/image/psmedia/call-of-duty-wwii-two-column-01-ps4-eu-19apr17?$TwoColumn_Image$"
			},
			success: function(response) {
				var liEl = document.createElement('li');
	
				var titleEl = document.createElement('a');
				titleEl.innerHTML = response.title;
				titleEl.style.fontSize = "20px";
				titleEl.style.fontWeight = "bold";
				titleEl.style.color = "#8C70D6";
				titleEl.style.textDecoration = "underline";
				liEl.appendChild(titleEl);
				
				var detailsEl = document.createElement('p');
				detailsEl.innerHTML = response.genre;
				detailsEl.style.color = "#444";
				liEl.appendChild(detailsEl);
				
				var image = document.createElement('img');
				image.setAttribute("src", response.imageUrl);
				liEl.appendChild(image);
				
				var deleteButton = document.createElement("button");
				deleteButton.innerText = "Delete";
				deleteButton.style.color = "#ddd";
				deleteButton.style.backgroundColor = "D21442";
				liEl.appendChild(deleteButton);
				deleteButton.addEventListener("click", function(event) {
					deleteGame(event, game.id);
					containerEl.removeChild(liEl);
				});
				
				liEl.appendChild(document.createElement('hr'));
				
				containerEl.appendChild(liEl);
			}
			
		});
	});

	function displayAllGames(gamesData) {
		for(var i=0; i<gamesData.length; i++) {
			var game = new Game();
			game.id = gamesData[i]["_id"];
			game.title = gamesData[i].title;
			game.details = gamesData[i]["description"];
			game.imageUrl = gamesData[i].imageUrl;
			console.log(game.id, game.imageUrl);
			displayGame(game);
		}
	}
	
	function displayGame(game){
		var liEl = document.createElement('li');
	
		var titleEl = document.createElement('a');
		titleEl.innerHTML = game.title;
		titleEl.style.fontSize = "20px";
		titleEl.style.fontWeight = "bold";
		titleEl.style.color = "#8C70D6";
		titleEl.style.textDecoration = "underline";
		titleEl.setAttribute("href","https://primulmeuproiect-mcposogan.c9users.io/Tema/pages/game.html?gameId=" + game.id);
		liEl.appendChild(titleEl);
		
		var detailsEl = document.createElement('p');
		detailsEl.innerHTML = game.details;
		detailsEl.style.color = "#444";
		liEl.appendChild(detailsEl);
		
		var image = document.createElement('img');
		image.setAttribute("src", game.imageUrl);
		liEl.appendChild(image);
		
		var deleteButton = document.createElement("button");
		deleteButton.innerText = "Delete";
		deleteButton.style.color = "#ddd";
		deleteButton.style.backgroundColor = "#D21442";
		liEl.appendChild(deleteButton);
		deleteButton.addEventListener("click", function(event) {
			deleteGame(event, game.id);
			containerEl.removeChild(liEl);
		});
		
		liEl.appendChild(document.createElement('hr'));
		
		containerEl.appendChild(liEl);
	}
	
	function deleteGame(event, gameId) {
		$.ajax({
			url: "https://games-world.herokuapp.com/games/" + gameId,
			method: 'DELETE',
			success: function(response) {
				console.log('response', response);
			}
		});
	}
	
			
});
