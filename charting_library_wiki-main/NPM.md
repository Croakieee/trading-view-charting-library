## :warning: WARNING :warning:

### Our documentation has moved to a [new site](https://www.tradingview.com/charting-library-docs/)

You can find the corresponding page here: [NPM](https://www.tradingview.com/charting-library-docs/latest/getting_started/NPM)

---

<br/>
<br/>

# NPM

⛔️ This is an experimental feature. Using the library as an NPM dependency only works for recent versions. If in doubt you can check if a package.json file is included in the repository for a commit. For example [version 23.041](https://github.com/tradingview/charting_library/tree/31bd6763dfde5d12ef8527074301cd4990b120b5) does not have a package.json file in the root of the repository, so version 23.041 cannot be used with NPM. ⛔️️

## How to

For now we do not support specifying the library version using a version number. A specific commit hash must be used. You can see [the list of commits on GitHub](https://github.com/tradingview/charting_library/commits/master) to find the appropriate hash.

Add the library to your dependencies in your `package.json` file. For example:

```json
{
  "dependencies": {
    "charting_library": "git@github.com:tradingview/charting_library.git#COMMIT_HASH_HERE"
  }
}
```

Then run `npm install` as usual.

Remember that you will still need to host the static files that the library distributes. They can be found in `node_modules/charting_library/charting_library`.
