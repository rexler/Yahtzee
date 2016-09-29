
/* Function to determine the index number of an element within its parent
   Useful for html lists and tables.
 */
var indexInParent = function (node) {
    var children = node.parentNode.childNodes;
    var num = 0;
    for (var i=0; i<children.length; i++) {
        if (children[i]==node) return num;
        if (children[i].nodeType==1) num++;
    }
    return -1;
};

var utility = {
    indexInParent: indexInParent
};

module.exports = utility;



