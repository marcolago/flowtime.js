/*!
 * Brav1Toolbox.js - common utility scripts and polyfills
 * http://marcolago.com/
 * MIT licensed
 *
 * Copyright (C) 2012-2013 Marco Lago, http://marcolago.com
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
  function _addListener(element, type, handler, useCapture)
  {
    if (element.addEventListener)
    {
      element.addEventListener(type, handler, useCapture);
    }
    else if (element.attachEvent)
    {
      element.attachEvent("on" + type, handler);
    }
  }

  function _removeListener(element, type, handler)
  {
    if (element.removeEventListener)
    {
      element.removeEventListener(type, handler);
    }
    else if (element.detachEvent)
    {
      element.detachEvent("on" + type, handler);
    }
  }

  /**
   * checks if a CSS property is supported
   * including the prefixed ones
   */
  function _testCSS(prop)
  {
    return _getPrefixed(prop) != "";
  }

  /**
   * returns the standard or the prefixed CSS property
   * use: element[Brav1Toolbox.getPrefixed(CSSProperty)];
   */
  function _getPrefixed(prop)
  {
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
   * returns the type of the object passed
   */
  function _typeOf(obj)
  {
    return !!obj && Object.prototype.toString.call(obj).match(/(\w+)\]/)[1];
  }

  /**
   * classList API polyfill
   */

  /**
   * adds the specified class to the specified element
   */
  function _addClass(el, c)
  {
    if (el.classList)
    {
      el.classList.add(c);
    }
    else
    {
      if (_hasClass(el, c) == false)
      {
        var cl = el.className;
        if (cl.length > 0)
        {
          cl += " ";
        }
        el.className = cl + c;
      }
    }
  }

  /**
   * removes the specified class from the specified element
   */
  function _removeClass(el, c)
  {
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
  function _hasClass(el, c)
  {
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
  function _dispatchEvent(t, ps)
  {
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
  function _distance(pA, pB)
  {
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
    typeOf: _typeOf,
    addClass: _addClass,
    removeClass: _removeClass,
    hasClass: _hasClass,
    distance: _distance
  }
})();

