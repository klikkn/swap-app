import express from 'express'
import path from 'path'
import http from 'http'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.use(express.static(path.resolve(__dirname, './dist')));

app.use('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
})

server.listen(port);