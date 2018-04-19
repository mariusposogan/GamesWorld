window.addEventListener("load", function(){
    var container = document.getElementById('game-details');
    var game = new Game();
    var gameId = getUrlParameter("gameId");
    game.id = gameId;
    game.getGameInfo().then(displayGame);

    function displayGame(gameInfo) {
        var titleEl = document.createElement('h1');
        titleEl.innerHTML = gameInfo.title;
        container.appendChild(titleEl);
        
        var detailsEl = document.createElement('p');
        detailsEl.innerHTML = gameInfo.description;
        container.appendChild(detailsEl);
        
        var imageEl = document.createElement('img');
        imageEl.setAttribute("src", gameInfo.imageUrl);
        container.appendChild(imageEl);
        
        var editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
		editButton.style.color = "#ddd";
		editButton.style.backgroundColor = "008080";
        container.appendChild(editButton); 
        editButton.addEventListener("click", function() {
            editGame(game.id, titleEl);
            console.log(game.id, titleEl);
            console.log(event);
        });
    }
    
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    function editGame(gameId, titleEl) {
        console.log(gameId, titleEl);
        $.ajax({
            url: "https://games-world.herokuapp.com/games/" + gameId,
            method: "PUT",
            data: {
                title: "new title"
            },
            success: function(response){
                console.log(response);
                titleEl.innerHTML = response.title;
            }
        });
    }
});
