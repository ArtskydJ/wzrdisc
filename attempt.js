var bundler = require('./wzrd.in/bundler')

var bundle = bundler({
	db: './cdn.db',
	root: './tmp',
})

var opts = {
	module: 'abstract-state-router',
	version: 'latest',
	fullPaths: true
	//subfile: '',
	// debug
	// purge
}

bundle(opts, function (err, bundle) {
	if (err) {
		throw err
	}
	var browserifiedJsString = bundle.bundle
	console.log(browserifiedJsString)
})
