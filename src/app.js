(function() {

    "use strict";

    var engine = require('./engine');
    var assets = require('./assets');

    document.getElementById('btnRollDice').onclick = function(evt) {
        engine.resetScores();

        var dice = engine.playRound([], document.getElementById('mainCanvas'));
        console.log('------->', dice);

        var scores = engine.getScores();
        engine.hands.forEach(function(hand, index) {
            console.log(hand + ": " + scores[index]);
        });
    };

})();