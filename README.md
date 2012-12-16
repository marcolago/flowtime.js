# Flowtime.js

Flowtime.js is a framework to easily build HTML presentations or websites.

You can take a look at some demos to quick learn about the possibilities:
- [Base demo](http://marcolago.com/demo/flowtime-js/demo/)
- [Candy demo - same as Base demo but more eye candy](http://marcolago.com/demo/flowtime-js/demo-candy/)
- [Skyline demo - same as Base demo but with different vertical-align](http://marcolago.com/demo/flowtime-js/demo-skyline/)

Flowtime.js takes care of tasks such:
- full page and fluid layout,
- navigation logics by links and keyboard,
- transition beetween pages (needs support for CSS3 trnasitions),
- history management and deep-linking,
- overview on the entire contents.

It's also configurable by a very simple API methods to customize some behaviours.

## How to build the markup

Markup for Flowtime.js is really simple and easy to learn.
All you have to do is wrap some divs in a parent `<div class="flowtime">`, then, marking up the column with `class="ft-page"` and the single sub page with `class="ft-sub-page"`.
To better understand the markup take a look at this snippet:

    <div class="flowtime">
      <div class="ft-page">
        <div class="ft-sub-page">Page 1 / Sub Page 1</div>
        <div class="ft-sub-page">Page 1 / Sub Page 2</div>
      </div>
    </div>
    
Every single sub page is a full page view - or a single slide if you prefer - and it's a relative formatting context.
Even if you have only single slides ordered in a row you have to nest the sub pages in pages; take a look at this markup which creates two slides one aside the other:

    <div class="flowtime">
      <div class="ft-page">
        <div class="ft-sub-page">Page 1 / Sub Page 1</div>
      </div>
      <div class="ft-page">
        <div class="ft-sub-page">Page 2 / Sub Page 1</div>
      </div>
    </div>

## Javascript API

Flowtime.js comes with configuration APIs useful for customizing the experience and the installation and with navigation APIs for controlling navigation and get the state of the application.

### Configuration API

`Flowtime.start();`

Starts the application logic. This method is optional but is required if you change some configuration parameters.
If you does'n call the `start()` method Flowtime.js starts itself but some configuration parameters will be applied only after the first navigation action.

`Flowtime.updateNavigation();`

Force the update of the navigation object which stores the data about every possibile destination in the site (the sub pages).
If you change the number of sub pages at runtime call this method after the DOM manipulation.

`Flowtime.prevPage([Boolean top]);` and `Flowtime.nextPage([Boolean top]);`

Navigate to the previous or the next section.
If the optional `top` parameter is `true` the section starts at the first page; if the `top` parameter is `false` the section starts at the page with the same index than the previous section or, if the index does not exist, at the last page available.

`Flowtime.prev([Boolean jump]);` and `Flowtime.next([Boolean jump]);`

Navigate to the previous or the next page or, if there are fragments, to the previous or next fragment.
If the `jump` parameter is `true` all the fragments will be jumped.

`Flowtime.prevFragment();` and `Flowtime.nextFragment();`

Navigate to the previous or the next fragment.



		gotoPage: _gotoPage,
		toggleOverview: _toggleOverview,
		fragmentsOnSide: _setFragmentsOnSide,
		showFragmentsOnBack: _setShowFragmentsOnBack,
		useHistory: _setUseHistory,
		slideWithPx: _setSlideWithPx,
		useOverviewVariant: _setUseOverviewVariant,
		twoStepsSlide: _setTwoStepsSlide,
		showProgress: _setShowProgress
