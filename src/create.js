

// ##Create
//
// An alternative to document.createElement
//
// ### Example:
//
//      var span = Create.element({
//                      tag: 'span',
//                      contents: 'Some text',
//                      attributes: {id: 'abc', class: 'xyz'},
//                      events: {click: function() {} }
//                 });
//
// is just a shortcut for:
//
//      var element = document.createElement('span');
//      element.appendChild(document.createTextNode('Some text'));
//      element.setAttribute('id', 'abc');
//      element.setAttribute('class', 'xyz');
//      element.addEventListener('click', function() {});
//
//
var Create = (function () {

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
                if (item.hasOwnProperty('tagName')) {
                    // Assume that `item` is an element
                    $element.appendChild(item);
                }
                else if (typeof item == 'string') {
                    // Create a text node for any strings
                    $element.appendChild(document.createTextNode(item));
                } else {
                    // Assume it's an object representing more elements
                    // Recursively append children
                    $element.appendChild(element(item));
                }
            }
        }
    };


    // Create an element with name `tag` (eg: span, li, img).
    // With `contents` [optional]: mixed element(s) or string(s).
    // And `attributes` [optional]: any attributes, (eg: id, class, name, title).
    // And `events` [optional]: any event listeners, (eg: click, mouseover).
    var element = function(options) {
        // Create the element
        var tag = options['tag'];
        var $element = document.createElement(tag);
        // Insert an array of html, elements into the element
        insertContents($element, options['contents']);
        // Add event listeners to the element
        augment($element, options['events'], $element.addEventListener);
        // Set attributes on the element (eg: id, class, title)
        augment($element, options['attributes'], $element.setAttribute);
        return $element;
    };

    return {
        element: element
    };

})();


