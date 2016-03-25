/**
 * Created by borja on 22/3/16.
 */

/// <reference path='../typings/main.d.ts' />

import express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

export = router;
