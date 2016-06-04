/**
 * Created by borja on 25/03/16.
 */
"use strict";
/// <reference path='./typings/main.d.ts' />
var appModule = require('./app');
var app = appModule.App;
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
//# sourceMappingURL=pre-prod-env.js.map