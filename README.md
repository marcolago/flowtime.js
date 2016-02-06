![Flowtime.js](https://github.com/marcolago/flowtime.js/raw/master/assets/img/logo-black.png "Flowtime.js Logo")

### Flowtime.js is a framework for easily building HTML presentations or websites.

You can take a look at the [sample presentation](http://marcolago.github.io/flowtime.js/) to quick learn about the possibilities:

**For more information check the [wiki](https://github.com/marcolago/flowtime.js/wiki)**
- [Browser Support](https://github.com/marcolago/flowtime.js/wiki/Browser-Support)
- [Made with Flowtime.js](https://github.com/marcolago/flowtime.js/wiki/Made-With-Flowtime.js)
- [Credits and Thanks](https://github.com/marcolago/flowtime.js/wiki/Credits-and-Thanks)

### If You Find Flowtime.js Useful

If you used Flowtime.js to build a website, a webapp or a presentation, consider to do one or more of these things.

 - Spread the word.  
 - Let me know where I can see your project (and tell me if I can add to the [Made with Flowtime.js](https://github.com/marcolago/flowtime.js/wiki/Made-With-Flowtime.js) page). 
 - [Open an issue](https://github.com/marcolago/flowtime.js/issues) to report a bug or to request a feature.
 - If you wish to donate:  
[![paypal](https://www.paypalobjects.com/en_GB/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=9TW923Y3US7LG)


## Build presentations online with Flowtime.js and SlideCaptain

Flowtime.js is the slide engine used by [SlideCaptain](http://slidecaptain.com/).
If you prefer a WYSIWYG editor or you feel not comfortable with plain HTML you can try [SlideCaptain](http://slidecaptain.com/): a powerful web app for building well-structured presentations in your browser.
SlideCaptain adds many features to Flowtime.js like MathJax™ support and PDF export tool .

SlideCaptain is developed by [Engawa](http://engawa.de/).

## Major Updates

- **May 20 2014**
    - Added new section navigation modifiers. See [Section Navigation Options](#section-navigation-options) for the updates.

- **May 12 2013**
    - Added the autoplay configuration functions and `start()`, `pause()` and `stop()` methods. ([#18](https://github.com/marcolago/flowtime.js/issues/18))
    - Now the presentations is loopable both for page and section navigation. ([#18](https://github.com/marcolago/flowtime.js/issues/18))

- **March 3 2014**
    - Added methods to enable and disable navigation logics at runtime.
    - Added options to get alternative horizontal layout; sections are stacked vertically and pages are arranged horizontally.
    - Added option to reconfigure key bindings for some wireless presenters. ([#15](https://github.com/marcolago/flowtime.js/issues/15))

## Main Features

**Full Page Fluid Layout Boilerplate**.
Flowtime.js is designed to perfectly fit your viewport and is based on a solid `display: inline-block;` foundation.
This frameworks doesn’t style your presentations or sites for you but it takes care of all the annoying things like navigation and deep-linking, so you are free to style every single element of your design as you like.
But for the ones who need a ready-to-use tool it comes with a default theme that you can edit or you can add new themes just by linking your css files.

**Alternate Horizontal Layout**
The default layout has sections arranged side by side horizontally and pages stacked vertically in each section.
You can use the alternate layout with sections stacked vertically and pages arranged horizontally by adding the class `ft-cross` to the Flowtime element in the HTML document.
See **How to Build the Markup** section for an example.

**Multiple Controls Navigation**.
You can navigate through pages via links, keyboard, mouse, gestures or deep-linking.
Links are managed using the href value targeting a formatted hash destination; see the demos source code for more examples.
Keyboard navigation is based on arrow keys with the Shift key as a modifier to jump over fragments or sections, see the command list:

- **Down or Up Arrows**: navigate to the next or previous page. This is the main navigation action; the entire content is navigable using this keys only. If there are fragments in the page every input shows or hides a fragment.
- **Shift + Down or Up Arrows**: navigate to the next or previous page jumping all the fragments.
- **Left or Right Arrows**: navigate to the previous or next section. By default the destination will be the page at the same index of the starting point (if you are at page 3 in the section 2 you will go to the page 3 in the section 3). If the same index does not exist the destination will be the higher available index (see [Section Navigation Options](#section-navigation-options) for more options).
- **Shift + Left or Right Arrows**: navigate to the first page of the previous or next section.
- **Page Up**: navigates to the first page of the current section.
- **Page Down**: navigates to the last page of the current section.
- **Home**: navigates to the first page of the presentation/website.
- **End**: navigates to the last page of the presentation/website.
- **ESC**: toggles the overview mode.

**Fragments Support**.
It’s possibile to navigate fragments step by step in a page or jump directly to the next or previous page.
You can hide or show every single fragment with special behaviour managed and styled by CSS classes, and you can even nest fragments.

**Overview Mode**.
Overview mode allows you to look at the entire site/presentation structure in a single view or from a distant point of view (alternate version).
When in overview mode you can navigate to a page by click on it or using the arrow keys and **then pressing Return key**.

**History Management**.
Flowtime.js is built on top of the **HTML History APIs** so you can navigate using the browser’s back and forward buttons and deep-link a page for sharing.
Flowtime.js is a client side only framework so if you want to optimize SEO you have to add a server side logic to serve only the single page content to search engines.
If the History APIs were not available the framework degrades well using the hashchange event.

**Transitions**.
Flowtime.js animates the page transition using **native CSS3 transitions**. Where transitions were not available (IE9) the page change is immediate but works as expected.

**Parallax Support**
Integrated native parallax support based on CSS3 transformations and configurable by adding `data-` attributes.

**Browser Support**
Flowtime.js is tested and works on **every modern desktop browser and IE9 and above**.
Where the basic support is not available the framework degrades to the native scrolling with anchor links, but the full page fluid layouts remains intact.

## How to Build the Markup

The markup of Flowtime.js is really simple and easy to learn.
All you have to do is wrap some elements in a `<div class="flowtime"> parent. Then create the sections applying `class="ft-section"` and the single pages applying `class="ft-page"`.
To better understand the markup take a look at this snippet:

```html
    <div class="flowtime">
      <div class="ft-section">
        <div class="ft-page">Section 1 / Page 1</div>
        <div class="ft-page">Section 1 / Page 2</div>
      </div>
    </div>
```

If you want to use the alternate layout you have to add the class `ft-cross`to the Flowtime element and Flowtime.js takes care of the rest:

```html
    <div class="flowtime ft-cross">
      <div class="ft-section">
        <div class="ft-page">Section 1 / Page 1</div>
        <div class="ft-page">Section 1 / Page 2</div>
      </div>
    </div>
```

Every single page is a full window view—or a single slide if you prefer—and it’s a relative formatting context.
Even if you have only single slides ordered in a row you have to nest the pages in sections; take a look at this markup which creates two slides one aside the other:

```html
    <div class="flowtime">
      <div class="ft-section">
        <div class="ft-page">Section 1 / Page 1</div>
      </div>
      <div class="ft-section">
        <div class="ft-page">Section 2 / Page 1</div>
      </div>
    </div>
```

### Titles and Pages URL

Flowtime.js automatically sets the title in the browser’s tab on navigation reading it from the first `h1` on the page. If you want to override a title, or use a different string instead of the heading content, you can set a `data-title` attribute to the page.
You can add the `data-title` attribute both to `ft-section` and to `ft-page` elements; if a `data-title` attribute was found on a section it will be used to write the title in the browser tab with this schema:

`<title> text content [ | data-title on ft-section ] | h1 text content or data-title on ft-page`

A `data-prog` attribute is added to every div marked as `ft-section` or as `ft-page` in order to manage the navigation.
If you want to customize the URL and the hashtag you can add some data attributes to any section or page.
You can add the `data-id` attribute both to `ft-section` and to `ft-page` elements; if this attribute was found it will be used to build the page URL.
To better understand the use of data attributes here it is an example:

```html
    <div class="flowtime">
      <div class="ft-section" data-id="section-1">
        <div class="ft-page" data-id="page-1">
            <h1>Heading Title</h1>
            When navigating to this page the title will be "site name | Heading Title"
            and the URL will be "http://site_URL/#/section-1/page-1/"
        </div>
      </div>
      <div class="ft-section" data-title="Section 2 Title" data-id="section-2">
        <div class="ft-page" data-title="Page 1 Title" data-id="page-1">
            When navigating to this page the title will be "site name | Section 2 Title | Page 1 Title"
            and the URL will be "http://site_URL/#/section-2/page-1/"
        </div>
      </div>
      <div class="ft-section"data-id="section-3">
        <div class="ft-page" data-title="Page Title" data-id="page-1">
            When navigating to this page the title will be "site name | Page Title"
            and the URL will be "http://site_URL/#/section-3/page-1/"
        </div>
      </div>
    </div>
```

### Fragments

If you want to reveal single elements of a page just add the class `ft-fragment` on the elements you want to discover step by step. Here it is an example.

```html
    <div class="flowtime">
      <div class="ft-section" data-title="Section 1 Title" data-id="section-1">
        <div class="ft-page" data-title="Page 1 Title" data-id="page-1">
            <p>First Paragraph; this text is visible from start.</p>
            <p class="ft-fragment">This paragraph shows up only when you navigate forward and disappears when you navigate back.</p>
        </div>
      </div>
    </div>
```

You can also add some classes to trigger special behaviours for fragments.
The `step` class partially fades out a fragment when the next one is selected; use: `<p class="ft-fragment step">`
The `shy` class completely hides a fragment when it lose the focus; use: `<p class="ft-fragment shy">`

### Parallax

If you want to enable the parallax effect on some elements add a `parallax` class to these elements and, optionally, sets the parallax distance value adding a `data-parallax` attribute specifying the `x` and `y` values separated by a comma. If you doesn˙t specify a `data-parallax` attribute will be used the default lengths.

```html
    <div class="flowtime">
      <div class="ft-section" data-id="section-1">
        <div class="ft-page" data-id="page-1">
            <p class="parallax">Parallaxed element. Will use the default lengths.</p>
            <p class="parallax" data-parallax="100,150">Parallaxed element. Will use the `data-parallax` attribute values.</p>
            <p class="parallax" data-parallax="200">Parallaxed element. Will use the `data-parallax` attribute value; x and y will be the same length.</p>
        </div>
      </div>
    </div>
```

## Javascript API

Flowtime.js has a lot of useful **configuration APIs**, for customizing the experience and the installation, and **navigation APIs**, for controlling navigation and get the state of the application.

### Configuration API

```javascript
Flowtime.start();
```

Starts the application logic with custom options. Calling this method is optional (but highly reccommended) unless you change some configuration parameters.
If you doesn’t call the `start()` method Flowtime.js starts itself but some configuration parameters will be applied only after the first navigation action.
You can pass as optional parameters the same parameters that are accepted by the `gotoPage` method (see below) to let the presentation navigating to a specific page at start.

```javascript
Flowtime.updateNavigation(Boolean fireEvent);
```

Force the update of the navigation object which stores the data about every possibile destination in the site (the sub pages).
If you change the number of sub pages at runtime call this method after the DOM manipulation.
When you update the navigation the `navigationevent` is fired. If you do not want to fire the event (or call the navigation callback) just pass `false` as a value.

```javascript
Flowtime.showProgress(Boolean show);
```

Default `false`. Show the default progress when in page mode (the standard content navigation mode).
The default progress is a miniature of the structure placed in the lower left corner with the current page highlighted.
Clicking on a page thumb in the default progress indicator triggers the navigation to that page.
The default value is false, so if you wanto to show the progress you have to call `Flowtime.showProgress(true);` and then start the presentation.
Calling this API during the navigation cause the progress to appear or disappear manipulating the DOM so watch out for performance issues.
You are not limited to the default progress indicator. If you want to buil your own progress bar or another indicator with a custom logic you can listen for the navigation events and use the event properties (check out the event section).

```javascript
Flowtime.fragmentsOnSide(Boolean show);
```

Default `false`. Enable the fragments navigation also on section navigation (left and right arrows) and not only on page navigation.
If true it also set `fragmentsOnBack` to `true`.

```javascript
Flowtime.fragmentsOnBack(Boolean show);
```

Default `true`. Shows or hide the fragments when navigating back from a section to a page with fragments inside.

```javascript
Flowtime.useHistory(Boolean use);
```

Default `true`. Enable or disable the use of HTML History API;
If History API is not used Flowtime.js fallbacks on the hashchange event.

```javascript
Flowtime.slideInPx(Boolean usePx);
```

Default `false`. If true performs the calculation for the container translation in pixels and not in % values.
Use true if you want to alter the default placement of the sections (i.e. setting `vertical-align` different from `top`) or in any case the pages does not perfectly fit the viewport (i.e. Safari for Windows with the `font-size: 0;` bug).

```javascript
Flowtime.useOverviewVariant(Boolean use);
```

Default `false`. Uses a built in overview variant which does not show all the pages in a single view but center the current page in the available space scroualtirlling the view when navigating with the arrows.
In Webkit browsers the default overview mode can cause rendering problems if the pages are too much; using the variant you can minimize the problem.

```javascript
Flowtime.defaultParallaxValues(Number x, [Number y]);
```

Sets the default values for parallax elements so you doesn’t have to set the values for every single element.
If you only pass the `x` value the `y` value will be the same.

```javascript
Flowtime.parallaxInPx(Boolean usePx);
```

Default `false`. By default all the parallax length are computed in % units. If true the lenght expressed in `defaultParallaxValues` and in `data-parallax` attributes will be computed in pixels.

```javascript
Flowtime.autoplay(Boolean status, [Number delay], [Boolean autostart], [Boolean skipFragments]);
```

Sets the status of the autoplay feature.
`status` parameter sets the autoplay flag to `true` or `false`, if `true` you can use `play()` and `pause()` functions to start and stop the autoplay.
`delay` sets the time between the page navigation in milliseconds; the default value is 10 seconds (10000 milliseconds).
If `autostart` is `true` the autoplay feature starts just right after this call (default `true`).
`skipFragments` allows to go to the next page skipping all the fragments on the page (default `false`).

```javascript
Flowtime.loop(Boolean loop);
```

Default `false`. If true you can loop the navigation both for the sections and for the pages so you can back to the start of the presentation navigating forward from the last page.

```javascript```
Flowtime.clicker(Boolean clicker);
```

If passed `true` PageUp and PageDown keys are reconfigured to go to the previous and next page instead to the first and the last page of the section.
This option useful if you use some wireless presenter like the Logitech R400; see issue ([#15](https://github.com/marcolago/flowtime.js/issues/15)) for more information.

```javascript```
Flowtime.setCrossDirection(Boolean cross);
```

Force the cross direction layout for sections and pages at runtime.
Pass `true`to use the optional horizontal layout or pass `false` to use the standard vertical layout.
Every related option will be automatically reconfigured.
Related options are keyboard bindings, touchpad and touch gestures and pages coordinates cache.

```javascript
Flowtime.setDebouncingDelay(Number value);
```

Set the debouncing delay time in milliseconds to trigger the event used for the scroll handler.

```javascript
Flowtime.getTransitionTime(Number milliseconds);
```

Get the global navigation transition time in milliseconds.

```javascript
Flowtime.setTransitionTime(Number milliseconds);
```

Set the global navigation transition time in milliseconds. This value overrides the time specified in CSS.

```javascript
Flowtime.setMomentumScrollDelay(Number milliseconds);
```

Set the delay time used to ignore the scrollwheel events fired by the momentum scroll on MacOS.
The default value is 4 times the default transition time.
Tweak this value to fit your needs.

### Section Navigation Options

Flowtime.js comes with a lot of ways to navigate through sections; you can set up your installation with some, simple to use, options to fit your needs.

```javascript
Flowtime.gridNavigation(Boolean value);
```

[Grid Navigation True (default) Demo](http://marcolago.github.io/flowtime.js//examples/section-navigation-options/default/)  
[Grid Navigation False Demo](http://marcolago.github.io/flowtime.js//examples/section-navigation-options/grid-navigation-false/)

Default `true`. The default behaviour out-of-the-box.
When navigating from section to section with left and right arrows (or swipe) you will go to the same page index of the previous or next sections, if available, or to the nearest (highest number) page if the section is shorter.
If you set this to `false` you will ever go to the first page of every section instead.

```javascript
Flowtime.backFromPageToTop(Boolean value);
```

Default `false`. If `true` when navigating to the previous section from the first page of the current section Flowtime.js always goes to the first page of the previous section.

```javascript
Flowtime.nearestPageToTop(Boolean value);
```

[Nearest Page To Top Demo](http://marcolago.github.io/flowtime.js//examples/section-navigation-options/nearest-page-to-top/)

Default `false`. If `true` when navigating to a section that is shorter than the current one Flowtime.js always goes to the first page of the new section.
This does not affect the navigation to sections longer than, or as, the current section.

```javascript
Flowtime.rememberSectionsStatus(Boolean value);
```

[Remember Sections Status Demo](http://marcolago.github.io/flowtime.js//examples/section-navigation-options/remember-sections-status/)

Default `false`. If `true` Flowtime.js will remember the last page visited in every section and, when navigating from section to section, will go to the last page visited for that section.
This setting overrides the `gridNavigation` one only for previously visited sections but use the `gridNavigation` and `nearestPageToTop` values for sections not visited yet.

```javascript
Flowtime.rememberSectionsLastPage(Boolean value);
```

[Remember Sections Last Page Demo](http://marcolago.github.io/flowtime.js//examples/section-navigation-options/remember-sections-last-page/)

Default `false`. If `true` Flowtime.js will remember the last page visited in the last section and stores this value for horizontal navigation purposes. It’s similar to the `gridNavigation(true)` setting but when navigating from a section with less pages to a section with the at least as page as the index stored Flowtime.js goes to the index stored and not to the adjacent page.
This setting overrides the `rememberSectionsStatus` one.

```javascript
Flowtime.scrollTheSection(Boolean value);
```

[Scroll the Section Demo](http://marcolago.github.io/flowtime.js//examples/scroll-the-section/)

Default `false`. If `true` Flowtime.js will scroll only the current section and not the entire Flowtime wrapper. This could improve the performance while scrolling and is a nice effect if the wrapper doen not fill the screen.

```javascript
Flowtime.toSectionsFromPages(Boolean value);
```

Default `true`. If `false` Flowtime.js will prevent next and previous page navigation via keyboard, mouse and scroll or via navigation APIs nextPage and prevPage, to go to the next or previous section.
To go to the next or previous section you have to use section’s navigation options via keyboard, mouse and scroll or via APIs nextSection and prevSection or targeting a specific page.

### Navigation API

```javascript
Flowtime.prevSection([Boolean top]);` and `Flowtime.nextSection([Boolean top]);
```

Navigate to the previous or the next section.
If the optional `top` parameter is `true` the section starts at the first page; if the `top` parameter is `false` the section starts at the page with the same index than the previous section or, if the index does not exist, at the last page available.

```javascript
Flowtime.prev([Boolean jump]);` and `Flowtime.next([Boolean jump]);
```

Navigate to the previous or the next page or, if there are fragments, to the previous or next fragment.
If the optional `jump` parameter is `true` all the fragments will be jumped.

```javascript
Flowtime.prevFragment();` and `Flowtime.nextFragment();
```

Navigate to the previous or the next fragment.

```javascript
Flowtime.gotoHome()
```

Navigate to the first page of the presentation.

```javascript
Flowtime.gotoEnd()
```

Navigate to the last page of the presentation.

```javascript
Flowtime.gotoTop()
```

Navigate to the first page of the current section.

```javascript
Flowtime.gotoBottom()
```

Navigate to the last page of the current section.

```javascript
Flowtime.gotoPage(Number sectionIndex, Number pageIndex)
```

Navigate to the section/page pair.

```javascript
Flowtime.gotoPage(String sectionId, String pageId)
```

Navigate to the section/page pair.

```javascript
Flowtime.gotoPage(HTMLElement target)
```

Navigate to the page element.

```javascript
Flowtime.toggleOverview([Boolean back]);
```

Toggles the overview mode switching between overview and page mode.
If the optional `back` parameter is `true` toggling the overview mode when in overview does not navigate to the highlighted page but will returns to the active page; default `false`.

```javascript
Flowtime.showOverview(Boolean show, [Boolean back]);
```

Sets the overview mode to the given state. See `Flowtime.toggleOverview([Boolean back]);`.

```javascript
Flowtime.play();
```

Starts the autoplay timer with the configured values (see `Flowtime.autoplay()` method) or with the default ones.

```javascript
Flowtime.pause();
```

Pauses the autoplay timer without resetting the delay.

```javascript
Flowtime.stop();
```

Stops the autoplay timer resetting the delay.

### Disabling the Navigation via APIs

You can disable all the navigation logics together or selectively one by one via some API’s methods.

```javascript
Flowtime.enableNavigation(Boolean links, Boolean keyboard, Boolean scroll, Boolean touch);
```

Enables the navigation logic. If you pass `true` for a parameter the navigation will be enabled for that input type.
You can also use the shorthand `Flowtime.enableNavigation();` instead of `Flowtime.enableNavigation(true, true, true, true);`.

```javascript
Flowtime.disableNavigation(Boolean links, Boolean keyboard, Boolean scroll, Boolean touch);
```

Disables the navigation logic. If you pass `true` for a parameter the navigation will be disabled for that input type.
You can also use the shorthand `Flowtime.disableNavigation();` instead of `Flowtime.disableNavigation(true, true, true, true);`.

```javascript
Flowtime.setLinksNavigation(Boolean enable);
```

Enables (`true`) or disables (`false`) the links navigation logic. If you disable the links navigation you will not be able to change slide via anchor links.

```javascript
Flowtime.setKeyboardNavigation(Boolean enable);
```

Enables (`true`) or disables (`false`) the keyboard navigation logic. If you disable the links navigation you will not be able to change slide via arrow keys.

```javascript
Flowtime.setScrollNavigation(Boolean enable);
```

Enables (`true`) or disables (`false`) the links navigation logic. If you disable the links navigation you will not be able to change slide via mouse scrollwheel or trackpad scroll gestures.

```javascript
Flowtime.setTouchNavigation(Boolean enable);
```

Enables (`true`) or disables (`false`) the links navigation logic. If you disable the links navigation you will not be able to change slide via touch swipe gestures.

### Data API

```javascript
Flowtime.getSection();
```

Gets a reference to the current section HTML Element.

```javascript
Flowtime.getPage();
```

Gets a reference to the current page HTML Element.

```javascript
Flowtime.getSectionIndex();
```

Gets the index starting at `0` of the current section.

```javascript
Flowtime.getPageIndex();
```

Gets the index starting at `0` of the current page.

```javascript
Flowtime.getPrevSection();
```

Gets a reference to the previous section HTML Element.

```javascript
Flowtime.getNextSection();
```

Gets a reference to the next section HTML Element.

```javascript
Flowtime.getPrevPage();
```

Gets a reference to the previous page HTML Element.

```javascript
Flowtime.getNextPage();
```

Gets a reference to the next page HTML Element.

### Events and Callback

When navigating Flowtime.js dispatches a `flowtimenavigation` event useful for create custom behaviours and callbacks.
You can register the event using `Flowtime.addEventListener("flowtimenavigation", callback, useCapture);` API.
The callback receive an `event` parameter with some custom properties useful to manage the navigation status.
Here it is the list of the properties, supposing the event parameter is named `e`:

```javascript
e.section
```

The HTMLElement reference to the current section.

```javascript
e.page
```

The HTMLElement reference to the current page.

```javascript
e.sectionIndex
```

The current section index starting at 0.

```javascript
e.pageIndex
```

The current page index starting at 0.

```javascript
e.pastSectionIndex
```

The previous visited section index starting at 0.

```javascript
e.pastPageIndex
```

The previous visited page index starting at 0.

```javascript
e.prevSection
```

Boolean value, if `true` there is a previous section.

```javascript
e.nextSection
```

Boolean value, if `true` there is a next section.

```javascript
e.prevPage
```

Boolean value, if `true` there is a previous page.

```javascript
e.nextPage
```

Boolean value, if `true` there is a next page.

```javascript
e.fragment
```

If the navigation targets a fragment returns the fragment itself as HTMLElement, otherwise returns `undefined`.

```javascript
e.fragmentIndex
```

Returns the index of the current fragment starting at 0; otherwise returns `-1`.

```javascript
e.isOverview
```

Boolean value, `true` if the overview mode is on, `false` if the overview mode is off.

```javascript
e.progress
```

The current page sequential index number starting at 0.

```javascript
e.total
```

The last page sequential index.

```javascript
e.isAutoplay
```

The status of the autoplay feature.

```javascript
e.isLoopable
```

`true` if Flowtime.js is configured for looping.

If you prefer setting a callback instead of register an event to get the navigation data object you can do it with the onNavigation method:

```javascript
Flowtime.onNavigation(callback);
```

`callback` is the function you want to be called every time Flowtime.js navigate.
The callback function receive the same navigation data object as the event handler.

## Customizing and Styling Default Components and Behaviours

As said before Flowtime.js comes with some default components like the two overview variants and a progress indicator.
You can change the way this parts appears editing or overwriting some CSS properties.

### Calculating the Completion Percentage for Custom Visualization

In the `flowtimenavigation` event handler calculate the progress in % using this formula:

```javascript
    function navigationHandler(e)
    {
      var value = Math.round(e.progress * 100 / e.total);
      console.log('Completion: ' + value + '%');
    }
```

The first page of the first section **ever returns 0 as progress value**.
`progress` and `total` values does not consider fragments.

### Customize the Fragments Animation

Every animation in Flowtime.js is managed with native CSS3 transitions so if you would customize the fragment animation (and you want to do this on a website, I know) just edit the following CSS classes to override the transitions or set the default value of the `opacity` to `1`.

```css
  .ft-fragment {
    opacity: 0;
    transition: all 0.3s cubic-bezier(.77, .10, .22, 1);
  }

  .ft-fragment.revealed, .ft-fragment.revealed-temp {
    opacity: 1;
  }

  .ft-overview .ft-default-progress {
    opacity: 0;
    pointer-events: none;
  }
```

### Customize the Look of Pages in Overview Mode

To customize the way the thumbnails in overview mode look when idle, hovered and higlighted edit or override this CSS classes:

```css
  /* default progress page thumb */

  .ft-page-thumb {
    box-sizing: border-box;
    width: 1rem;
    height: 0.7rem;
    margin-right: 1px;
    margin-bottom: 1px;
    background-color: rgba(0,0,0,0.7);
    cursor: pointer;
    transition: background-color 0.5s;
  }

  .ft-page-thumb:hover {
    background-color: rgba(255,255,255,0.7);
  }

  .ft-page-thumb.actual {
    background-color: rgba(255,255,255,0.5);
    border: 1px solid #ffffff;
  }

  /* overview mode page highlighting */

  .ft-overview .ft-page.actual {
    opacity: 0.3;
  }

  .ft-overview .ft-page.hilite {
    opacity: 1;
  }

  .ft-overview .ft-page:hover {
    opacity: 1;
  }
```
