
describe('Create Tests', function () {


    it('should create a span', function () {
        var $element = Create.element({tag:'span'});
        expect($element.outerHTML).toEqual('<span></span>');
    });


    it('should create a span with inner html', function () {
        var $element = Create.element({tag:'span', contents:'Some text'});
        expect($element.outerHTML).toEqual('<span>Some text</span>');
    });


    it('should create a div with an inner span and some text', function () {
        var arrayOfContent = [document.createElement('span'), 'Some text'];
        var $element = Create.element({tag:'div', contents: arrayOfContent});
        expect($element.outerHTML).toEqual('<div><span></span>Some text</div>');
    });


    it('should create a span with inner html and attributes', function () {
        var $element = Create.element({tag: 'span', contents: 'Some text', attributes: {class: 'xyz'}});
        expect($element.outerHTML).toEqual('<span class="xyz">Some text</span>');
    });


    it('should attach event listener', function () {
        var spy = {
            listener: function() {}
        };
        spyOn(spy, 'listener');
        var $element = Create.element({tag: 'button', events: {click: spy.listener}});
        $element.click();
        expect(spy.listener).toHaveBeenCalled();
    });


    it('should allow for nesting elements', function () {
        var $element = Create.element({
            tag: 'ul',
            attributes: {class: 'list'},
            contents: [
                Create.element({tag:'li', contents:'one'}),
                Create.element({tag:'li', contents:'two'})
            ]
        });

        expect($element.outerHTML).toEqual('<ul class="list"><li>one</li><li>two</li></ul>');
    });


    it('should allow for nested objects', function () {
        var $element = Create.element({
            tag: 'ul',
            attributes: {class: 'list'},
            contents: [
                {tag:'li', contents:'one'},
                {tag:'li', contents:'two'},
                {tag: 'li', contents:'three'}
            ]
        });

        expect($element.outerHTML).toEqual('<ul class="list"><li>one</li><li>two</li><li>three</li></ul>');
    });

});