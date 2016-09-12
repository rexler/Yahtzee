(function() {

    "use strict";

    var engine = require('./engine');
    var assets = require('./assets');

    document.getElementById('btnRollDice').onclick = function(evt) {
        engine.resetScores();

        var dice = engine.playRound([], document.getElementById('mainCanvas'));
        console.log('------->', dice);


        var scores = engine.getScores();
        var div = document.getElementsByClassName('scores')[0];
        div.innerHTML = '';
        var table = document.createElement('table');
        engine.hands.forEach(function(hand, index) {
            console.log(hand + ": " + scores[index]);
            var row = document.createElement('tr');
            var td1 = document.createElement('td');
            td1.innerText = hand;
            var td2 = document.createElement('td');
            td2.innerText = scores[index];
            row.appendChild(td1);
            row.appendChild(td2);
            table.appendChild(row);
        });
        div.appendChild(table);
    };

})();