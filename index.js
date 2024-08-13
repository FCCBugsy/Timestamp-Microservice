// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (_req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (_req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req,res) => {
  // since the url is "{something}/:value", we get the ":value" value by using req.params.{value};
  const dateInput = req.params.date;

  const enteredDate = Date.parse(dateInput); 
  const numRegex = /^[0-9]+$/.test(dateInput);
  
  let unix_output = 0;
  let utc_output  = "";
  
  // for each res.json(), you must use .valueOf(), otherwise it will return "2024-08-13..." for unix, instead of the milliseconds
  if (enteredDate) {
    unix_output = new Date(dateInput);
    utc_output  = unix_output.toUTCString();

    return res.json({
      unix : unix_output.valueOf(), 
      utc : utc_output
    });
  }

  else if (isNaN(enteredDate) && numRegex) {
    //here, dateInput is a string, you want to turn it into a number, so use Number() or parseInt()
    unix_output = new Date(Number(dateInput));
    utc_output  = unix_output.toUTCString();

    return res.json({
      unix : unix_output.valueOf(), 
      utc : utc_output
    });
  }

  else if (dateInput === undefined) {
    unix_output = new Date();
    utc_output  = unix_output.toUTCString();

    return res.json({
      unix : unix_output.valueOf(), 
      utc : utc_output
    });  
  }

  else return res.json({ error : "Invalid Date" });  
});

// @LordBugsy on GitHub is listening on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
