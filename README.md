# gatsby-plugin-force-trailing-slashes

This plugin forces trailing slashes from your project's paths. For
example, `yoursite.com/about` becomes `yoursite.com/about/`.

## Usage

Install:

```
npm install --save-dev gatsby-plugin-force-trailing-slashes
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

You can optionally provide additional paths to exclude from having being changed.

```js
  plugins: [
    {
      resolve: `gatsby-plugin-force-trailing-slashes`,
      options: {
        excludedPaths: [`/404.html`, `/my-dedicated-route`],
      },
    },
  ]

## Requirements

Requires Gatsby v2