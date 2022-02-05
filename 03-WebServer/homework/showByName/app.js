var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor

function readFile(fileName){
    return new Promise((resolve, reject) =>{
        fs.readFile('./images/'+fileName, (err, res) => {
            if(err) reject({
                res: '<h1>No econtramos la imagen!</h1>',
                contentType: 'text/html',
                status: 404
            })
            else resolve({
                res,
                contentType: 'image/jpg',
                status: 200
            })
            
        })
    })
}

http.createServer(function (req, res){
    if(req.url.split('/').pop() === 'favicon.ico') return
    readFile(req.url.split('/',2).pop())
    .then(resp => {
        res.writeHead(resp.status, {'Content-Type': resp.contentType})
        return res.end(resp.res)
    })
    .catch(err => {
        res.writeHead(err.status, {'Content-Type': err.contentType});
        return res.end(err.res);
    })

}).listen(3000, '127.0.0.1')