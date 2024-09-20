import { createServer } from 'http';
import { URL } from 'url';

const PORT = 3000;

const server = createServer((req, res) => {
    const { method, url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
});
