const express = require('express')
const cors = require('cors')
const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware')
const topAlbums = require('./topAlbums')
port = process.env.PORT || 80

app.use(cors())

app.use('/search', createProxyMiddleware({
    target: 'https://itunes.apple.com',
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

app.use('/lookup', createProxyMiddleware({
    target: 'https://itunes.apple.com',
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

app.get('/top', (req, res) => {
    res.type('json')
    res.json({status: res.statusCode, results: topAlbums.getTop()})
})

app.listen(port, () => {
    console.log("Server is running on port 5000");
})