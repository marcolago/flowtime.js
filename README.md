![Flowtime.js](https://github.com/marcolago/flowtime.js/raw/master/assets/img/logo-black.png "Flowtime.js Logo")

### Flowtime.js is a framework for easily build HTML presentations or websites.  

You can take a look at the [sample presentation](http://flowtime-js.marcolago.com) to quick learn about the possibilities:

**For more information check the [wiki](https://github.com/marcolago/flowtime.js/wiki)**
- [Browser Support](https://github.com/marcolago/flowtime.js/wiki/Browser-Support)
- [Made with Flowtime.js](https://github.com/marcolago/flowtime.js/wiki/Made-With-Flowtime.js)
- [Credits and Thanks](https://github.com/marcolago/flowtime.js/wiki/Credits-and-Thanks)

## Main Features

**Full Page Fluid Layout Boilerplate**.  
Flowtime.js is designed to perfectly fit your viewport and is based on a solid `display: inline-block;` foundation.  
This frameworks doesn't style your presentations or sites for you but it takes care of all the annoying things like navigation and deep-linking, so you are free to style every single element of your design as you like.
But for the ones who need a ready-to-use tool it comes with a default theme that you can edit or you can add new themes just by linking your css files.

**Multiple Controls Navigation**.  
You can navigate through pages via links, keyboard or deep-linking.  
Links are managed using the href value targeting a formatted hash destination; see the demos source code for more examples.  
Keyboard navigation is based on arrow keys with the Shift key as a modifier to jump over fragments or sections, see the command list:

- **Down or Up Arrows**: navigate to the previous or the next page. This is the main navigation input; the entire content is navigable using this keys only. If there are fragments in the page every input shows or hides a fragment.
- **Shift + Down or Up Arrows**: navigate to the prev o next page jumping all the fragments.
- **Left or Right Arrows**: navigate to the prev or next section. By default the destination will be the page at the same index of the starting point (if you are at page 3 in the section 2 you will go to the page 3 in the section 3). If the same index does not exist the destination will be the higher available index..
- **Shift + Left or Right Arrows**: Navigate to the first page of the previous or next section.
- **Page Up**: navigates to the first page of the current section.
- **Page Down**: navigates to the last page of the current section.
- **Home**: navigates to the first page of the presentation.
- **End**: navigates to the last page of the presentation.
- **ESC**: toggles the overview mode.

**Fragments Support**.  
Navigate step by step in a page or jump directly to the next or previous page.  
You can hide or show every single fragment with special behaviour managed and styled by CSS classes and you can even nest fragments.

**Overview Mode**.  
Overview mode allows you to look at the entire site/presentation structure in a single view or from a distant point of view (alternate version).
When in overview mode you can navigate to a page by click on it or using the arrow keys and **then press Return to go**.

**History Management**.  
Flowtime.js is built on top of the **HTML History APIs** so you can navigate using the browser's back and forward buttons and deep-link a page for sharing.
Flowtime.js is a client side only framework so if you want to optimize SEO you have to add a server side logic to serve only the single page content to search engines.
If the History APIs were not available the framework degrades well using the hashchange event.

**Transitions**.  
Flowtime.js animate the page transition using **native CSS3 transitions**. Where transitions were not available (IE9) the page change is immediate but works.

**Parallax Support**
Integrated native parallax support based on CSS3 transformations and configurable by data- attributes.

**Browser Support**
Flowtime.js is tested and works on **every modern desktop browser and IE9 and above**.  
Where the basic support is not available the framework degrades to a native scrolling with anchor links but the full page fluid layouts remains intact.

## How to build the markup

Markup for Flowtime.js is really simple and easy to learn.
All you have to do is wrap some divs in a parent `<div class="flowtime">`, then, marking up the section with `class="ft-section"` and the single page with `class="ft-page"`.
To better understand the markup take a look at this snippet:

```html
    <div class="flowtime">
      <div class="ft-section">
        <div class="ft-page">Section 1 / Page 1</div>
        <div class="ft-page">Section 1 / Page 2</div>
      </div>
    </div>
```

Every single page is a full window view - or a single slide if you prefer - and it's a relative formatting context.
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

Flowtime.js sets automatically the title in the browser's tab on navigation reading it from the first `h1` on the page. If you want to override a title or use a different string instead of the heading content you can set a `data-title` attribute to the page.
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

If you want to delay the showing and navigate single parts in a page just put the class `ft-fragment` on the element you want to delay. Here it is an example.

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
The `step` class partially fades out a fragment when the next one is selected; for example: `<p class="ft-fragment step">`  
The `shy` class completely hides a fragment when it lose the focus; for example: `<p class="ft-fragment shy">`

### Parallax

If you want to enable the parallax effect on some elements add a `parallax` class to these elements and, optionally, sets the parallax distance value adding a `data-parallax` attribute specifying the `x` and `y` values separated by a comma. If you doesn't specify a `data-parallax` attribute will be used the default lengths.

```html
    <div class="flowtime">
      <div class="ft-section" data-id="section-1">
        <div class="ft-page" data-id="page-1">
            <p class="parallax">Parallaxed element. Will use the default lengths.</p>
            <p class="parallax" data-parallax="100,150">Parallaxed element. Will use the data-parallax attribute values.</p>
            <p class="parallax" data-parallax="200">Parallaxed element. Will use the data-parallax attribute value; x and y will be the same length.</p>
        </div>
      </div>
    </div>
```

## Javascript API

Flowtime.js comes with configuration APIs useful for customizing the experience and the installation and with navigation APIs for controlling navigation and get the state of the application.

### Configuration API

```javascript
Flowtime.start();
```

Starts the application logic. This method is optional but is required if you change some configuration parameters.
If you does'n call the `start()` method Flowtime.js starts itself but some configuration parameters will be applied only after the first navigation action.  
You can pass as optional parameters the same parameters that are accepted by the `gotoPage` method (see below) to let the presentation navigating to a specific page at start.

```javascript
Flowtime.updateNavigation();
```

Force the update of the navigation object which stores the data about every possibile destination in the site (the sub pages).
If you change the number of sub pages at runtime call this method after the DOM manipulation.

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

Default `false`. Enable the fragments navigation also on section navigation (left and right arrows) and no only on page navigation.
If true it also set `fragmentsOnBack` on `true`.

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
Flowtime.sectionsSlideToTop(Boolean toTop);
```

Default `true`. Set to false if you want to customize the fragment animation with a more complex behaviour. This methd enables or disables the animation only and not the internal fragments counter logic. See the event section for more info on how manage a custom fragment navigation.

```javascript
Flowtime.gridNavigation(Boolean useGrid);
```

Default `false`. Just a proxy for `Flowtime.sectionsSlideToTop` but with reversed value; if `true` sets `Flowtime.sectionsSlideToTop` to `False`. Implemented just because the more semantic and easy to understand naming.

```javascript
Flowtime.useOverviewVariant(Boolean true);
```

Default `false`. Uses a built in overview variant which does not show all the pages in a single view but center the current page in the available space scroualtirlling the view when navigating with the arrows.
In Webkit browsers the default overview mode can cause rendering problems if the pages are too much; using the variant you can minimize the problem.

```javascript
Flowtime.defaultParallaxValues(Number x, [Number y]);
```

Sets the default values for parallax elements so you doesn't have to set the values for every single element.  
If you only pass the `x` value the `y` value will be the same.

```javascript
Flowtime.parallaxInPx(Boolean usePx);
```

Default `false`. By default all the parallax length are computed in % units. If true the lenght expressed in `defaultParallaxValues` and in `data-parallax` attributes will be computed in pixels.

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
If the optional `back` paramerter is `true` toggling the overview mode when in overview does not navigate to the highlighted page but will returns to the active page; default `false`.

### Events

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
         -o-transition: all 0.3s cubic-bezier(.77, .10, .22, 1);
        -ms-transition: all 0.3s cubic-bezier(.77, .10, .22, 1);
       -moz-transition: all 0.3s cubic-bezier(.77, .10, .22, 1);
    -webkit-transition: all 0.3s cubic-bezier(.77, .10, .22, 1);
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
       -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    width: 1rem;
    height: 0.7rem;
    margin-right: 1px;
    margin-bottom: 1px;
    background-color: rgba(0,0,0,0.7);
    cursor: pointer;
         -o-transition: background-color 0.5s;
        -ms-transition: background-color 0.5s;
       -moz-transition: background-color 0.5s;
    -webkit-transition: background-color 0.5s;
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
