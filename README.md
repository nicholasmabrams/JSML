# JSML - Made with love by Nicholas Abrams!

JavaScript Markup Language - replacement for HTML. Render flexible apps completely in JavaScript, EASILY.
Best of all, there is basically 0 learning curve if you already know HTML and the VERY basics of JavaScript.

Description: All DOM nodes are made up of simple JavaScript objects. This language is a direct replacement for HTML and it is capable of rendering any DOM element, or set of DOM elements (nested or unested). The developer may use any set of standard or (custom) non-standard attributes (data attributes etc) as well. 

#On the client 

Target the body tag, pass the selector as the second parameter to `JSML.run(JSDOM, 'body')` and then have client render by including the script anywhere on the page.



#Or on the serverside
Using NodeJS to directly render the application on the serverside.

Here is what a button and a H1 element and its properties looks like, the variable name is not required but its best for this example and also for many other use cases (allows for modular seperation of components that is not possible out of the box with HTML).

#Simple usage:

    var exampleDataToShareAndBind = 'Hello JSML!';

    var mainTitle = {
      elm: 'h1',
     inner:  exampleDataToShareAndBind
    }

    var button = {
      elm: 'button',
      class: 'active',
      inner: 'Click me',
      dataButtonMsg:  exampleDataToShareAndBind, // this ends up as data-button-msg, with data bound from the main title value`
    }
    var form = {
       elm: 'form',
       method: 'POST',
       action: 'javascript:alert("'+exampleDataToShareAndBind+'");',
       method: '#',
       inner: [
              mainTitle,
              button,
              ]
    }
    // Generate your application`
    JSML.run(form, 'body');
    // Assign events after (no window.load or $(function(){}); needed, just bind after you execute the parser, "compiler")
    document.querySelectorAll('.'+button.class)[0].onclick = function(){ alert() };

Will result in the following markup being sent to the clients browser (the real output is compressed, indented here for your viewing pleasure):

    <form method="#" action='javascript:alert("Hello JSML!");'>
      <h1>Hello JSML!</h1>
      <button data-button-msg="Hello JSML!">Click me</button>
    </form>

Here is the live demo showcasing JSML using the syntax above: http://codepen.io/nicholasabrams/pen/VjBWdL?editors=0010

#With AngularJS

Where this JavaScript...
      
    // Define a VERY simple angular application for example...

    var button = {
       elm: 'button',
       ngIf: 'JSML.isAmazing === true',
       inner: '{{ buttonText }}'
    }

    var main = {
         elm: 'div',
         ngApp: 'JSMLExample',
         ngController: 'JSMLController',
         inner: [ { elm:'h1', inner: '{{ title }}'}, // Inline
                  button ] // By ref
      }
      
      // Generate application HTML
      JSML.run(main, 'body');
      
      var app = angular.module('JSMLExample', []);
      
      app.controller('JSMLController', function($scope){
         $scope.JSML = { isAmazing: true }
         $scope.title = 'JSML - The end of HTML!';
         $scope.buttonText = 'Works with AngularJS and all other frameworks : )';
      }); 

Produces this AngularJS application in the browser
 
      <div ng-app="JSMLExample" ng-controller="JSMLController" class="ng-scope">
        <h1 class="ng-binding">JSML - The end of HTML!</h1>
        <button ng-if="JSML.isAmazing === true" class="ng-binding ng-scope">Works with AngularJS and all other frameworks : )</button>
      </div>

Additionally, here is JSML working with AngularJS with no adjustment or hacks needed: http://codepen.io/nicholasabrams/pen/wWxqBp?editors=0010

#And here is where it all makes real sense to use JSML:
#Dynamic Content Generation

Here is JSML using the power of native JavaScript to dynamically generate the DOM for an example navigation menu
      
      var navi = {
         elm: 'nav',
         inner: []
      }
      var x = [1, 'a', 3]; 
      x.forEach(function(dummyData){
         navi.inner.push({elm: 'a', inner: dummyData.toString(), href: '#', onclick: 'javascript:alert();'});   
      });
      
      
      // Generate application HTML on the client side writing to the body elm
      JSML.run(navi, 'body');

Produces

      <nav>
        <a href="#" onclick="javascript:alert();">1</a>
        <a href="#" onclick="javascript:alert();">a</a>
        <a href="#" onclick="javascript:alert();">3</a>
      </nav>

Demo: http://codepen.io/nicholasabrams/pen/oLrZjx?editors=0010

#Just imagine, the possibilities are ENDLESS!

This generator may be used to data bind using no framework, and can render the document on the server side (using NodeJS or other serverside JavaScript technology) or on the clientside (in the browser of the users device). It is very lightweight (ONLY 3KB!), and is very efficient, extendable, and works with any existing frameworks (AngularJS, Ionic, Ember, React, Etc). JSML offers no opinion on your development choices, just a way to make web applications development a more consistant, flexible, dynamic experience.

#ENJOY!
