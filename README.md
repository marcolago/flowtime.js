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

Flowtime comes with configuration APIs useful for customizing the experience and the installation and with navigation APIs for controlling navigation and get the state of the application.
