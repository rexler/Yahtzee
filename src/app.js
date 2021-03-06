(function() {

    "use strict";

    var engine = require('./engine');
    var assets = require('./assets');
    var util = require('./utility');
    var $ = require('jquery');

    //Init the dice
    for (var x = 1; x <=5; x++) {
        assets.appendSVG(document.getElementById('mainCanvas'),
            'dice-' + x, '50', '50');
    }
    document.querySelectorAll('#mainCanvas img').forEach(function(elem) {
        elem.onclick = function(evt) {
            console.log(evt.target.y);

            var direction = evt.target.y <= 80 ? '+' : '-';
            $(evt.target).animate({
                top: direction + "=250"
            }, 1000);

        };
    });

    var submitScoreEvent = function(evt) {
        var i = util.indexInParent(evt.target.parentNode); //the hand
        var p = util.indexInParent(evt.target); //2nd or 3rd column (player 1 or 2)
        console.log('player: ' + p + 'index: ' + i);
        engine.submitScore(p-1, i, 4);
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