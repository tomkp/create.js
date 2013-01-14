

// Create
//--------
// An alternative to document.createElement
//
// Example:
//
//      var span = Create.element('span', 'Some text', {id: 'abc', class: 'xyz'}, {click: function() {} });
//
Create = (function () {

    // Augment an element with event listeners, attributes etc...
    var augment = function ($element, map, fn) {
        if (map) {
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    fn.call($element, key, map[key]);
                }
            }
        }
    };


    // Insert an item or array of items into the element
    var insertContents = function($element, contents) {
        if (contents) {
            var array = [].concat(contents);
            for (var i = 0, len = array.length; i < len; i++) {
                var item = array[i];
                if (typeof item == 'string') {
                    // Because we want to append an element we have to create a text node for a simple String
                    $element.appendChild(document.createTextNode(item));
                } else {
                    $element.appendChild(item);
                }
            }
        }
    };


    var element = function (tag, contents, attributes, events) {
        // Create the element
        var $element = document.createElement(tag);
        // Insert an array of html, elements into the element
        insertContents($element, contents);
        // Add event listeners to it
        augment($element, events, $element.addEventListener);
        // Set attributes on the element (eg: id, class, title
        augment($element, attributes, $element.setAttribute);
        return $element;
    };

    return {
        element: element
    };

})();


