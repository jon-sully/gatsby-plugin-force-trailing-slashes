const replacePath = _path => (_path === `/` ? _path : _path.replace(/\/$|$/, `/`))

const defaultOptions = {
  excludedPaths: [`/404.html`]
}

exports.onCreatePage = ({ page, actions }, pluginOptions) => {
  const { createPage, deletePage } = actions
  const options = { ...defaultOptions, ...pluginOptions }

  return new Promise(resolve => {
    if(!options.excludedPaths.includes(page.path)) {
      const oldPage = Object.assign({}, page)
      page.path = replacePath(page.path)
      if (page.path !== oldPage.path) {
        deletePage(oldPage)
        createPage(page)
      }
    }
    resolve()
  })
}

exports.onPreInit = ({ reporter }) => {
  reporter.warn(
    `gatsby-plugin-force-trailing-slashes: Gatsby now let you configure trailing slash out of the box. See documentation https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/#trailingslash/`
  );
};