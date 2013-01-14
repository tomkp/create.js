

// Create
//--------
// An alternative to document.createElement
//
// Example:
//
//      var span = Create.element('span', 'Some text',
//                      {id: 'abc', class: 'xyz'},
//                      {click: function() {} }
//                  );
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
                // We always want to append elements - so that we don't
                // lose any behaviours (event listeners etc)
                if (typeof item == 'string') {
                    // Create a text node for any strings
                    $element.appendChild(document.createTextNode(item));
                } else {
                    // Assume that `item` is an element
                    $element.appendChild(item);
                }
            }
        }
    };

    // Create an element with name `tag` (eg: span, li, img).
    // With `contents` [optional]: mixed element(s) or string(s).
    // And `attributes` [optional]: any attributes, (eg: id, class, name, title).
    // And `events` [optional]: any event listeners, (eg: click, mouseover).
    var element = function (tag, contents, attributes, events) {
        // Create the element
        var $element = document.createElement(tag);
        // Insert an array of html, elements into the element
        insertContents($element, contents);
        // Add event listeners to it
        augment($element, events, $element.addEventListener);
        // Set attributes on the element (eg: id, class, title)
        augment($element, attributes, $element.setAttribute);
        return $element;
    };

    return {
        element: element
    };

})();


