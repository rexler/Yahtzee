"use strict";

var _ = require('lodash');

var gameNumberOfDice = 5;

var THREEKIND = 6, FOURKIND = 7, FULLHOUSE = 8, SMALLST = 9,
    LARGEST = 10, CHANCE = 11, YAHTZEE = 12;

var FULLHOUSESCORE = 25, SMALLSTSCORE = 30, LARGESTSCORE = 40, YAHTZEESCORE = 50;


var hands = [
    "Ones",
    "Twos",
    "Threes",
    "Fours",
    "Fives",
    "Sixes",
    "Three of a kind",
    "Four of a kind",
    "Full house",
    "Small Straight",
    "Large Straight",
    "Chance",
    "Yahtzee"
];

var scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var getRandomInt = function(max) {
    return Math.ceil(Math.random() * max);
};

var rollDie = function() {
    return getRandomInt(6);
};

var playRound = function(keptDice) {

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

    return dice;
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
    for (var single = 1; single <= 6; single++) {
        var score = 0;
        var kind = 0;
        dice.forEach(function(dieItem) {
            kind += dieItem == single ? 1 : 0;
            score += dieItem;
        });
        //Intentional case fallthrough:
        switch (kind) {
            case 5:
                scores[YAHTZEE] = YAHTZEESCORE;
            case 4:
                scores[FOURKIND] = score;
            case 3:
                scores[THREEKIND] = score;
                break;
            default:
                scores[CHANCE] = score;
        }

    }
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

var engine = {
    rollDie: rollDie,
    playRound: playRound,
    scores: scores,
    hands: hands
};

module.exports = engine;

