describe('Create Tests', function () {

    it('creates a span', function () {
        var $element = Create.element({tag: 'span'});
        expect($element.outerHTML).toEqual('<span></span>');
    });


    it('creates a span with inner html', function () {
        var $element = Create.element({tag: 'span', contents: 'Some text'});
        expect($element.outerHTML).toEqual('<span>Some text</span>');
    });


    it('creates a div with an inner span and some text', function () {
        var arrayOfContent = [document.createElement('span'), 'Some text'];
        var $element = Create.element({tag: 'div', contents: arrayOfContent});
        expect($element.outerHTML).toEqual('<div><span></span>Some text</div>');
    });


    it('creates a span with inner html and attributes', function () {
        var $element = Create.element({tag: 'span', contents: 'Some text', attributes: {class: 'xyz'}});
        expect($element.outerHTML).toEqual('<span class="xyz">Some text</span>');
    });


    it('attachs an event callback', function () {
        var spy = {
            callback: function () {
            }
        };
        spyOn(spy, 'callback');
        var $element = Create.element({tag: 'button', events: {click: spy.callback}});
        $element.click();
        expect(spy.callback).toHaveBeenCalled();
    });


    it('allows for nesting elements', function () {
        var $element = Create.element({
            tag: 'ul',
            attributes: {class: 'list'},
            contents: [
                Create.element({tag: 'li', contents: 'one'}),
                Create.element({tag: 'li', contents: 'two'})
            ]
        });

        expect($element.outerHTML).toEqual('<ul class="list"><li>one</li><li>two</li></ul>');
    });


    it('allows for nesting objects', function () {
        var $element = Create.element({
            tag: 'ul',
            attributes: {class: 'list'},
            contents: [
                {tag: 'li', contents: 'one'},
                {tag: 'li', contents: 'two'},
                {tag: 'li', contents: 'three'}
            ]
        });
        expect($element.outerHTML).toEqual('<ul class="list"><li>one</li><li>two</li><li>three</li></ul>');
    });


    it('binds "this" to the element in the event callback', function () {
        var spy = {
            callback: function (a, b) {
                expect(this).toEqual($element);
            }
        };
        spyOn(spy, 'callback').andCallThrough();
        var $element = Create.element({tag: 'button', events: {click: spy.callback}});
        $element.click();
        expect(spy.callback).toHaveBeenCalled();
        expect(spy.callback).toHaveBeenCalledWith(jasmine.any(MouseEvent));
    });


    it('callback receives a MouseEvent when the element is clicked', function () {
        var spy = {
            callback: function () {
            }
        };
        spyOn(spy, 'callback');
        var $element = Create.element({tag: 'button', events: {click: spy.callback}});
        $element.click();
        expect(spy.callback).toHaveBeenCalledWith(jasmine.any(MouseEvent));
    });


});