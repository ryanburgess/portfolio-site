var express = require('express');
var reactViews = require('express-react-views');

var app = express();

app.set('view engine', 'js');
app.engine('js', reactViews.createEngine());
app.use(express.static(__dirname + '/public'));

app.get('/', require('./routes').index);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Ryan Burgess portfolio listening on port ' + port);
});
