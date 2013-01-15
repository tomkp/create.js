# Create

  Shortcut for document.createElement

## Examples:


```

var span = Create.element({tag: 'span', contents: 'Some text', attributes: {id: 'abc', class: 'xyz'}, events: {click: function() {} }});

// is just a shortcut for:

var element = document.createElement('span');
element.appendChild(document.createTextNode('Some text'));
element.setAttribute('id', 'abc');
element.setAttribute('class', 'xyz');
element.addEventListener('click', function() {});

```



