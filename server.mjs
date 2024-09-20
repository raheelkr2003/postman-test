import { createServer } from 'http';
import { URL } from 'url';

const PORT = 3000;

const server = createServer((req, res) => {
    const { method, url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
});
if (parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is the Home Page.');
}
