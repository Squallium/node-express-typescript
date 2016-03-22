/**
 * Created by borja on 22/3/16.
 */
"use strict";
/// <reference path='../typings/main.d.ts' />
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
module.exports = router;
//# sourceMappingURL=a.js.map