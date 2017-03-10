var express = require('express');
var app = express();

app.use(express.static('public'));
// app.set("view engine", "ejs");
// app.set("views", "./views");
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

var WebAPIHandler = require('./api/WebAPIHandler');
// var SocketAPIHandler = require('./SocketAPI/SocketAPIHandler');

server.listen(process.env.PORT || 3000);

WebAPIHandler.init(app, express);
// SocketAPIHandler.init(io);

console.log('server started on 3000')

var graph = require('fbgraph');
var conf = require('./config/facebook');

app.get('/auth', function(req, res) {

})

// var query = "SELECT name FROM user WHERE uid = me()";
// var options = {access_token: "EAAD5HLGKKfEBAHrBXqkxc9y6uXUE5whEC4SsNBzxsEyfw8uyXVHGETGQRAvuVqvdccAEzvcAjG1Lu3DceVgFWP99gn5kcRGf9i5ZBOLSH6NaG0IZBDlfhTR72f3wxo2NaUc9tUqt2qzoOiidhRbAOsSwwZBnAMRlkEPireCH9c0tOLQwRO8DZAPz7BsDZAeTS8TO5ME79xUEpsv7aPdFpz9H42QfZAV0lgl20jXPl16gZDZD"};

// graph.fql(query, options, function(err, res) {
//   console.log(res);
// });

// graph.authorize({
// 	"client_id":      conf.facebook_api_key
// 	, "redirect_uri":   "http:localhost:3000/auth"
// 	, "client_secret":  conf.facebook_api_secret
// 	, "code":           191
// }, function (err, facebookRes) {
// 		if(err) {
// 			console.log('err:');
// 			console.log(err)
// 		} else {
// 			console.log(facebookRes)
// 		}
// });

graph.extendAccessToken({
        "access_token":    'EAAD5HLGKKfEBAHrBXqkxc9y6uXUE5whEC4SsNBzxsEyfw8uyXVHGETGQRAvuVqvdccAEzvcAjG1Lu3DceVgFWP99gn5kcRGf9i5ZBOLSH6NaG0IZBDlfhTR72f3wxo2NaUc9tUqt2qzoOiidhRbAOsSwwZBnAMRlkEPireCH9c0tOLQwRO8DZAPz7BsDZAeTS8TO5ME79xUEpsv7aPdFpz9H42QfZAV0lgl20jXPl16gZDZD'
      , "client_id":      conf.facebook_api_key
      , "client_secret":  conf.facebook_api_secret
    }, function (err, facebookRes) {
    	if(err) {
    		console.log(err);
    	} else {
    		console.log(facebookRes);
    	}
    });
