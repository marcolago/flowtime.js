/*!
 * Brav1Toolbox.js - common utility scripts and polyfills
 * http://marcolago.com/
 * MIT licensed
 *
 * Copyright (C) 2012-now Marco Lago, http://marcolago.com
 */
var Brav1Toolbox = (function()
{
  var cssPrefixes = ["", "-webkit-", "-moz-", "-ms-", "-o-"];

  /**
   * returns the Style Collection Object
   */
  function _getStyleObject() {
    if (window.getComputedStyle) {
      return window.getComputedStyle(document.body);
    } else {
      return document.documentElement.style;
    }
  }
  // cache a Style Collection Object for future use
  var styleObject = _getStyleObject();

  /**
   * shortcut to add a listener for modern browsers and IE8-
   */
  function _addListener(element, type, handler, useCapture) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, useCapture);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    }
  }

  function _removeListener(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    }
  }

  /**
   * checks if a CSS property is supported
   * including the prefixed ones
   */
  function _testCSS(prop) {
    return _getPrefixed(prop) != "";
  }

  /**
   * returns the standard or the prefixed CSS property
   * use: element[Brav1Toolbox.getPrefixed(CSSProperty)];
   */
  function _getPrefixed(prop) {
    var o = styleObject || _getStyleObject();
    for (var i = 0; i < cssPrefixes.length; i++)
    {
      var pre = cssPrefixes[i].replace(/-/g, "");
      var p = prop;
      if (pre.length > 0)
      {
        p = p.charAt(0).toUpperCase() + p.substr(1);
      }
      p = pre + p;
      if (p in o == true)
      {
        return p;
      }
    }
    return "";
  }

  /**
   * returns the CSS value
   * use: Brav1Toolbox.getPrefixed(element, CSSProperty);
   */
  function _getCSSValue(element, prop) {
    var p = _getPrefixed(prop);
    if (window.getComputedStyle) {
      return window.getComputedStyle(element)[p];
    } else {
      return element.style[p];
    }
  }

  /**
   * returns the type of the object passed
   */
  function _typeOf(obj) {
    return !!obj && Object.prototype.toString.call(obj).match(/(\w+)\]/)[1];
  }

  /**
   * classList API polyfill
   */

  /**
   * adds the specified class to the specified element
   */
  function _addClass(el, c) {
    if (el.classList) {
      el.classList.add(c);
    } else {
      if (_hasClass(el, c) == false) {
        var cl = el.className;
        if (cl.length > 0) {
          cl += " ";
        }
        el.className = cl + c;
      }
    }
  }

  /**
   * removes the specified class from the specified element
   */
  function _removeClass(el, c) {
    if (el.classList)
    {
      el.classList.remove(c);
    }
    else
    {
      var cl = el.className;
      if (cl.indexOf(c) != -1)
      {
        if (cl.indexOf(" " + c) != -1)
        {
          cl = cl.replace(" " + c, "");
        }
        else if (cl.indexOf(c + " ") != -1)
        {
          cl = cl.replace(c + " ", "");
        }
        else
        {
          cl = cl.replace(c, "");
        }
      }
      el.className = cl;
    }
  }

  /**
   * checks if the specified class is assigned to the specified element
   */
  function _hasClass(el, c) {
    if (el)
    {
      if (el.classList)
      {
        return el.classList.contains(c);
      }
      else if (el.className)
      {
        return el.className.indexOf(c) != -1;
      }
    }
    return false;
  }

  /**
   * creates and dispatch a custom event
   */
  function _dispatchEvent(t, ps) {
    if (document.createEvent)
    {
      var e = document.createEvent("HTMLEvents");
      e.initEvent(t, true, true);
      for (var p in ps)
      {
        e[p] = ps[p];
      }
      document.dispatchEvent(e);
    }
  }

  /**
   * returns the absolute distance from two points
   */
  function _distance(pA, pB) {
    var cX;
    var cY;
    cX = pB.x - pA.x;
    cX *= cX;
    cY = pB.y - pA.y;
    cY *= cY;

    return Math.abs(Math.sqrt( cX + cY ));
   }

  return {
    addListener: _addListener,
    removeListener: _removeListener,
    dispatchEvent: _dispatchEvent,
    testCSS: _testCSS,
    getPrefixed: _getPrefixed,
    getCSSValue: _getCSSValue,
    typeOf: _typeOf,
    addClass: _addClass,
    removeClass: _removeClass,
    hasClass: _hasClass,
    distance: _distance
  }
})();


// https://developer.mozilla.org/en-US/docs/Web/Events/wheel
// creates a global "addWheelListener" method
// example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
(function(window,document) {

    var prefix = "", _addEventListener, onwheel, support;

    // detect event model
    if ( window.addEventListener ) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }

    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
              "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    window.addWheelListener = function( elem, callback, useCapture ) {
        _addWheelListener( elem, support, callback, useCapture );

        // handle MozMousePixelScroll in older Firefox
        if( support == "DOMMouseScroll" ) {
            _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
        }
    };

    function _addWheelListener( elem, eventName, callback, useCapture ) {
        elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
            !originalEvent && ( originalEvent = window.event );

            // create a normalized event object
            var event = {
                // keep a ref to the original event object
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                deltaZ: 0,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };
            
            // calculate deltaY (and deltaX) according to the event
            if ( support == "mousewheel" ) {
                event.deltaY = - 1/40 * originalEvent.wheelDelta;
                // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
            } else {
                event.deltaY = originalEvent.detail;
            }

            // it's time to fire the callback
            return callback( event );

        }, useCapture || false );
    }

})(window,document);