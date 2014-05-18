
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.get('/updatebpm', function (req, res) {
    var BpmItem = Parse.Object.extend("BPM");
    var bpmItem = new BpmItem();

    bpmItem.set("bpm", req.query.bpm);
    console.log(JSON.stringify(req.query));

    bpmItem.save(null, {
        success: function (appItem) {
            // Execute any logic that should take place after the object is saved.
            console.log('New object created with objectId: ' + appItem.id);
            res.end('{"success" : "true"}');
        },
        error: function (appItem, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and description.
            console.log('Failed to create new object, with error code: ' + error.description);
            res.end('{"success" : "false"}');
        },
        useMasterKey: true
    });
});

app.get('/getbpm', function (req, res) {
    var BpmItem = Parse.Object.extend("BPM");
    var query = new Parse.Query(BpmItem);

    query.descending("updatedAt");
    query.limit(1);
    query.find({
        success: function (queryList) {
            // The object was retrieved successfully.
            res.end(JSON.stringify(queryList[0]));
        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
            res.end('{"success" : "false"}');
        }
    });
});

app.get('/skiptrack', function (req, res) {
    var SKIPItem = Parse.Object.extend("SKIP");
    var skipItem = new SKIPItem();

    skipItem.set("skip", true);

    skipItem.save(null, {
        success: function (appItem) {
            // Execute any logic that should take place after the object is saved.
            console.log('New object created with objectId: ' + appItem.id);
            res.end('{"success" : "true"}');
        },
        error: function (appItem, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and description.
            console.log('Failed to create new object, with error code: ' + error.description);
            res.end('{"success" : "false"}');
        },
        useMasterKey: true
    });
});

app.get('/checkskiptrack', function (req, res) {
    var SKIPItem = Parse.Object.extend("SKIP");
    var query = new Parse.Query(SKIPItem);

    query.descending("updatedAt");
    query.limit(1);
    query.find({
        success: function (skipBoolArray) {
            // The object was retrieved successfully.
            var skip = skipBoolArray[0];

            if (skip.get('skip') == false) {
                res.end('{"skip" : "false"}');
            }

            if (skip.get('skip') == true) {
                skip.set("skip", false);
                skip.save(null, {
                    success: function (appList) {
                        res.end('{"skip" : "true"}');
                    },
                    error: function (object, error) {
                        // The object was not retrieved successfully.
                        // error is a Parse.Error with an error code and description.
                        res.end('{"success" : "false"}');
                    },
                    useMasterKey: true
                });
            }
            
        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
            res.end('{"success" : "false"}');
        },
        useMasterKey: true
    });
});

// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();
