var https = require('https')
var crypto = require('crypto')

attemptCompiled({ dependencies: { 'abstract-state-router': 'latest' }, options: { fullPaths: true } })
attemptCompiled({ dependencies: { 'abstract-state-router': 'latest' } })

attemptSite()

function attemptCompiled(opts) {
	var postData = JSON.stringify(opts)

	var reqOpts = {
		hostname: 'wzrd.in',
		path: '/multi',
		method: 'POST',
		headers: {
			'Content-Type': 'application/javascript',
			'Content-Length': Buffer.byteLength(postData)
		}
	}

	var req = https.request(reqOpts, function (res) {
		res.setEncoding('utf-8')
		var response = ''
		res.on('data', chunk => response += chunk)
		res.on('end', () => {
			var bundle = JSON.parse(response)['abstract-state-router'].bundle
			remember(bundle.length + '-' + crypto.createHash('sha256').update(bundle).digest('hex'))
		})
	})

	req.on('error', e => console.error('problem with request: ' + e.message) )

	req.write(postData)
	req.end()
}

var rememberLast = null
function remember(str) {
	if (rememberLast === null) {
		rememberLast = str
	} else {
		var same = rememberLast === str
		var str = 'ASR compiled w/ and w/o fullPaths are ' + (same ? 'identical.' : 'different!')
		console.log(colorize(str, !same))
	}
}

function attemptSite() {
	https.get('https://wzrd.in/index.html', function (res) {
		var body = ''
		res.on('data', buf => body += buf )
		res.on('end', () => {
			var ok = body.includes('fullPaths')
			var str = 'The word "fullPaths" is ' + (ok ? '' : 'not ') + 'on the site.'
			console.log(colorize(str, ok))
		})
	})
}

function colorize(str, ok) {
	// If ok == true, then str is turned green
	// If ok == false, then str is turned red
	return '\033[1;3' + (ok ? '2' : '1') + ';40m' + str + '\033[0m'
}
