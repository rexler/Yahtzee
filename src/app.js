(function() {

    "use strict";

    var engine = require('./engine');

    console.log("Dice: " + engine.playRound([]));

    engine.hands.forEach(function(hand, index) {
        console.log(hand + ": " + engine.scores[index]);
    });


})();