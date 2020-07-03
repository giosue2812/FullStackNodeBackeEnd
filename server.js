//Appl de la library de node por la creation du serveur du point d'entrée
const http = require('http');
//Appl du fichier app qui contient l'implementation de express
const app = require('./app');

//renvoi un port valide qu'il soit fourni du'un numero ou chaine de caractere.
const normalizePort = val => {
  const port = parseInt(val,10);

  if(isNaN(port)){
      return port;
  }
  if(port >= 0){
      return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port',port);

//Recherche les dif erreurs et les gére de maniere approprié.
const errorHandler = error => {
    if(error.syscall !== 'listen'){
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error',errorHandler);
server.on('listening',()=>{
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port ' + port;
    console.log('Liestening on ' + bind);
});
server.listen(port);
