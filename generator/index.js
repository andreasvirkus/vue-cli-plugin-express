const insert = require('./insert')
const remove = require('./remove')

module.exports = (api, opts, rootOpts) => {
  const dependencies = {
    'express': '^4.16.3',
    'helmet': '^3.12.0',
    'helmet-csp': '^2.7.0',
  }
  const devDependencies = {
    'nodemon': '^1.17.1'
  }
  const scripts = {
    // TODO: Append this into the existing dev script (vue-cli-service serve)
    'develop-server': 'nodemon server --exec babel-node',
    // TODO: Add dist-server to template's/project's gitignore
    'serve-server': 'node dist-server',
    // TODO: Append this into the existing build script
    'build-server': 'rm -rf build && mkdir build && babel -d dist-server server -s'
  }

  const pkg = {
    dependencies,
    devDependencies,
    scripts
  }

  api.extendPackage(pkg)
  api.render('./templates/default', { ...opts })

  api.onCreateComplete(() => {
    const middlewareInstallationLine = /^\/\/ #|middleware|#/
    const filePath = api.resolve('./server/index.js')

    // Register the middleware only if the user requests it
    if (opts.useMiddleware) {
      const middlewareImport = `\nimport { ${opts.middlewareChoice} } as ApiRouter } from 'service-controllers'\n`
      const routerInstallation = `
// Load API routes
app.use('/api', ApiRouter())\n`

      insert(middlewareImport, filePath, /^import/)
      insert(routerInstallation, filePath, middlewareInstallationLine)
    }

    // Remove the middleware placeholder comment
    remove(filePath, middlewareInstallationLine)
  })

}
