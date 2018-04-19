function Games() {
}

Games.prototype.getAll = function() {
    return $.get('https://games-world.herokuapp.com/games');
}
