const replacePath = _path => (_path === `/` ? _path : _path.replace(/\/$|$/, `/`))

const defaultOptions = {
  excludedPaths: [`/404.html`]
}

exports.onCreatePage = ({ page, actions }, pluginOptions) => {
  const { createPage, deletePage } = actions
  const options = { ...defaultOptions, ...pluginOptions }

  if(!options.excludedPaths.includes(page.path)) {
    const oldPage = Object.assign({}, page)
    page.path = replacePath(page.path)
    if (page.path !== oldPage.path) {
      deletePage(oldPage)
      createPage(page)
    }
  }
}
