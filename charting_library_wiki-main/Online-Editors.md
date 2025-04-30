## :warning: WARNING :warning:

### Our documentation has moved to a [new site](https://www.tradingview.com/charting-library-docs/)

You can find the corresponding page here: [Using the library with online code playgrounds
](https://www.tradingview.com/charting-library-docs/latest/getting_started/Online-Editors)

---

<br/>
<br/>

# Using the library with online code playgrounds

It is possible to use our hosted Charting Library bundles on a few select code
playground / online editors (such as JSFiddle). This document provides guidance
on how to correctly configure the library for these sites when using our hosted
library files. Please see the [starter templates](#starter-templates) below to
get started quickly with a working example which you can use to create your own
examples, produce bug reproductions, or experiment with the library.

- See
  [Hosting Library Cross Origin](https://github.com/tradingview/charting_library/wiki/Hosting-Library-Cross-Origin)
  for more information on how to use the library when the html page and the
  library bundles aren't on the same origin.

## How to setup

The latest version of the libraries are hosted on the following domains:

- `https://charting-library.tradingview-widget.com`
- `https://trading-terminal.tradingview-widget.com`

1. Select one of the domains listed above depending on whether you are creating
   an example for the Charting Library or the Trading Terminal. The following
   steps will use the `https://charting-library.tradingview-widget.com` domain.
2. Within the head of your html file you can load the standalone versions of the
   library and the demo data-feed implementation with the following script tags:

   ```html
   <script
      type="text/javascript"
      src="https://charting-library.tradingview-widget.com/charting_library/charting_library.standalone.js"
   ></script>
   <script
      type="text/javascript"
      src="https://charting-library.tradingview-widget.com/datafeeds/udf/dist/bundle.js"
   ></script>
   ```

3. The `library_path` property in the widget constructor options should be set
   to `charting_library` sub folder of the domain of choice, for example:

   ```js
   library_path: 'https://charting-library.tradingview-widget.com/charting_library/',
   ```

## Supported sites

Currently, the use of the hosted library files is only supported on the
following sites:

- [JSFiddle](https://jsfiddle.net)
- [Glitch](https://glitch.com)
- [Codepen](https://codepen.io)

Attempting to use the library files hosted by `tradingview-widget.com` on any
other origin will result in a CORS error which will prevent the chart from
loading correctly.

## Note

- The library files hosted by `tradingview-widget.com` will always be the latest
  version available on the
  [charting_library GitHub repo](https://github.com/tradingview/charting_library)
  (`master` branch). If you would like to use a specific version then you
  should rather link to your hosted library files (and ensure that your server
  allows CORS for the code playground site of your choice).
- Please note that
  the [demo charts and study template storage server](https://github.com/tradingview/charting_library/wiki/Saving-and-Loading-Charts#using-demo-charts-and-study-templates-storage) (`http://saveload.tradingview.com`)
  isn't compatible with requests from any origin
  except `localhost` and `tradingview.com`. Attempting to use this server from
  any other origin will still result in a CORS error.
- When specifying a custom css file via the
  [`custom_css_url`](https://github.com/tradingview/charting_library/wiki/Widget-Constructor#custom_css_url)
  widget constructor option, be aware that the css url should be specified
  relative to the
  [`library_path`](https://github.com/tradingview/charting_library/wiki/Widget-Constructor#library_path)
  option. Have a look at the
  [Themed Charting Library](https://glitch.com/edit/#!/charting-library-themed-starter)
  example for a working example.

## Starter templates

Use one of the templates provided below to get started with a working example.
You can 'fork' or 'remix' these templates to create your own examples and allow
editing which can be saved and shared with others.

### JSFiddle

- [Charting Library](https://jsfiddle.net/TradingView/8301r7nc/)
- [Trading Terminal](https://jsfiddle.net/TradingView/60vemsp8/)
- [Themed Charting Library](https://jsfiddle.net/TradingView/v8x1hsdf/)
  - Note that this starter template has the custom CSS defined within the JS
    which is loaded via a blob URL. This is due to a restriction on additional
    files with JSFiddles.

### Glitch

- [Charting Library](https://glitch.com/edit/#!/charting-library-starter)
- [Trading Terminal](https://glitch.com/edit/#!/trading-terminal-starter)
- [Themed Charting Library](https://glitch.com/edit/#!/charting-library-themed-starter)
