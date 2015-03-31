// A very simple demo of putting something into Couchbase using the Node client
// Matthew Revell, matthew@couchbase.com

// Let's use Express
var express = require('express');
var app = express();
// And bodyParser to handle our form input
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });

// Now let's connect to Couchbase Server, assuming it's running on localhost
// and has a bucket named default
var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://127.0.0.1');
var bucket = cluster.openBucket('default');

// Let's create a simple home page that has a form
// The form will POST to the same location
app.get('/', function(req, res){
  var html = '<form action="/" method="post">' +
               'What is your name:' +
               '<input type="text" name="userName" />' +
               '<br>' +
               'Where do you live?' +
               '<input type="text" name="location" />' +
               '<br>' +
               '<button type="submit">Submit</button>' +
            '</form>';

  res.send(html);
});

// Now we need to create a route to handle the POST
app.post('/', urlEncodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  // Convert our form input into JSON ready to store in Couchbase
  var jsonVersion = JSON.stringify(req.body);

  // Save it into Couchbase with keyname user
  bucket.upsert('user', jsonVersion, function (err, response){
    if (err) {
      console.log('Failed to save to Couchbase', err);
      return;
    } else {
      res.send('Saved to Couchbase!');
    }
  });

});


// Run the app on port 3000
app.listen(3000, function() {
  console.log('Couchbase sample app listening on port 3000');
});
