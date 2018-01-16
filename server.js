'use strict';

import express from 'express';
import middleware from './middleware';
import morgan from 'morgan';
import path from 'path';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

process.on('uncaughtException', function(err) {
    console.error(
        new Date().toUTCString(),
        `uncaughtException: ${err.message}`,
    );
    console.error(err.stack);
    process.exit(1);
});

process.noDeprecation = true;

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

const app = express();
const staticPath = path.join(__dirname, 'build');
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(staticPath));
if (isDeveloping) {
    const config = require('./webpack.config.dev');
    const compiler = webpack(config);
    app.use(express.static(path.resolve(__dirname, 'src')));
    app.use(
        require('webpack-dev-middleware')(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath,
            stats: {
                assets: false,
                colors: true,
                version: false,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false,
            },
        }),
    );
    app.use(require('webpack-hot-middleware')(compiler));
} else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
}

app.listen(port, function() {
    console.log('Project Running on port', port);
});

app.get('/photos', (req, res) => {
    axios
        .get('https://jsonplaceholder.typicode.com/photos')
        .then(resp => {
            return res.send(resp.data);
        })
        .catch(err => {
            console.log('err', err);
            return res.send(err);
        });
});
app.get('*', middleware);
