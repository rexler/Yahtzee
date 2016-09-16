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

        /* TODO: Getting messy, need to refactor */
        engine.resetScores();

        var dice = engine.playRound([], document.getElementById('mainCanvas'));
        console.log('------->', dice);

        var scores = engine.getScores();
        var players = engine.getPlayers();
        var div = document.getElementsByClassName('scores')[0];
        div.innerHTML = '';
        var table = document.createElement('table');
        engine.hands.forEach(function(hand, index) {
            //console.log(hand + ": " + scores[index]);
            var row = document.createElement('tr');
            var td1 = document.createElement('td');
            td1.innerText = hand;
            row.appendChild(td1);
            players.forEach(function(player) {
                var td2 = document.createElement('td');
                if (player.scores[index] === -1) {
                    var anchor = document.createElement('a');
                    anchor.setAttribute('href', '#');
                    anchor.innerText = player.scores[index] === -1 ? scores[index] : player.scores[index];
                    anchor.onclick = submitScoreEvent;
                    td2.appendChild(anchor);
                }
                else {
                    td2.innerText = player.scores[index] === -1 ? scores[index] : player.scores[index];
                }
                td2.setAttribute('class', player.scores[index] === -1 ? 'green' : 'red');
                row.appendChild(td2);
            });

            table.appendChild(row);
        });
        div.appendChild(table);
    };

})();