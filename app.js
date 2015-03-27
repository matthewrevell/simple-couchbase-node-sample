// Let's use Express
var express = require('express');
var app = express();

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

// And now we create a POST route at the same location to handle the form input
// and save it out to Couchbase

// Run the app on port 3000
app.listen(3000, function() {
  console.log('Couchbase sample app listening on port 3000');
});
