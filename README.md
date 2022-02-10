# gatsby-plugin-force-trailing-slashes

### ‼️ HEADS UP:

**This plugin will soon be deprecated**, please use Gatsby's new `trailingSlash` option. Read the [documentation](https://gatsby.dev/trailing-slash) to learn more.

**NO FURTHER UPDATES TO THIS PLUGIN WILL BE SHIPPED**

---

Old:

This plugin is one component of unifying a Gatsby site to _use_ trailing slashes. To correctly configure a Gatsby site to use trailing slashes, you need the following **three** pieces in place:

1. A web-server that treats trailing-slash paths as directories with an `index.html` inside and non-trailing-slash paths as _named documents_ (and ideally redirects directory requests without a trailing slash _to_ the trailing slash variant)
2. This plugin to prepare (at build time) the embedded [`@reach/router`](https://github.com/reach/router) for trailing slash paths
3. All uses of Gatsby's `<Link>` component in your code to intentionally specify a trailing slash.

Once these pieces are in place, everything will be unified: by default, Gatsby generates all static files (except the 404.html) as `index.html` files contained within aptly-named directories, the web-server will redirect non-trailing-slash requests to those directories to the trailing slash variant (correctly reflecting that the user is viewing a directory index), this plugin will ensure that the embedded `@reach/router` expects and uses trailing-slash paths once the client-side PWA is hydrated, and further client-side navigations from using `<Link>` correctly execute navigations using trailing slashes.

## Usage

Install:

```sh
npm i gatsby-plugin-force-trailing-slashes
# or
yarn add gatsby-plugin-force-trailing-slashes
```

Then configure via `gatsby-config.js`.

```js
{
  ...
  plugins: [
    ...,
    `gatsby-plugin-force-trailing-slashes`,
  ]
}
```

### Options

You can optionally provide additional paths to exclude from being changed. By default, `/404.html` will not be changed to use a trailing slash. This follows Gatsby's build sequence.

```js
  plugins: [
    {
      resolve: `gatsby-plugin-force-trailing-slashes`,
      options: {
        excludedPaths: [`/404.html`, `/my-dedicated-route`],
      },
    },
  ]
```

❗**NOTE:**❗️Providing additional paths for excluding from the trailing-slash workflow here does not prevent Gatsby from generating the static HTML contained within named-directories as `index.html`; you will need to configure that build-time behavior to match when adding an `excludedPath` to this plugin. Your static HTML web-server pathing should _always_ match. 

### Troubleshooting

If you're using `gatsby-plugin-offline` make sure place this plugin _after_ the offline one and to modify your offline plugin like so:

```
{
    resolve: 'gatsby-plugin-offline',
    options: {
        navigateFallbackWhitelist: [/\/$/],
    }
}
```

## Requirements

Requires Gatsby v2
