'use strict'
	class JSML {

		constructor(stdIn) {
			this.output = '';
			this.parse(stdIn);
			return this.output;
		}

		generateAttributeKeyValueString(key, value) {
			return `${key}='${value}'`;
		}

		camelCaseToDashes(str) {
			return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		}

		generateDom(vNode) {
			var self = this,
				selfClosingTagNames = ['area','base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'],
				elmStart = `<${vNode.elm}`,
				elmAttrs = '',
			    elmEnd,
			    elmContent;

			selfClosingTagNames.forEach(function(selfClosingTagName) {
				if (vNode.elm === selfClosingTagName) elmEnd === '';
				else elmEnd = `</${vNode.elm}>`;
			});

			function parseInput(vNode, key) {
				if (!vNode.hasOwnProperty(key)) return;
				var value = vNode[key],
					// custom types conditons depending on the key and value of the nodes contents
					isActualInnerValueChildContents = (key === 'inner' && typeof value === 'string'),
					isChildrenContentArr = (key === 'inner' && Array.isArray(value)),
					isSingleChildContent = (key === 'inner' && !isChildrenContentArr && (typeof value === 'object')),
					isAttributeKeyValuePair = (key !== 'elm' && key !== 'inner');
				if (isActualInnerValueChildContents) elmContent = value;
				else if (isAttributeKeyValuePair) elmAttrs += self.generateAttributeKeyValueString(self.camelCaseToDashes(key), value); // Otherwise its an attribute and value pair and should be added to the node string
				else if (isChildrenContentArr) {
					//Array of multiple child nodes
					elmContent = "";
					value.forEach(function(subValue) {
						elmContent += JSML.run(subValue).output;
					});
				} 
				else if (isSingleChildContent) elmContent = JSML.run(value).output;
			}

			for (var key in vNode) parseInput(vNode, key);
			elmStart += ` ${elmAttrs}>`; // Close off the html elements start tag now that all possible attributes have been written
			if (elmContent) this.output = elmStart + elmContent + elmEnd 
			else this.output = elmStart + elmEnd
		}

		parse(input) {
			var self = this;
			self.generateDom(input);
		}

	}
