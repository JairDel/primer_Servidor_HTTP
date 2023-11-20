const http = require('http');
const fs = require('fs');

//HTTP => request response 

http.createServer((request, response)=> {
    const file = request.url == '/' ? './WWW/index.html' : `./WWW/${request.url}`;

    if(request.url == '/registro'){
        let data = [];
        request.on("data", value =>{
            data.push(value);
        }).on("end", ()=>{
            let params = Buffer.concat(data).toString();
            response.write(params);
            response.end();
        });
    }else{

        fs.readFile(file, (err, data)=> {     //nombre del archivo y su ubicacion 
            if(err){
                response.writeHead(404, {"Content_Type":"text/html"});              //sobrescribir la cabeza de la pagina
                response.write("Not found");
                response.end();   
            } else {
                const extension = request.url.split('.').pop();
                switch(extension){
                    case 'txt':
                        response.writeHead(200, {"Content_Type":"text/plain"});  
                        break;
                    case 'html':
                        response.writeHead(200, {"Content_Type":"text/html"}); 
                        break; 
                    case 'css':
                        response.writeHead(200, {"Content_Type":"text/css"});  
                        break;
                    case 'js':
                        response.writeHead(200, {"Content_Type":"text/javascript"});  
                        break;
                    case 'jpg':
                        response.writeHead(200, {"Content_Type":"image/jpeg"});  
                        break;
                    default:
                        response.writeHead(200, {"Content_Type":"text/plain"});  
                        break;
                }            
                response.write(data);
                response.end();        //envia el mensaje y CORTA el tunel 
            }
         });
    }
    
}).listen(4444);      //espera el numero de puesto en que el sevidor se va a ejecutar localhost:4444

