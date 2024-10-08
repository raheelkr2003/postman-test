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
else if (parsedUrl.pathname === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is the About Page.');
}
else if (parsedUrl.pathname === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Contact us at contact@example.com.');
}
else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
}
else if (parsedUrl.pathname.startsWith('/api')) {
    res.setHeader('Content-Type', 'application/json');
}
if (method === 'GET' && parsedUrl.pathname === '/api/items') {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'GET request - Fetching all items' }));
}
else if (method === 'POST' && parsedUrl.pathname === '/api/items') {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const newItem = JSON.parse(body);
        res.statusCode = 201;
        res.end(JSON.stringify({ message: 'POST request - Adding new item', data: newItem }));
    });
}
else if (method === 'PUT' && parsedUrl.pathname.startsWith('/api/items/')) {
    let body = '';
    const itemId = parsedUrl.pathname.split('/').pop();

    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const updatedItem = JSON.parse(body);
        res.statusCode = 200;
        res.end(JSON.stringify({ message: `PUT request - Updating item ${itemId}`, data: updatedItem }));
    });
}
else if (method === 'DELETE' && parsedUrl.pathname.startsWith('/api/items/')) {
    const itemId = parsedUrl.pathname.split('/').pop();
    res.statusCode = 200;
    res.end(JSON.stringify({ message: `DELETE request - Deleting item ${itemId}` }));
}
