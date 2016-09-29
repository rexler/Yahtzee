(function() {

    "use strict";

    var engine = require('./engine');
    var assets = require('./assets');

    var submitScoreEvent = function(evt) {
        console.log(evt);
    };

    document.getElementById('btnStartGame').onclick = function(evt) {
        /* TODO: Bug with start game not resetting scores properly */
        engine.startGame(2);

        document.getElementById('btnRollDice').disabled = false;
    };

    document.getElementById('btnRollDice').onclick = function(evt) {

        engine.resetScores();

        var dice = engine.playRound([], document.getElementById('mainCanvas'));
        console.log('------->', dice);

        var scores = [];
        var generatedScores = engine.getScores();
        var players = engine.getPlayers();

        engine.hands.forEach(function(hand, index) {
            var scoresRow = {
                hand: hand,
                players: []
            };
            players.forEach(function(player) {
                var playerRow = {
                    score: 0,
                    submitted: false
                };
                playerRow.score = player.scores[index] === -1 ? generatedScores[index] : player.scores[index];
                playerRow.submitted = player.scores[index] !== -1;
                scoresRow.players.push(playerRow);
            });
            scores.push(scoresRow);
        });

        assets.drawScores(document.getElementsByClassName('scores')[0], scores, submitScoreEvent);
    };

})();