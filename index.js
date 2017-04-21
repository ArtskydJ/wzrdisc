var xhr = require('request') // xhr
var disc = require('disc')

var postBody = {
	dependencies: {
		'disc': 'latest'
	},
	options: {
		fullPaths: true
	}
}
xhr({
	method: 'POST',
	url: 'https://wzrd.in/multi',
	body: postBody,
	json: true,
	headers: {
		'Content-Type': 'application/javascript'
	}
}, function (err, res, body) {
	if (err) throw err

	console.log('got bundle')

	var bundles = [ body['disc'].bundle ]
	disc.bundle(bundles, function (err, html) {
		if (err) throw err

		//document.body.innerHTML = html
		//window.location.replace('#what')
		console.log('writing html')


		require('fs').writeFileSync('temp.html', html, 'utf-8')

	})
})
