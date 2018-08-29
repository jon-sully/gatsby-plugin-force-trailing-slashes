const _ = require(`lodash`)
const replacePath = _path => (_path === `/` ? _path : _path.replace(/\/$|$/, `/`))

exports.onCreatePage = ({ page, actions }, pluginOptions) => {
  const { createPage, deletePage } = actions
  const options = {
    excludedPaths: [`404.html`]
  }
  const combinedOptions = _.defaults(pluginOptions, options)
  
  return new Promise(resolve => {
    if(!combinedOptions.excludedPaths.includes(page.path)) {
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
