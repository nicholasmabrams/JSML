'use strict';
var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol ? 'symbol' : typeof obj;
};
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
var JSML = function () {
    function JSML(stdIn) {
        _classCallCheck(this, JSML);
        this.output = '';
        this.parse(stdIn);
        return this.output;
    }
    JSML.prototype.generateAttributeKeyValueString = function generateAttributeKeyValueString(key, value) {
        return key + '=\'' + value + '\'';
    };
    JSML.prototype.camelCaseToDashes = function camelCaseToDashes(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    };
    JSML.prototype.generateDom = function generateDom(vNode) {
        var self = this, selfClosingTagNames = [
                'area',
                'base',
                'br',
                'col',
                'command',
                'embed',
                'hr',
                'img',
                'input',
                'keygen',
                'link',
                'meta',
                'param',
                'source',
                'track',
                'wbr'
            ], elmStart = '<' + vNode.elm, elmAttrs = '', elmEnd, elmContent;
        selfClosingTagNames.forEach(function (selfClosingTagName) {
            if (vNode.elm === selfClosingTagName)
                elmEnd === '';
            else
                elmEnd = '</' + vNode.elm + '>';
        });
        function parseInput(vNode, key) {
            if (!vNode.hasOwnProperty(key))
                return;
            var value = vNode[key], isActualInnerValueChildContents = key === 'inner' && typeof value === 'string', isChildrenContentArr = key === 'inner' && Array.isArray(value), isSingleChildContent = key === 'inner' && !isChildrenContentArr && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object', isAttributeKeyValuePair = key !== 'elm' && key !== 'inner';
            if (isActualInnerValueChildContents)
                elmContent = value;
            else if (isAttributeKeyValuePair)
                elmAttrs += self.generateAttributeKeyValueString(self.camelCaseToDashes(key), value);
            else if (isChildrenContentArr) {
                elmContent = '';
                value.forEach(function (subValue) {
                    elmContent += JSML.run(subValue).output;
                });
            } else if (isSingleChildContent)
                elmContent = JSML.run(value).output;
        }
        for (var key in vNode) parseInput(vNode, key);
        elmStart += ' ' + elmAttrs + '>';
        if (elmContent)
            this.output = elmStart + elmContent + elmEnd;
        else
            this.output = elmStart + elmEnd;
    };
    JSML.prototype.parse = function parse(input) {
        var self = this;
        self.generateDom(input);
    };
    return JSML;
}();
JSML.run = function (appCode, target) {
    var defaultTarget = 'body', dom = new JSML(appCode);
    document.getElementsByTagName(target || defaultTarget)[0].innerHTML = dom.output;
    return dom;
};
