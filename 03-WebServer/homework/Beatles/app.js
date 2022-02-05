var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://www.latercera.com/resizer/XdMV_V06oKVdxyb6kUcbAAKnzcY=/380x570/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/IRWQK252UZH6DEP4YN73QBTNSA.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"http://az616578.vo.msecnd.net/files/2016/03/09/635931448636931925-692833716_george-harrison-living-in-the-material-world-george-harrison-photo-credit-credit-robert-whitaker-c-apple-corps-ltd-courtesy-of-hbo.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]



http.createServer(function(req, res){

    if(req.url.split('/').pop() !== "favicon.ico") {
    
    if(req.url[0] === '/'){
      console.log(req.url.split('/'))

      if(req.url.length < 2){
        res.writeHead(200, {'Content-Type': 'text/html'})
        var result = fs.readFileSync(__dirname + '\\index.html');
        return res.end(result);
     }

      console.log(req.url.split('/')[1])

      const s = req.url.split('/')[1]
      const b = beatles.find(el => s === encodeURI(el.name))
      console.log(b);
      if(b){
      res.writeHead(200, {'Content-Type': 'text/html'})
      var result = fs.readFileSync(__dirname + '\\beatle.html').toString();
      console.log(result);
      result = result.replace('{nombre}', b.name);
      result = result.replace('{nombre}', b.name);
      result = result.replace('{fn}', b.birthdate);
      result = result.replace('{imgB}', b.profilePic);
      return res.end(result);
      }
    }
  

    if(req.url === '/api'){
      res.writeHead(200, {'Content-Type': 'application/json'})
      return res.end(JSON.stringify(beatles))
    }

    if(req.url.includes('/api/')){
      const s = req.url.split('/')[2]
      const respuesta = beatles.find(el => s === encodeURI(el.name))
      if(!respuesta){
        res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'})
        res.end('<h1>No se encuentra la páginaaa!</h1>')
      };
      res.writeHead(200, {'Content-Type': 'application/json'})
      return res.end(JSON.stringify(respuesta))
    }

  }   
    
    res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'})
    res.end('<h1>No se encuentra la páginaaa!</h1>')

}).listen(3000, 'localhost')

