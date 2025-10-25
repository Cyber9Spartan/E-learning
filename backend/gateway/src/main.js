const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.json());

// Proxy mapping (service names used in docker-compose)
app.use('/auth', createProxyMiddleware({ target: 'http://auth-service:4001', changeOrigin: true, pathRewrite: {'^/auth': ''} }));
app.use('/courses', createProxyMiddleware({ target: 'http://course-service:7001', changeOrigin: true, pathRewrite: {'^/courses': ''} }));
app.use('/ai', createProxyMiddleware({ target: 'http://ai-service:5001', changeOrigin: true, pathRewrite: {'^/ai': ''} }));
app.use('/analytics', createProxyMiddleware({ target: 'http://analytics-service:6001', changeOrigin: true, pathRewrite: {'^/analytics': ''} }));
app.use('/rustsvc', createProxyMiddleware({ target: 'http://rust-service:8001', changeOrigin: true, pathRewrite: {'^/rustsvc': ''} }));

app.get('/health', (req,res) => res.json({status: 'gateway ok'}));

const PORT = process.env.GATEWAY_PORT || 4000;
app.listen(PORT, () => console.log('Gateway listening on', PORT));
