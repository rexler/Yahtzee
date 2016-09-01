"use strict";

var appendSVG = function(baseElement, assetName, width, height) {
    var svg = document.createElement('img');
    svg.setAttribute('src', './src/images/'+ assetName + '.svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    baseElement.appendChild(svg);
};

var assets = {
    appendSVG: appendSVG
};

module.exports = assets;