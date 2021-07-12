![Flowtime.js](https://github.com/marcolago/flowtime.js/raw/master/assets/img/logo-black.png "Flowtime.js Logo")

## Flowtime.js is a framework for easily building HTML presentations or An Amazing Website.

### Documentation and Examples and much more information

Read the [Documentation](https://github.com/marcolago/flowtime.js/blob/master/documentation.md) to discover how to use and customize your installation of Flowtime.js.

You can take a look at the [sample presentation](http://marcolago.github.io/flowtime.js/) and to the [examples folder](https://github.com/marcolago/flowtime.js/tree/master/examples) to learn about the possibilities.

**For more information check the [wiki](https://github.com/marcolago/flowtime.js/wiki)**
- [Browser Support](https://github.com/marcolago/flowtime.js/wiki/Browser-Support)
- [Made with Flowtime.js](https://github.com/marcolago/flowtime.js/wiki/Made-With-Flowtime.js)
- [Credits and Thanks](https://github.com/marcolago/flowtime.js/wiki/Credits-and-Thanks)

### If You Find Flowtime.js Useful

If you used Flowtime.js to build a website, a webapp or a presentation, consider to do one or more of these things.

 - Spread the word.  
 - Let me know where I can see your project (and tell me if I can add to the [Made with Flowtime.js](https://github.com/marcolago/flowtime.js/wiki/Made-With-Flowtime.js) page). 
 - [Open an issue](https://github.com/marcolago/flowtime.js/issues) to report a bug or to request a feature.
 - If you wish to donate (thanks in advance):  
[![paypal](https://www.paypalobjects.com/en_GB/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=9TW923Y3US7LG)

## Main Features

**Full Page Fluid Layout Boilerplate**.
Flowtime.js is designed to perfectly fit your viewport and is based on a solid `display: inline-block;` foundation.
This framework doesn’t style your presentations or sites for you but it takes care of all the annoying things like navigation and deep-linking, so you are free to style every single element of your design as you like.
But for the ones who need a ready-to-use tool it comes with a default theme that you can edit or you can add new themes just by linking your css files.

**Alternate Horizontal Layout**
The default layout has sections arranged side by side horizontally and pages stacked vertically in each section.
You can use the alternate layout with sections stacked vertically and pages arranged horizontally by adding the class `ft-cross` to the Flowtime element in the HTML document.
See [**How to Build the Markup**](https://github.com/marcolago/flowtime.js/blob/master/documentation.md#how-to-build-the-markup) section for an example.

**Multiple Controls Navigation**.
You can navigate through pages via links, keyboard, mouse, gestures or deep-linking.
Links are managed using the href value targeting a formatted hash destination; see the demo's source code for more examples.
Keyboard navigation is based on arrow keys with the Shift key as a modifier to jump over fragments or sections. See the command list below:

- **Down or Up Arrows**: navigate to the next or previous page. This is the main navigation action; the entire content is navigable using these keys only. If there are fragments in the page, every input shows or hides a fragment.
- **Shift + Down or Up Arrows**: navigate to the next or previous page jumping all the fragments.
- **Left or Right Arrows**: navigate to the previous or next section. By default the destination will be the page at the same index of the starting point (if you are at page 3 in the section 2 you will go to the page 3 in the section 3). If the same index does not exist the destination will be the highest available index (see [Section Navigation Options](https://github.com/marcolago/flowtime.js/blob/master/documentation.md#section-navigation-options) for more options).
- **Shift + Left or Right Arrows**: navigate to the first page of the previous or next section.
- **Page Up**: navigates to the first page of the current section.
- **Page Down**: navigates to the last page of the current section.
- **Home**: navigates to the first page of the presentation/website.
- **End**: navigates to the last page of the presentation/website.
- **ESC**: toggles the overview mode.

**Fragments Support**.
It’s possible to navigate fragments step by step in a page or jump directly to the next or previous page.
You can hide or show every single fragment with special behaviour managed and styled by CSS classes, and you can even nest fragments.

**Overview Mode**.
Overview mode allows you to look at the entire site/presentation structure in a single view or from a distant point of view (alternate version).
When in overview mode you can navigate to a page by click on it or using the arrow keys and **then pressing Return key**.

**History Management**.
Flowtime.js is built on top of the **HTML History APIs** so you can navigate using the browser’s back and forward buttons and deep-link a page for sharing.
Flowtime.js is a client side only framework so if you want to do SEO you have to add server side logic to serve only the single page content to search engines.
If the History APIs are not available the framework falls back to the [hashchange](https://developer.mozilla.org/en-US/docs/Web/Events/hashchange) event.

**Transitions**.
Flowtime.js animates the page transition using **native CSS3 transitions**. Where transitions are not available (IE9) the page change will be done immediately but would work as expected.

**Parallax Support**
Integrated native parallax support based on CSS3 transformations and configurable by adding `data-` attributes.

**Browser Support**
Flowtime.js is tested and works on **every modern desktop browser and IE9 and above**.
Where the basic support is not available the framework falls back to the native scrolling with anchor links, but the full page fluid layouts remain intact.

Read the [Documentation](https://github.com/marcolago/flowtime.js/blob/master/documentation.md) to discover how to use and customize your installation of Flowtime.js.
