const loger = (req, res, next) => {
	console.log(req.method)
	console.log(req.path)
	console.log(req.body)
	console.log("______________")
	next()
}

module.exports = loger
