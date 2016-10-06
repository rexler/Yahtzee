"use strict";

var appendSVG = function(baseElement, assetName, width, height) {
    var svg = document.createElement('img');
    svg.setAttribute('src', './src/images/'+ assetName + '.svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    baseElement.appendChild(svg);
};

var drawScores = function(baseElement, scoreList, submitCallback) {
    var div = baseElement;
    div.innerHTML = '';
    var table = document.createElement('table');
    var rowHeader = document.createElement('tr');
    var tdh = document.createElement('th');
    tdh.innerText = 'Hand';
    rowHeader.appendChild(tdh);
    tdh = document.createElement('th');
    tdh.innerText = 'Player 1';
    rowHeader.appendChild(tdh);
    tdh = document.createElement('th');
    tdh.innerText = 'Player 2';
    rowHeader.appendChild(tdh);
    table.appendChild(rowHeader);
    scoreList.forEach(function(scoreItem) {
        var row = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.innerText = scoreItem.hand;
        row.appendChild(td1);

        scoreItem.players.forEach(function(player) {
            var td2 = document.createElement('td');
            td2.innerText = player.score;
            if (!player.submitted) {
                // -1 means score not submitted yet
                td2.onclick = submitCallback;
            }
            td2.setAttribute('class', player.submitted ? 'red' : 'green');
            row.appendChild(td2);
        });

        table.appendChild(row);

    });

    div.appendChild(table);
};

var assets = {
    appendSVG: appendSVG,
    drawScores: drawScores
};

module.exports = assets;