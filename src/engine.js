"use strict";

var _ = require('lodash');

var assets = require('./assets');

var gameNumberOfDice = 5;

var SUM = 6, BONUS = 7, THREEKIND = 8, FOURKIND = 9, FULLHOUSE = 10, SMALLST = 11,
    LARGEST = 12, CHANCE = 13, YAHTZEE = 14, TOTAL = 15;

var BONUSTHRESHOLD = 63;
var BONUSSCORE = 35, FULLHOUSESCORE = 25, SMALLSTSCORE = 30, LARGESTSCORE = 40, YAHTZEESCORE = 50;


var hands = [
    "Ones",
    "Twos",
    "Threes",
    "Fours",
    "Fives",
    "Sixes",
    "Sum",
    "Bonus",
    "Three of a kind",
    "Four of a kind",
    "Full house",
    "Small Straight",
    "Large Straight",
    "Chance",
    "Yahtzee",
    "Total"
];

var players = [];

var scores = [2, 62, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, 50, 0];

var currentPlayer = 0;

var getRandomInt = function(max) {
    return Math.ceil(Math.random() * max);
};

var rollDie = function() {
    return getRandomInt(6);
};

var resetScores = function() {
    scores = scores.map(function() {
        return 0;
    })
};

var getScores = function() {
    return scores;
};

var getPlayers = function() {
    return players;
};

var submitScore = function(playerIndex, scoreType, score) {
    players[playerIndex].scores[scoreType] = score;
};

var drawDice = function(dice, baseElement) {
    baseElement.innerHTML = '';
    dice.forEach(function(dieItem) {
        assets.appendSVG(baseElement, 'dice-' + dieItem, '50', '50');
    });
};

var playRound = function(keptDice, baseElement) {

    var dice = [];
    var numberOfDice = gameNumberOfDice - keptDice.length;

    dice = dice.concat(keptDice);

    for (var x = 0; x < numberOfDice; x++) {
        dice.push(rollDie());
    }

    calculateSingles(dice);

    calculateThreeFourAndYahtzee(dice);

    calculateStraights(dice);

    calculateFullHouse(dice);

    calculateBonusAndTotal();

    drawDice(dice, baseElement);

    return dice;
};

var startGame = function(numberOfPlayers) {
    players = [];
    for (var x = 0; x < numberOfPlayers; x++) {
        players.push({
            name: 'Player' + (x+1),
            scores: _.clone(scores)
        });
    }
};

/* Scoring section */

var calculateSingles = function(dice) {
    for (var single = 1; single <= 6; single++) {
        var score = 0;
        dice.forEach(function(dieItem) {
            score += dieItem == single ? single : 0;
        });
        scores[single-1] = score;
    }
};

var calculateThreeFourAndYahtzee = function(dice) {
    var sum = dice.reduce(function(a,b) {
        return a+b;
    });

    for (var single = 1; single <= 6; single++) {
        var kind = 0;
        dice.forEach(function(dieItem) {
            kind += dieItem == single ? 1 : 0;
        });
        //Intentional case fallthrough:
        switch (kind) {
            case 5:
                scores[YAHTZEE] = YAHTZEESCORE;
            case 4:
                scores[FOURKIND] = sum;
            case 3:
                scores[THREEKIND] = sum;
                break;
        }

    }

    scores[CHANCE] = sum;
};

var calculateStraights = function(dice) {
    var diceCopy = _.clone(dice);
    diceCopy.sort();
    var consecutiveNumbers = 0;
    var prevItem = 0;
    var dieItem = 0;
    for (var dieIndex = 0; dieIndex < diceCopy.length; dieIndex++) {
        dieItem = diceCopy[dieIndex];
        if (prevItem !== 0) {
            if (dieItem - prevItem <= 1) {
                consecutiveNumbers += dieItem - prevItem;
            }
            else {
                break;
            }

        }
        prevItem = dieItem;
    }

    if (consecutiveNumbers >= 3) {
        scores[SMALLST] = SMALLSTSCORE;
    }
    if (consecutiveNumbers >= 4) {
        scores[LARGEST] = LARGESTSCORE;
    }
};

var calculateFullHouse = function(dice) {
    var diceCopy = _.clone(dice);
    var tally = 1;
    diceCopy.sort();
    var prevItem = 0;
    var dieItem = 0;
    for (var dieIndex = 0; dieIndex < diceCopy.length; dieIndex++) {
        dieItem = diceCopy[dieIndex];
        if (prevItem !== 0) {
            if (dieItem === prevItem) {
                tally++;
            }
            else {
                if (tally === 2) {
                    if (diceCopy[2] === diceCopy[3] && diceCopy[3] === diceCopy[4]) {
                        scores[FULLHOUSE] = FULLHOUSESCORE;
                    }
                }
                else if (tally === 3) {
                    if (diceCopy[3] === diceCopy[4]) {
                        scores[FULLHOUSE] = FULLHOUSESCORE;
                    }
                }
            }
        }
        prevItem = dieItem;
    }
};

var calculateBonusAndTotal = function() {
    /* TODO: Refactor so players array is immutable */
    players.forEach(function(player) {
        var tot = 0;
        for (var x = 1; x <= 6; x++) {
            tot += player.scores[x-1] !== -1 ? player.scores[x-1] : 0;
        }
        player.scores[SUM] = tot;
        player.scores[BONUS] = tot >= BONUSTHRESHOLD ? BONUSSCORE : 0;

        tot = 0;
        for (var i = SUM; i < player.scores.length-1; i++) {
            tot += player.scores[i] !== -1 ? player.scores[i] : 0;
        }
        player.scores[TOTAL] = tot;
    });
};

/* Revealing module pattern */
var engine = {
    rollDie: rollDie,
    playRound: playRound,
    resetScores: resetScores,
    getScores: getScores,
    getPlayers: getPlayers,
    hands: hands,
    startGame: startGame,
    players: players,
    submitScore: submitScore
};

module.exports = engine;

