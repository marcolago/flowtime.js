# Flowtime.js

Flowtime.js is a framework to easily build HTML presentations or websites.

You can take a look at some demos to quick learn about the possibilities:
- [Basic demo](http://marcolago.com/flowtime-js/demo/)
- [Candy demo - same as Basic demo but more eye candy](http://marcolago.com/flowtime-js/demo-candy/)
- [Skyline demo - same as Basic demo but with different vertical-align](http://marcolago.com/flowtime-js/demo-skyline/)

## Main Features

**Full page fluid layout**.  
Flowtime.js is designed to perfectly fit your viewport and is based on a solid `display: inline-block;` technique.

**Multiple controlled navigation**.  
You can navigate through pages via links, keyboard or deep-linking.  
Links are managed using the href value targeting a formatted hash destination; see the demos source code for an example.  
Keyboard navigation is based on arrow keys with the Shift key as a modifier to jump over fragments or sections, see the command list:

- **Down or Up Arrows**: navigate to the previous or the next page. This is the main navigation input; the entire content is navigable using this keys only. If there are fragments in the page every input shows or hides a fragment.
- ** Shift + Down or Up Arrows**: navigate to the prev o next page jumping all the fragments.
- **Left or Right Arrows**: navigate to the prev or next section. By default the destination will be the page at the same index of the starting point (if you are at page 3 in the section 2 you will go to the page 3 in the section 3). If the same index does not exist the destination will be the higher available index..
- **Shift + Left or Right Arrows**: Navigate to the first page of the previous or next section.
- **ESC**: toggles the overview mode.

**Overview Mode**.  
Overview mode allows you to look at the entire site/presentation structure in a single view or from a distant point of view (alternate version).
When in overview mode you can navigate to a page by click on it or using the arrow keys and **then press Return to go**.

**History Management**.  
Flowtime.js is built on top of the **HTML History APIs** so you can navigate using the browser's back and forward buttons and deep-link a page for sharing.
Flowtime.js is a client side only framework so if you want to optimize SEO you have to add a server side logic to serve only the single page content to search engines.
If the History APIs were not available the framework degrades well using the hashchange event.

**Transitions**.  
Flowtime.js animate the page transition using **native CSS3 transitions**. Where transitions were not available (IE9) the page change is immediate but works.

**Browser Support**
Flowtime.js is tested and works on **every modern desktop browser and IE9 and above**.  
Where the basic support is not available the framework degrades to a native scrolling with anchor links but the full page fluid layouts remains intact.

## How to build the markup

Markup for Flowtime.js is really simple and easy to learn.
All you have to do is wrap some divs in a parent `<div class="flowtime">`, then, marking up the section with `class="ft-section"` and the single page with `class="ft-page"`.
To better understand the markup take a look at this snippet:

    <div class="flowtime">
      <div class="ft-section">
        <div class="ft-page">Section 1 / Page 1</div>
        <div class="ft-page">Section 1 / Page 2</div>
      </div>
    </div>
    
Every single page is a full window view - or a single slide if you prefer - and it's a relative formatting context.
Even if you have only single slides ordered in a row you have to nest the pages in sections; take a look at this markup which creates two slides one aside the other:

    <div class="flowtime">
      <div class="ft-section">
        <div class="ft-page">Section 1 / Page 1</div>
      </div>
      <div class="ft-page">
        <div class="ft-page">Section 2 / Page 1</div>
      </div>
    </div>
    
### Titles and Pages URL

Flowtime.js adds automatically a `data-prog` attribute to every div marked as `ft-section` or as `ft-page` in order to manage the navigation.
By default page title and URL will be numeric indexes.  
If you want to customize URL and title you can add some data attributes to any section or page.
You can add the `data-title` attribute both to `ft-section` and to `ft-page` elements; if a `data-title` attribute was found it will be used to write the title in the browser tab.
You can add the `data-id` attribute both to `ft-section` and to `ft-page` elements; if this attribute was found it will be used to build the page URL.
To better understand the use of data attributes here it is an example:

    <div class="flowtime">
      <div class="ft-section" data-title="Section 1 Title" data-id="section-1">
        <div class="ft-page" data-title="Page 1 Title" data-id="page-1">
            When navigating to this page the title will be [site name] | Section 1 Title | Page 1 Title
            and the URL will be http://[site URL]/#/section-1/page-1/
        </div>
      </div>
      <div class="ft-section"data-id="section-2">
        <div class="ft-page" data-title="Page Title" data-id="page-1">
            When navigating to this page the title will be [site name] | Page Title
            and the URL will be http://[site URL]/#/section-2/page-1/
        </div>
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

`Flowtime.showProgress(Boolean show);`

Default `false`. Show the default progress when in page mode (the standard content navigation mode).
The default progress is a miniature of the structure placed in the lower left corner with the current page highlighted.
Clicking on a page thumb in the default progress indicator triggers the navigation to that page.
The default value is false, so if you wanto to show the progress you have to call `Flowtime.showProgress(true);` and then start the presentation.
Calling this API during the navigation cause the progress to appear or disappear manipulating the DOM so watch out for performance issues.
You are not limited to the default progress indicator. If you want to buil your own progress bar or another indicator with a custom logic you can listen for the navigation events and use the event properties (check out the event section).

`Flowtime.fragmentsOnSide(Boolean show);`

Default `false`. Enable the fragments navigation also on section navigation (left and right arrows) and no only on page navigation.
If true it also enable `showFragmentsOnBack`.

`Flowtime.showFragmentsOnBack(Boolean show);`

Default `false`. Shows the fragments when navigating back from a section to a page with fragments inside. The default behaviour (false) hide all fragments when navigating to a page from a higher section index.

`Flowtime.useHistory(Boolean use);`

Default `true`. Enable or disable the use of HTML History API;
If History API is not used Flowtime.js fallbacks on the hashchange event.

`Flowtime.slideInPx(Boolean usePx);`

Default `false`. If true performs the calculation for the container translation in pixels and not in % values.
Use true if you want to alter the default placement of the sections (i.e. setting `vertical-align` different from `top`) or in any case the pages does not perfectly fit the viewport (i.e. Safari for Windows with the `font-size: 0;` bug).

`Flowtime.sectionsSlideToTop(Boolean toTop);`
Default `false`. If true when navigating by sections (left or right arrows) the target page will be the first of the new section.

`Flowtime.useOverviewVariant(Boolean true);`

Default `false`. Uses a built in overview variant which does not show all the pages in a single view but center the current page in the available space scrilling the view when navigating with the arrows.
In Webkit browsers the default overview mode can cause rendering problems if the pages are too much; using the variant you can minimize the problem.

### Navigation API

`Flowtime.prevSection([Boolean top]);` and `Flowtime.nextSection([Boolean top]);`

Navigate to the previous or the next section.
If the optional `top` parameter is `true` the section starts at the first page; if the `top` parameter is `false` the section starts at the page with the same index than the previous section or, if the index does not exist, at the last page available.

`Flowtime.prev([Boolean jump]);` and `Flowtime.next([Boolean jump]);`

Navigate to the previous or the next page or, if there are fragments, to the previous or next fragment.
If the `jump` parameter is `true` all the fragments will be jumped.

`Flowtime.prevFragment();` and `Flowtime.nextFragment();`

Navigate to the previous or the next fragment.

`Flowtime.gotoPage(Number sectionIndex, Number pageIndex)`

Navigate to the section/page pair.

`Flowtime.gotoPage(String sectionId, String pageId)`

Navigate to the section/page pair.

`Flowtime.gotoPage(HTMLElement target)`

Navigate to the page element.

`Flowtime.toggleOverview();`

Toggles the overview mode switching between overview and page mode.
Toggling the overview mode when in overview does not navigate to the highlighted page.

