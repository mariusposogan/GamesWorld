function Game() {
    this.id = null;
    this.title = "";
    this.details = "";
    this.imageUrl = "";
}

Game.prototype.getGameInfo = function() {
    var that = this;
    return $.get('https://games-world.herokuapp.com/games/' + this.id, function(gameInfo) {
        that.id = gameInfo._id;
        that.title = gameInfo.title;
        that.details = gameInfo.description;
        that.userId = gameInfo.imageUrl;
        console.log(gameInfo.title);
        console.log(gameInfo.description);
        console.log(gameInfo.imageUrl);
        console.log(gameInfo._id);
    });
}
