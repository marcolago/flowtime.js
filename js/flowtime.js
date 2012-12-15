/*!
 * Flowtime.js
 * http://marcolago.com/absolide/flowtime/
 * MIT licensed
 *
 * Copyright (C) 2012 Marco Lago, http://marcolago.com
 */

var Flowtime = (function ()
{

	/**
	 * test if the device is touch enbled
	 */
	var isTouchDevice = 'ontouchstart' in document.documentElement;
	
	/**
	 * test if the HTML History API's where available
	 * this value can be overridden to disable the History API
	 */
	var pushHistory = window.history.pushState;
	
	/**
	 * application constants
	 */
	var PAGE_CLASS = "page";
	var PAGE_SELECTOR = "." + PAGE_CLASS;
	var SUB_PAGE_CLASS = "sub-page";
	var SUB_PAGE_SELECTOR = "." + SUB_PAGE_CLASS;
	var FRAGMENT_CLASS = "fragment";
	var FRAGMENT_SELECTOR = "." + FRAGMENT_CLASS;
	/**
	 * application variables
	 */
	var pageContainer = document.querySelector(".page-container");	// cached reference to .page-container element
	var body = document.querySelector("body");						// cached reference to body element
	var useHash = false;											// if true the engine uses only the hash change logic
	var currentHash = "";											// the hash string of the current page / sub page pair
	var isOverview = false;											// Boolean status for the overview 
	var siteName = document.title;									// cached base string for the site title
	var overviewCachedDest;											// caches the destination before performing an overview zoom out for navigation back purposes
	var overviewFixedScaleFactor = 22;								// fixed scale factor for overview variant
	var defaultProgress = null;										// default progress bar reference

	var _fragmentsOnSide = false;									// enable fragments navigation even when navigating from pages
	var _showFragmentsOnBack = false;								// shows fragments when navigating back to a sub page
	var _slideWithPx = false;										// calculate the slide position in px instead of %, use in case the % mode does not works
	var _useOverviewVariant = false;								// use an alternate overview layout and navigation (experimental - useful in case of rendering issues)
	var _twoStepsSlide = false;										// not yet implemented! slides up or down before, then slides to the sub page
	var _showProgress = false;										// show or hide the default progress indicator (leave false if you want to implement a custom progress indicator)

	/**
	 * add "ft-absolute-nav" hook class to body
	 * to set the CSS properties
	 * needed for application scrolling
	 */
	Brav1Toolbox.addClass(body, "ft-absolute-nav");

/*
	##    ##    ###    ##     ## ####  ######      ###    ######## ####  #######  ##    ##    ######## ##     ## ######## ##    ## ########  ######  
	###   ##   ## ##   ##     ##  ##  ##    ##    ## ##      ##     ##  ##     ## ###   ##    ##       ##     ## ##       ###   ##    ##    ##    ## 
	####  ##  ##   ##  ##     ##  ##  ##         ##   ##     ##     ##  ##     ## ####  ##    ##       ##     ## ##       ####  ##    ##    ##       
	## ## ## ##     ## ##     ##  ##  ##   #### ##     ##    ##     ##  ##     ## ## ## ##    ######   ##     ## ######   ## ## ##    ##     ######  
	##  #### #########  ##   ##   ##  ##    ##  #########    ##     ##  ##     ## ##  ####    ##        ##   ##  ##       ##  ####    ##          ## 
	##   ### ##     ##   ## ##    ##  ##    ##  ##     ##    ##     ##  ##     ## ##   ###    ##         ## ##   ##       ##   ###    ##    ##    ## 
	##    ## ##     ##    ###    ####  ######   ##     ##    ##    ####  #######  ##    ##    ########    ###    ######## ##    ##    ##     ######  
*/

	/**
	 * add a listener for event delegation
	 * used for navigation purposes
	 */
	if (!isTouchDevice)
	{
		Brav1Toolbox.addListener(document, "click", onNavClick, false);
	}

	function onNavClick(e)
	{
		var href = e.target.getAttribute("href");
		// links with href starting with #
		if (href && href.substr(0,1) == "#")
		{
			e.preventDefault();
			var h = href;
			var dest = NavigationMatrix.setPage(h);
			navigateTo(dest, null, true);
		}
		// sub pages in oveview mode
		if (isOverview && Brav1Toolbox.hasClass(e.target, SUB_PAGE_CLASS))
		{
			navigateTo(e.target, null, true);
		}
		// thumbs in the default progress indicator
		if (Brav1Toolbox.hasClass(e.target, "sub-page-thumb"))
		{
			var pTo = Number(unsafeAttr(e.target.getAttribute("data-p")));
			var spTo = Number(unsafeAttr(e.target.getAttribute("data-sp")));
			_gotoPage(pTo, spTo);
		}
	}

	/**
	 * set callback for onpopstate event
	 * uses native history API to manage navigation
	 * but uses the # for client side navigation on return
	 */
	if (useHash == false)
	{
		window.onpopstate = onPopState;
	}
	//
	function onPopState(e)
	{
		useHash = false;
		if (e.state)
		{
			var h = e.state.token.replace("#/", "");
			var dest = NavigationMatrix.setPage(h);
			navigateTo(dest, false);
		}
	}

	/**
	 * set callback for hashchange event
	 * this callback is used not only when onpopstate event wasn't available
	 * but also when the user resize the window or for the firs visit on the site
	 */
	Brav1Toolbox.addListener(window, "hashchange", onHashChange);
	//
	/**
	 * @param	e	Event	the hashChange Event
	 * @param	d	Boolean	force the hash change
	 */
	function onHashChange(e, d)
	{
		if (useHash || d)
		{
			var h = document.location.hash.replace("#/", "");
			var dest = NavigationMatrix.setPage(h);
			navigateTo(dest, false);
		}
	}

	/**
	 * monitoring function that triggers hashChange when resizing window
	 */
	var hashMonitor = (function _hashMonitor()
	{
		var ticker = NaN;
		function _enable()
		{
			_disable();
			if (!isOverview)
			{
				ticker = setTimeout(doHashChange, 300);
			}
		}
		
		function _disable()
		{
			clearTimeout(ticker);
		}
		
		function doHashChange()
		{
			onHashChange(null, true);
		}
		
		Brav1Toolbox.addListener(window, "resize", _enable);
		
		return {
			enable: _enable,
			disable: _disable,
		}
	})();

/*
	##     ## ######## #### ##        ######  
	##     ##    ##     ##  ##       ##    ## 
	##     ##    ##     ##  ##       ##       
	##     ##    ##     ##  ##        ######  
	##     ##    ##     ##  ##             ## 
	##     ##    ##     ##  ##       ##    ## 
	 #######     ##    #### ########  ######  
*/

	/**
	 * returns the element by parsing the hash
	 * @param h String	the hash string to evaluate
	 */
	function getElementByHash(h)
	{
		if (h.length > 0)
		{
			var aHash = h.replace("#/", "").split("/"); // TODO considerare l'ultimo slash come nullo
			var p = document.querySelector(".page[data-id=__" + aHash[0] + "]") || document.querySelector(".page[data-prog=__" + aHash[0] + "]");
			if (p != null)
			{
				var sp = null;
				if (aHash.length > 1)
				{
					sp = p.querySelector(SUB_PAGE_SELECTOR + "[data-id=__" + aHash[1] + "]") || p.querySelector(SUB_PAGE_SELECTOR + "[data-prog=__" + aHash[1] + "]");
				}
				if (sp == null)
				{
					sp = p.querySelector(SUB_PAGE_SELECTOR);
				}
				return sp;
			}
		}
		return;
	}
	
	/**
	 * public method to force navigation updates
	 */
	function _updateNavigation()
	{
		NavigationMatrix.update();
		onHashChange(null, true);
	}

	/**
	 * builds and sets the title of the document parsing the attributes of the current section
	 * if a data-title is available in a sub page and or in a page then it will be used
	 * otherwise it will be used a formatted version of the hash string
	 */
	function setTitle(h)
	{
		var t = siteName;
		var ht = NavigationMatrix.getCurrentSubPage().getAttribute("data-title");
		if (ht == null)
		{
			var hs = h.split("/");
			for (var i = 0; i < hs.length; i++)
			{
				t += " | " + hs[i];
			}
		}
		else
		{
			if (NavigationMatrix.getCurrentPage().getAttribute("data-title") != null)
			{
				t += " | " + NavigationMatrix.getCurrentPage().getAttribute("data-title");
			}
			t += " | " + ht
		}
		document.title = t;
	}

	/**
	 * returns a clean string of navigation atributes of the passed page
	 * if there is a data-id attribute it will be returned
	 * otherwise will be returned the data-prog attribute
	 */
	function getPageId(d)
	{
		return (d.getAttribute("data-id") != null ? d.getAttribute("data-id").replace(/__/, "") : d.getAttribute("data-prog").replace(/__/, ""));
	}

	/**
	 * returns a safe version of an attribute value
	 * adding __ in front of the value
	 */
	function safeAttr(a)
	{
		if (a.substr(0,2) != "__")
		{
			return "__" + a;
		}
		else
		{
			return a;
		}
	}

	/**
	 * clean the save value of an attribute
	 * removing __ from the beginning of the value
	 */
	function unsafeAttr(a)
	{
		if (a.substr(0,2) == "__")
		{
			return a.replace(/__/, "");
		}
		else
		{
			return a;
		}
	}

/*
	##    ##    ###    ##     ## ####  ######      ###    ######## ######## ########  #######  
	###   ##   ## ##   ##     ##  ##  ##    ##    ## ##      ##    ##          ##    ##     ## 
	####  ##  ##   ##  ##     ##  ##  ##         ##   ##     ##    ##          ##    ##     ## 
	## ## ## ##     ## ##     ##  ##  ##   #### ##     ##    ##    ######      ##    ##     ## 
	##  #### #########  ##   ##   ##  ##    ##  #########    ##    ##          ##    ##     ## 
	##   ### ##     ##   ## ##    ##  ##    ##  ##     ##    ##    ##          ##    ##     ## 
	##    ## ##     ##    ###    ####  ######   ##     ##    ##    ########    ##     #######  
*/

	/**
	 * navigation transition logic
	 * @param	dest HTMLElement	the sub page to go to
	 * @param	push Boolean if true the hash string were pushed to the history API
	 * @param	linked Boolean if true triggers a forced update of all the fragments in the sub pages, used when navigating from links or overview
	 */
	function navigateTo(dest, push, linked)
	{
		push = push == false ? push : true;
		// if dest doesn't exist then go to homepage
		if (!dest)
		{
			if (NavigationMatrix.getCurrentSubPage() != null)
			{
				dest = NavigationMatrix.getCurrentSubPage();
			}
			else
			{
				dest = document.querySelector(SUB_PAGE_SELECTOR);
			}
			push = true;
		}
		var x;
		var y;
		var pageIndex = NavigationMatrix.getPageIndex(dest);
		if (_slideWithPx == true)
		{
			// calculate the coordinates of the destination
			x = dest.offsetLeft + dest.parentNode.offsetLeft;
			y = dest.offsetTop + dest.parentNode.offsetTop;	
		}
		else
		{
			// calculate the index of the destination page
			x = pageIndex.page;
			y = pageIndex.subPage;
		}
		// check what properties use for navigation and set the style
		setNavProperty(x, y);
		//
		var h = NavigationMatrix.getHash(dest);
		if (linked == true)
		{
			NavigationMatrix.updateFragments();
		}
		//
		if (pushHistory && push != false)
		{
			var stateObj = { token: h };
			var nextHash = "#/" + h;
			if (nextHash != currentHash)
			{
				currentHash = nextHash;
				window.history.pushState(stateObj, null, currentHash);
			}
		}
		else
		{
			document.location.hash = "/" + h;
		}
		setTitle(h);
		if (isOverview)
		{
			zoomIn();
		}
		NavigationMatrix.switchActiveSubPage(NavigationMatrix.getCurrentSubPage(), true);
		//
		// dispatches an event populated with navigation data
		Brav1Toolbox.dispatchEvent("flowtimenavigation",	{
													page: NavigationMatrix.getCurrentPage(),
													subPage: NavigationMatrix.getCurrentSubPage(),
													pageIndex: pageIndex.page, 
													subPageIndex: pageIndex.subPage, 
													prevPage: NavigationMatrix.hasPrevPage(),
													nextPage: NavigationMatrix.hasNextPage(),
													prev: NavigationMatrix.hasPrevSubPage(),
													next: NavigationMatrix.hasNextSubPage(),
													progress: NavigationMatrix.getProgress(),
													total: NavigationMatrix.getSubPagesTotalLength()
												} );

		if (_showProgress)
		{
			updateProgress();
		}
	}

	/**
	 * check the availability of transform CSS property
	 * if transform is not available then fallbacks to position absolute behaviour
	 */
	function setNavProperty(x, y)
	{
		if (Brav1Toolbox.testCSS("transform"))
		{
			if (_slideWithPx)
			{
				pageContainer.style[Brav1Toolbox.getPrefixed("transform")] = "translateX(" + -x + "px) translateY(" + -y + "px)";	
			}
			else
			{
				pageContainer.style[Brav1Toolbox.getPrefixed("transform")] = "translateX(" + -x * 100 + "%) translateY(" + -y * 100 + "%)";
			}
		}
		else
		{
			if (_slideWithPx)
			{
				pageContainer.style.top = -y + "px";
				pageContainer.style.left = -x + "px";
			}
			else
			{
				pageContainer.style.top = -y * 100 + "%";
				pageContainer.style.left = -x * 100 + "%";
			}
		}
	}

/*
	########  ########   #######   ######   ########  ########  ######   ######  
	##     ## ##     ## ##     ## ##    ##  ##     ## ##       ##    ## ##    ## 
	##     ## ##     ## ##     ## ##        ##     ## ##       ##       ##       
	########  ########  ##     ## ##   #### ########  ######    ######   ######  
	##        ##   ##   ##     ## ##    ##  ##   ##   ##             ##       ## 
	##        ##    ##  ##     ## ##    ##  ##    ##  ##       ##    ## ##    ## 
	##        ##     ##  #######   ######   ##     ## ########  ######   ######  
*/
	var defaultProgress = null;
	var progressFill = null;

	function buildProgressIndicator()
	{
		var domFragment = document.createDocumentFragment();
		// create the progress container div
		defaultProgress = document.createElement("div");
		defaultProgress.className = "ft-default-progress";
		domFragment.appendChild(defaultProgress);
		// loop through pages
		for (var i = 0; i < NavigationMatrix.getPagesLength(); i++)
		{
			var pDiv = document.createElement("div");
			pDiv.className = "page-thumb";
			// loop through sub pages
			var spArray = NavigationMatrix.getSubPages(i)
			for (var ii = 0; ii < spArray.length; ii++) {
				var spDiv = document.createElement("div");
				spDiv.className = "sub-page-thumb";
				spDiv.setAttribute("data-p", "__" + i);
				spDiv.setAttribute("data-sp", "__" + ii);
				pDiv.appendChild(spDiv);
			};
			defaultProgress.appendChild(pDiv);
		};
		body.appendChild(defaultProgress);
	}

	function hideProgressIndicator()
	{
		if (defaultProgress != null)
		{
			body.removeChild(defaultProgress);
			defaultProgress = null;
		}
	}

	function updateProgress()
	{
		if (defaultProgress != null)
		{
			var spts = document.querySelectorAll(".ft-default-progress .sub-page-thumb");
			for (var i = 0; i < spts.length; i++)
			{
				var spt = spts[i];
				var pTo = Number(unsafeAttr(spt.getAttribute("data-p")));
				var spTo = Number(unsafeAttr(spt.getAttribute("data-sp")));
				if (pTo == NavigationMatrix.getPageIndex().page && spTo == NavigationMatrix.getPageIndex().subPage)
				{
					Brav1Toolbox.addClass(spts[i], "actual");
				}
				else
				{
					Brav1Toolbox.removeClass(spts[i], "actual");
				}
			}

		}
	}

/*
	 #######  ##     ## ######## ########  ##     ## #### ######## ##      ##    ##     ##    ###    ##    ##    ###     ######   ######## ##     ## ######## ##    ## ######## 
	##     ## ##     ## ##       ##     ## ##     ##  ##  ##       ##  ##  ##    ###   ###   ## ##   ###   ##   ## ##   ##    ##  ##       ###   ### ##       ###   ##    ##    
	##     ## ##     ## ##       ##     ## ##     ##  ##  ##       ##  ##  ##    #### ####  ##   ##  ####  ##  ##   ##  ##        ##       #### #### ##       ####  ##    ##    
	##     ## ##     ## ######   ########  ##     ##  ##  ######   ##  ##  ##    ## ### ## ##     ## ## ## ## ##     ## ##   #### ######   ## ### ## ######   ## ## ##    ##    
	##     ##  ##   ##  ##       ##   ##    ##   ##   ##  ##       ##  ##  ##    ##     ## ######### ##  #### ######### ##    ##  ##       ##     ## ##       ##  ####    ##    
	##     ##   ## ##   ##       ##    ##    ## ##    ##  ##       ##  ##  ##    ##     ## ##     ## ##   ### ##     ## ##    ##  ##       ##     ## ##       ##   ###    ##    
	 #######     ###    ######## ##     ##    ###    #### ########  ###  ###     ##     ## ##     ## ##    ## ##     ##  ######   ######## ##     ## ######## ##    ##    ##    
*/
	
	/**
	 * switch from the overview states
	 */
	function _toggleOverview(undo)
	{
		if (isOverview)
		{
			zoomIn(undo);
		}
		else
		{
			overviewCachedDest = NavigationMatrix.getCurrentSubPage();
			zoomOut();
		}
	}

	/**
	 * zoom in the page container to focus on the current page / sub page
	 */
	function zoomIn(undo)
	{
		isOverview = false;
		Brav1Toolbox.removeClass(body, "ft-overview");
		NavigationMatrix.hideFragments();
		if (undo == true)
		{
			navigateTo(overviewCachedDest);
		}
		else
		{
			navigateTo();
		}
		//
		// var msp = document.querySelectorAll(".page");
		// for (var i = 0; i < msp.length; i++)
		// {
		// 	msp[i].style[Brav1Toolbox.getPrefixed("transform")] = "translateZ(0)";
		// }
	}

	/**
	 * zoom out the page container for an overview of all the pages / sub pages
	 */
	function zoomOut()
	{
		isOverview = true;
		Brav1Toolbox.addClass(body, "ft-overview");
		NavigationMatrix.showFragments();
		//
		if (_useOverviewVariant == false)
		{
			overviewZoomTypeA(true);
		}
		else
		{
			overviewZoomTypeB(true);
		}
	}

	function overviewZoomTypeA(out)
	{	
		// pageContainer scale version
		if (out)
		{
			var scaleX = 100 / NavigationMatrix.getPagesLength();
			var scaleY = 100 / NavigationMatrix.getSubPagesLength();
			var scale = Math.min(scaleX, scaleY) * 0.9;
			var offsetX = (100 - NavigationMatrix.getPagesLength() * scale) / 2;
			var offsetY = (100 - NavigationMatrix.getSubPagesLength() * scale) / 2;
			pageContainer.style[Brav1Toolbox.getPrefixed("transform")] = "translate(" + offsetX + "%, " + offsetY + "%) scale(" + scale/100 + ", " + scale/100 + ")";
		}
		else
		{

		}
	}

	function overviewZoomTypeB(out)
	{
		// pageContainer scale alternative version
		if (out)
		{
			var scale = overviewFixedScaleFactor // Math.min(scaleX, scaleY) * 0.9;
			var pIndex = NavigationMatrix.getPageIndex();
			var offsetX = 50 - (scale * pIndex.page) - (scale / 2);
			var offsetY = 50 - (scale * pIndex.subPage) - (scale / 2);
			pageContainer.style[Brav1Toolbox.getPrefixed("transform")] = "translate(" + offsetX + "%, " + offsetY + "%) scale(" + scale/100 + ", " + scale/100 + ")";
		}
	}

/*
	##    ## ######## ##    ## ########   #######     ###    ########  ########     ##    ##    ###    ##     ## ####  ######      ###    ######## ####  #######  ##    ## 
	##   ##  ##        ##  ##  ##     ## ##     ##   ## ##   ##     ## ##     ##    ###   ##   ## ##   ##     ##  ##  ##    ##    ## ##      ##     ##  ##     ## ###   ## 
	##  ##   ##         ####   ##     ## ##     ##  ##   ##  ##     ## ##     ##    ####  ##  ##   ##  ##     ##  ##  ##         ##   ##     ##     ##  ##     ## ####  ## 
	#####    ######      ##    ########  ##     ## ##     ## ########  ##     ##    ## ## ## ##     ## ##     ##  ##  ##   #### ##     ##    ##     ##  ##     ## ## ## ## 
	##  ##   ##          ##    ##     ## ##     ## ######### ##   ##   ##     ##    ##  #### #########  ##   ##   ##  ##    ##  #########    ##     ##  ##     ## ##  #### 
	##   ##  ##          ##    ##     ## ##     ## ##     ## ##    ##  ##     ##    ##   ### ##     ##   ## ##    ##  ##    ##  ##     ##    ##     ##  ##     ## ##   ### 
	##    ## ########    ##    ########   #######  ##     ## ##     ## ########     ##    ## ##     ##    ###    ####  ######   ##     ##    ##    ####  #######  ##    ## 
*/

	/**
	 * KEYBOARD NAVIGATION
	 */
	Brav1Toolbox.addListener(window, "keydown", onKeyDown);
	Brav1Toolbox.addListener(window, "keyup", onKeyUp);
	
	function onKeyDown(e)
	{
		var tag = e.target.tagName;
		if (tag != "INPUT" && tag != "TEXTAREA" && tag != "SELECT")
		{
			if (e.keyCode >= 37 && e.keyCode <= 40)
			{
				e.preventDefault();
			}
		}
	}
	
	function onKeyUp(e)
	{
		var tag = e.target.tagName;
		var elem;
		if (tag != "INPUT" && tag != "TEXTAREA" && tag != "SELECT")
		{
			e.preventDefault();
			switch (e.keyCode)
			{
				case 27 : // esc
					_toggleOverview(true);
					break;
				case 37 : // left
					_prevPage(e.shiftKey);
					break;
				case 39 : // right
					_nextPage(e.shiftKey);
					break;
				case 38 : // up
					_prevSubPage(e.shiftKey);
					break;
				case 40 : // down
					_nextSubPage(e.shiftKey);
					break;
				case 13 : // return
				{
					if (isOverview)
					{
						_gotoPage(NavigationMatrix.getCurrentHilited());
					}
					break;
				}
				default :
					break;
			}
		}
	}

/*
	########  ##     ## ########  ##       ####  ######        ###    ########  #### 
	##     ## ##     ## ##     ## ##        ##  ##    ##      ## ##   ##     ##  ##  
	##     ## ##     ## ##     ## ##        ##  ##           ##   ##  ##     ##  ##  
	########  ##     ## ########  ##        ##  ##          ##     ## ########   ##  
	##        ##     ## ##     ## ##        ##  ##          ######### ##         ##  
	##        ##     ## ##     ## ##        ##  ##    ##    ##     ## ##         ##  
	##         #######  ########  ######## ####  ######     ##     ## ##        #### 
*/

	/*
	 * Public API to go to the next page
	 * @param	top	Boolean	if true the next page will be the first sub page in the next array; if false the next page will be the same index sub page in the next array
	 */
	function _nextPage(top)
	{
		var d = NavigationMatrix.getNextPage(top, _fragmentsOnSide, isOverview);
		if (d != undefined)
		{
			navigateTo(d);
		}
		else
		{
			if (isOverview && _useOverviewVariant)
			{
				zoomOut();
			}
		}
	}

	/*
	 * Public API to go to the prev page
	 * 
	 */
	function _prevPage(top)
	{
		var d = NavigationMatrix.getPrevPage(top, _fragmentsOnSide, isOverview);
		if (d != undefined)
		{
			navigateTo(d);
		}
		else
		{
			if (isOverview && _useOverviewVariant)
			{
				zoomOut();
			}
		}
	}

	/*
	 * Public API to go to the next sub page
	 */
	function _nextSubPage(jump)
	{
		var d = NavigationMatrix.getNextSubPage(jump, isOverview);
		if (d != undefined)
		{
			navigateTo(d);
		}
		else
		{
			if (isOverview && _useOverviewVariant)
			{
				zoomOut();
			}
		}
	}

	/*
	 * Public API to go to the prev sub page
	 */
	function _prevSubPage(jump)
	{
		var d = NavigationMatrix.getPrevSubPage(jump, isOverview);
		if (d != undefined)
		{
			navigateTo(d);
		}
		else
		{
			if (isOverview && _useOverviewVariant)
			{
				zoomOut();
			}
		}
	}

	/*
	 * Public API to go to a specified page / sub page
	 * the method accepts vary parameters:
	 * if two numbers were passed it assumes that the first is the page index and the second is the sub page index;
	 * if an object is passed it assumes that the object has a page property and a subPage property to get the indexes to navigate;
	 * if an HTMLElement is passed it assumes the element is a destination sub page 
	 */
	function _gotoPage()
	{
		var args = _gotoPage.arguments;
		if (args.length > 0)
		{
			if (args.length == 1)
			{
				if (Brav1Toolbox.typeOf(args[0]) === "Object")
				{
					var o = args[0];
					var p = o.page;
					var sp = o.subPage;
					if (p != null && p != undefined)
					{
						var pd = document.querySelector(".page[data-id=" + safeAttr(p) + "]");
						if (sp != null && sp != undefined)
						{
							var spd = pd.querySelector(SUB_PAGE_SELECTOR + "[data-id=" + safeAttr(sp) + "]");
							if (spd != null)
							{
								navigateTo(spd);
								return;
							}
						}
					}
				}
				else if (args[0].nodeName != undefined)
				{
					navigateTo(args[0], null, true);
				}
			}
			else 
			{
				if (Brav1Toolbox.typeOf(args[0]) === "Number" || args[0] === 0)
				{
					var spd = NavigationMatrix.getSubPageByIndex(args[1], args[0]);
					navigateTo(spd);
					return;
				}
			}
		}
	}

/*
	##    ##    ###    ##     ## ####  ######      ###    ######## ####  #######  ##    ## ##     ##    ###    ######## ########  #### ##     ## 
	###   ##   ## ##   ##     ##  ##  ##    ##    ## ##      ##     ##  ##     ## ###   ## ###   ###   ## ##      ##    ##     ##  ##   ##   ##  
	####  ##  ##   ##  ##     ##  ##  ##         ##   ##     ##     ##  ##     ## ####  ## #### ####  ##   ##     ##    ##     ##  ##    ## ##   
	## ## ## ##     ## ##     ##  ##  ##   #### ##     ##    ##     ##  ##     ## ## ## ## ## ### ## ##     ##    ##    ########   ##     ###    
	##  #### #########  ##   ##   ##  ##    ##  #########    ##     ##  ##     ## ##  #### ##     ## #########    ##    ##   ##    ##    ## ##   
	##   ### ##     ##   ## ##    ##  ##    ##  ##     ##    ##     ##  ##     ## ##   ### ##     ## ##     ##    ##    ##    ##   ##   ##   ##  
	##    ## ##     ##    ###    ####  ######   ##     ##    ##    ####  #######  ##    ## ##     ## ##     ##    ##    ##     ## #### ##     ## 
*/

	/**
	 * NavigationMatrix is the Object who store the navigation grid structure
	 * and which expose all the methods to get and set the navigation destinations
	 */
	
	var NavigationMatrix = (function ()
	{
		var pages;						// HTML Collection of .page-container > .page elements
		var pagesArray;					// multi-dimensional array containing the sub pages' array
		var fragments;					// HTML Collection of .fragment elements 
		var fragmentsArray;				// multi-dimensional array containing the per sub page fragments' array
		var fr = [];					// multi-dimensional array containing the index of the current active fragment per sub page
		var pagesLength = 0;			// cached total number of .page elements
		var subPagesLength = 0;			// cached max number of .sub-page elements
		var subPagesTotalLength = 0;	// cached total number of .sub-page elements
		var p = 0;						// index of the current page viewved or higlighted
		var sp = 0;						// index of the current sub page viewved or higlighted
		var pCache = 0;					// cache index of the current page
		var spCache = 0;				// cache index of the current sub page
		var hilited;					// the current sub page higlighted, useful for overview mode
		
		/**
		 * update the navigation matrix array
		 * this is a publicy exposed method
		 * useful for updating the matrix whne the site structure changes at runtime
		 */
		function _updateMatrix()
		{
			pagesArray = [];
			fragments = document.querySelectorAll(FRAGMENT_SELECTOR);
			fragmentsArray = [];
			pages = pageContainer.querySelectorAll(".page-container > " + PAGE_SELECTOR);
			//
			for (var i = 0; i < pages.length; i++)
			{
				var subPagesArray = [];
				var page = pages[i];
				fragmentsArray[i] = [];
				fr[i] = [];
				//
				if (page.getAttribute("data-id"))
				{
					page.setAttribute("data-id", "__" + page.getAttribute("data-id")); // prevents attributes starting with a number
				}
				page.setAttribute("data-prog", "__" + (i + 1));
				page.index = i;
				//
				var subPages = page.querySelectorAll(SUB_PAGE_SELECTOR);
				subPagesTotalLength += subPages.length;
				subPagesLength = Math.max(subPagesLength, subPages.length); // sets the sub pages max number for overview purposes
				for (var ii = 0; ii < subPages.length; ii++)
				{
					var _sp = subPages[ii];
					if (_sp.getAttribute("data-id"))
					{
						_sp.setAttribute("data-id", "__" + _sp.getAttribute("data-id")); // prevents attributes starting with a number
					}
					_sp.setAttribute("data-prog", "__" + (ii + 1));
					_sp.index = ii;
					subPagesArray.push(_sp);
					//
					var subFragments = _sp.querySelectorAll(FRAGMENT_SELECTOR);
					fragmentsArray[i][ii] = subFragments;
					fr[i][ii] = -1;
				}
				pagesArray.push(subPagesArray);
			}
			//
			pagesLength = pages.length; // sets the pages max number for overview purposes
		}
		
		/**
		 * returns the next page in navigation
		 * @param	top	Boolean	if true the next page will be the first sub page in the next array; if false the next page will be the same index sub page in the next array
		 * @param	fos	Boolean value of _fragmentsOnSide
		 * @param	io	Boolean	value of isOverview
		 */
		function _getNextPage(top, fos, io)
		{
			var sub = sp;
			if (fos == true && fragmentsArray[p][sp].length > 0 && fr[p][sp] < fragmentsArray[p][sp].length - 1 && top != true && io == false)
			{
				_showFragment(p, sp);
			}
			else
			{
				sub = 0;
				if (top != true || _showFragmentsOnBack == true || p + 1 > pagesArray.length - 1)
				{
					sub = sp;
				}
				p = Math.min(p + 1, pagesArray.length - 1);
				return _getNearestSubPage(pagesArray[p], sub, io);
			}
			return hiliteOrNavigate(pagesArray[p][sp], io);
		}
		
		/**
		 * returns the prev page in navigation
		 * @param	top	Boolean	if true the next page will be the first sub page in the prev array; if false the prev page will be the same index sub page in the prev array
		 * @param	fos	Boolean value of _fragmentsOnSide
		 * @param	io	Boolean	value of isOverview
		 */
		function _getPrevPage(top, fos, io)
		{
			var sub = sp;
			if (fos == true && fragmentsArray[p][sp].length > 0 && fr[p][sp] >= 0 && top != true && io == false)
			{
				_hideFragment(p, sp);
			}
			else
			{
				var sub = 0;
				if (top != true || _showFragmentsOnBack == true || p - 1 < 0)
				{
					sub = sp;
				}
				p = Math.max(p - 1, 0);
				return _getNearestSubPage(pagesArray[p], sub, io);
			}
			return hiliteOrNavigate(pagesArray[p][sp], io);
		}
		
		/**
		 * checks if there is a valid sub page in the current page array
		 * if the passed sub page is not valid thne check which is the first valid sub page in the array
		 * then returns the sub page
		 * @param	p	Number	the page index in the pages array
		 * @param	sub	Number	the sub page index in the pages->page array
		 * @param	io	Boolean	value of isOverview
		 */
		function _getNearestSubPage(pg, sub, io)
		{
			var nsp = pg[sub];
			if (nsp == undefined)
			{
				for (var i = sub; i >= 0; i--)
				{
					if (pg[i] != undefined)
					{
						nsp = pg[i];
						sub = i;
						break;
					}
				}
			}
			sp = sub;
			_updateFragments();
			return hiliteOrNavigate(nsp, io);
		}
		
		/**
		 * returns the next sub page in navigation
		 * if the next sub page is not in the current page array returns the first sub page in the next page array
		 * @param	jump	Boolean	if true jumps over the fragments directly to the next sub page
		 * @param	io	Boolean	value of isOverview
		 */
		function _getNextSubPage(jump, io)
		{
			if (fragmentsArray[p][sp].length > 0 && fr[p][sp] < fragmentsArray[p][sp].length - 1 && jump != true && io == false)
			{
				_showFragment(p, sp);
			}
			else
			{
				if (pagesArray[p][sp + 1] == undefined && pagesArray[p + 1] != undefined)
				{
					p += 1;
					sp = 0;
				}
				else
				{
					sp = Math.min(sp + 1, pagesArray[p].length - 1);
				}
			}
			return hiliteOrNavigate(pagesArray[p][sp], io);
		}
		
		/**
		 * returns the prev sub page in navigation
		 * if the prev sub page is not in the current page array returns the first sub page in the prev page array
		 * @param	jump	Boolean	if true jumps over the fragments directly to the prev sub page
		 * @param	io	Boolean	value of isOverview
		 */
		function _getPrevSubPage(jump, io)
		{
			if (fragmentsArray[p][sp].length > 0 && fr[p][sp] >= 0 && jump != true && io == false)
			{
				_hideFragment(p, sp);
			}
			else
			{
				if (sp == 0 && pagesArray[p - 1] != undefined)
				{
					p -= 1;
					sp = pagesArray[p].length - 1;
				}
				else
				{
					sp = Math.max(sp - 1, 0);
				}
			}
			return hiliteOrNavigate(pagesArray[p][sp], io);
		}

		/**
		 * returns the destination sub page or
		 * if the application is in overview mode
		 * switch the active page without returning a destination
		 * @param	d	HTMLElement	the candidate destination
		 * @param	io	Boolean	value of isOverview
		 */
		function hiliteOrNavigate(d, io)
		{
			if (io == true)
			{
				_switchActiveSubPage(d);
				return;
			}
			else
			{
				return d;
			}
		}

		/**
		 * show a single fragment inside the specified page / sub page
		 * the fragment index parameter is optional, if passed force the specified fragment to show
		 * otherwise the method shows the current fragment
		 * @param	fp	Number	the page index
		 * @param	fsp	Number	the sub page index
		 * @param	f	Number	the fragment index (optional)
		 */
		function _showFragment(fp, fsp, f)
		{
			if (f != undefined)
			{
				fr[fp][fsp] = f;
			}
			else
			{
				f = fr[fp][fsp] += 1;
			}
			Brav1Toolbox.addClass(fragmentsArray[fp][fsp][f], "revealed");
		}

		/**
		 * hide a single fragment inside the specified page / sub page
		 * the fragment index parameter is optional, if passed force the specified fragment to hide
		 * otherwise the method hides the current fragment
		 * @param	fp	Number	the page index
		 * @param	fsp	Number	the sub page index
		 * @param	f	Number	the fragment index (optional)
		 */
		function _hideFragment(fp, fsp, f)
		{
			if (f != undefined)
			{
				fr[fp][fsp] = f;
			}
			else
			{
				f = fr[fp][fsp];
			}
			Brav1Toolbox.removeClass(fragmentsArray[fp][fsp][f], "revealed");
			fr[fp][fsp] -= 1;
		}

		/**
		 * show all the fragments
		 * adds a temporary class wich does not override the current status of fragments
		 */
		function _showFragments()
		{
			for (var i = 0; i < fragments.length; i++)
			{
				Brav1Toolbox.addClass(fragments[i], "revealed-temp");
			}
		}

		/**
		 * hide all the fragments
		 * removes a temporary class wich does not override the current status of fragments
		 */
		function _hideFragments()
		{
			for (var i = 0; i < fragments.length; i++)
			{
				Brav1Toolbox.removeClass(fragments[i], "revealed-temp");
			}
		}

		function _updateFragments()
		{
			for (var ip = 0; ip < fragmentsArray.length; ip++)
			{
				var frp = fragmentsArray[ip];
				for (var isp = 0; isp < frp.length; isp++)
				{
					var frsp = frp[isp];
					if (frsp.length > 0)
					{
						if (ip > p)
						{
							for (var f = frsp.length - 1; f >= 0; f--)
							{
								_hideFragment(ip, isp, f);
							}
						}
						else if (ip < p)
						{
							for (var f = 0; f < frsp.length; f++)
							{
								_showFragment(ip, isp, f);
							}
						}
						else if (ip == p)
						{
							if (isp > sp)
							{
								for (var f = frsp.length - 1; f >= 0; f--)
								{
									_hideFragment(ip, isp, f);
								}
							}
							else if (isp < sp)
							{
								for (var f = 0; f < frsp.length; f++)
								{
									_showFragment(ip, isp, f);
								}
							}
							else if (isp == sp)
							{	
								for (var f = 0; f < frsp.length; f++)
								{
									if (_showFragmentsOnBack == false)
									{
										_hideFragment(ip, isp, f);
									}
									else
									{
										_showFragments(ip, isp, f);
									}
								}
								if (_showFragmentsOnBack == false)
								{
									fr[ip][isp] = -1
								}
								else
								{
									fr[ip][isp] = f - 1;	
								}
							}
						}
					}
				}
			}
		}
		
		/**
		 * returns the current page index
		 */
		function _getPage(h)
		{
			if (h)
			{
				// TODO restituire l'index della pagina dall'hash
			}
			return p;
		}
		
		/**
		 * returns the current sub page index
		 */
		function _getSubPage(h)
		{
			if (h)
			{
				// TODO restituire l'index della sotto pagina dall'hash
			}
			return sp;
		}

		/**
		 * returns the pages collection
		 */
		 function _getPages()
		 {
		 	return pages;
		 }

		/**
		 * returns the sub pages collection inside the passed page index
		 */
		 function _getSubPages(i)
		 {
		 	return pagesArray[i];
		 }

		/**
		 * returns the number of pages
		 */
		function _getPagesLength()
		{
			return pagesLength;
		}

		/**
		 * returns the max number of sub pages
		 */
		function _getSubPagesLength()
		{
			return subPagesLength;
		}

		/**
		 * returns the total number of sub pages
		 */
		function _getSubPagesTotalLength()
		{
			return subPagesTotalLength;
		}

		/**
		 * returns a object with the index of the current page and sub page
		 */
		function _getPageIndex(d)
		{
			var pIndex = p;
			var spIndex = sp;
			if (d != undefined)
			{
				pIndex = d.parentNode.index; //parseInt(d.parentNode.getAttribute("data-prog").replace(/__/, "")) - 1;
				spIndex = d.index; //parseInt(d.getAttribute("data-prog").replace(/__/, "")) - 1;
			}
			return {page: pIndex, subPage: spIndex };
		}

		function _getPageByIndex(i)
		{
			return pages[i];
		}

		function _getSubPageByIndex(i, pi)
		{
			return pagesArray[pi][i];
		}

		function _getCurrentPage()
		{
			return pages[p];
		}

		function _getCurrentSubPage()
		{
			return pagesArray[p][sp];
		}

		function _hasNextPage()
		{
			return p < pages.length - 1;
		}

		function _hasPrevPage()
		{
			return p > 0;
		}

		function _hasNextSubPage()
		{
			return sp < pagesArray[p].length - 1;
		}

		function _hasPrevSubPage()
		{
			return sp > 0;
		}

		/**
		 * get a progress value calculated on the total number of sub pages
		 */
		function _getProgress()
		{
			if (p == 0 && sp == 0)
			{
				return 0;
			}
			var c = 0;
			for (var i = 0; i < p; i++)
			{
				c += pagesArray[i].length;
			}
			c += pagesArray[p][sp].index + 1;
			return c;
		}

		/**
		 * get a composed hash based on current page and sub page
		 */
		function _getHash(d)
		{
			if (d != undefined)
			{
				sp = _getPageIndex(d).subPage;
				p = _getPageIndex(d).page;
			}
			var h = "";
			// append to h the value of data-id attribute or, if data-id is not defined, the data-prog attribute
			var _p = pages[p];
			h += getPageId(_p);
			if (pagesArray[p].length > 1)
			{
				var _sp = pagesArray[p][sp];
				h += "/" + getPageId(_sp);
			}
			return h;
		}
		
		/**
		 * expose the method to set the page from a hash
		 */
		function _setPage(h)
		{
			var elem = getElementByHash(h);
			if (elem)
			{
				var pElem = elem.parentNode;
				for (var i = 0; i < pagesArray.length; i++)
				{
					var pa = pagesArray[i];
					if (pages[i] === pElem)
					{
						p = i;
						for (var ii = 0; ii < pa.length; ii++)
						{
							if (pa[ii] === elem)
							{
								sp = ii;
								break;
							}
						}
					}
				}
				_updateFragments();
			}
			return elem;
		}

		function _switchActiveSubPage(d, navigate)
		{
			for (var i = 0; i < pagesArray.length; i++)
			{
				var pa = pagesArray[i];
				for (var ii = 0; ii < pa.length; ii++)
				{
					var spa = pagesArray[i][ii];
					if (spa !== d)
					{
						Brav1Toolbox.removeClass(spa, "hilite");
						if (isOverview == false && spa !== _getCurrentSubPage())
						{
							Brav1Toolbox.removeClass(spa, "actual");
						}
					}
				}
			}
			Brav1Toolbox.addClass(d, "hilite");
			if (navigate)
			{
				setActual(d);
			}
			hilited = d;
		}

		function _getCurrentHilited()
		{
			return hilited;
		}

		function setActual(d)
		{
			Brav1Toolbox.addClass(d, "actual");
		}
		
		_updateMatrix(); // update the navigation matrix on the first run
		
		return {
			update: _updateMatrix,
			updateFragments: _updateFragments,
			showFragments: _showFragments,
			hideFragments: _hideFragments,
			getPage: _getPage,
			getSubPage: _getSubPage,
			getPages: _getPages,
			getSubPages: _getSubPages,
			getNextPage: _getNextPage,
			getPrevPage: _getPrevPage,
			getNextSubPage: _getNextSubPage,
			getPrevSubPage: _getPrevSubPage,
			getPagesLength: _getPagesLength,
			getSubPagesLength: _getSubPagesLength,
			getSubPagesTotalLength: _getSubPagesTotalLength,
			getPageIndex: _getPageIndex,
			getPageByIndex: _getPageByIndex,
			getSubPageByIndex: _getSubPageByIndex,
			getCurrentPage: _getCurrentPage,
			getCurrentSubPage: _getCurrentSubPage,
			getProgress: _getProgress,
			getHash: _getHash,
			setPage: _setPage,
			switchActiveSubPage: _switchActiveSubPage,
			getCurrentHilited: _getCurrentHilited,
			hasNextPage: _hasNextPage,
			hasPrevPage: _hasPrevPage,
			hasNextSubPage: _hasNextSubPage,
			hasPrevSubPage: _hasPrevSubPage
		}
	})();
	
	/**
	 * triggers the first animation when visiting the site
	 * if the hash is not empty
	 */
	function _start()
	{
		// init and configuration
		if (_showProgress && defaultProgress == null)
		{
			buildProgressIndicator();
		}
		// start navigation
		if (document.location.hash.length > 0)
		{
			onHashChange(null, true);
		}
		else
		{
			if (_start.arguments.length > 0)
			{
				_gotoPage.apply(this, _start.arguments);
			}
			else
			{
				_gotoPage(0,0);
				updateProgress();
			}
		}
	}

/*
	 ######  ######## ######## ######## ######## ########   ######  
	##    ## ##          ##       ##    ##       ##     ## ##    ## 
	##       ##          ##       ##    ##       ##     ## ##       
	 ######  ######      ##       ##    ######   ########   ######  
	      ## ##          ##       ##    ##       ##   ##         ## 
	##    ## ##          ##       ##    ##       ##    ##  ##    ## 
	 ######  ########    ##       ##    ######## ##     ##  ######  
*/

	function _setFragmentsOnSide(v)
	{
		_fragmentsOnSide = v;
		_setShowFragmentsOnBack(v);
	}

	function _setShowFragmentsOnBack(v)
	{
		_showFragmentsOnBack = v;
	}

	function _setUseHistory(v)
	{
		pushHistory = v;
	}

	function _setSlideWithPx(v)
	{
		_slideWithPx = v;
		navigateTo();
	}

	function _setUseOverviewVariant(v)
	{
		_useOverviewVariant = v;
	}

	function _setTwoStepsSlide(v)
	{
		_twoStepsSlide = v;
	}

	function _setShowProgress(v)
	{
		_showProgress = v;
		if (_showProgress)
		{
			if (defaultProgress == null)
			{
				buildProgressIndicator();
			}
			updateProgress();
		}
		else
		{
			if (defaultProgress != null)
			{
				hideProgressIndicator();
			}
		}
	}
	
	/**
	 * return object for public methods
	 */
	return {
		start: _start,
		updateNavigation: _updateNavigation,
		nextPage: _nextPage,
		prevPage: _prevPage,
		next: _nextSubPage,
		prev: _prevSubPage,
		nextFragment: _nextSubPage,
		prevFragment: _prevSubPage,
		gotoPage: _gotoPage,
		toggleOverview: _toggleOverview,
		fragmentsOnSide: _setFragmentsOnSide,
		showFragmentsOnBack: _setShowFragmentsOnBack,
		useHistory: _setUseHistory,
		slideWithPx: _setSlideWithPx,
		useOverviewVariant: _setUseOverviewVariant,
		twoStepsSlide: _setTwoStepsSlide,
		showProgress: _setShowProgress
	};
	
})();

