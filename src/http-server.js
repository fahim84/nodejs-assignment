const http = require('http');
var readFile = require('./readFile');

const server = http.createServer((request, response) => {
    if (request.url === "/") {
        response.write("Home\n");
    } else if (request.url === "/about") {
        response.write("About page\n");
    } else if (request.url === "/file") {
        response.write(readFile());
    } else {
        response.write("Error 404 page not found\n");
    }
    response.end()
});

server.listen(3333);