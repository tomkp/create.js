# create.js

  A shortcut for document.createElement in only 739 bytes.

  [![Build Status](https://travis-ci.org/tomkp/create.js.png)](https://travis-ci.org/tomkp/create.js)


## examples:


```

var span = Create.element({tag: 'span', contents: 'Some text', attributes: {id: 'abc', class: 'xyz'}, events: {click: function() {} }});

// is just a shortcut for:

var element = document.createElement('span');
element.appendChild(document.createTextNode('Some text'));
element.setAttribute('id', 'abc');
element.setAttribute('class', 'xyz');
element.addEventListener('click', function() {});

```



