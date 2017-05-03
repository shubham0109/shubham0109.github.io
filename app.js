var express = require("express");
var app = express();
var request = require("request");
app.set("view engine","ejs");
app.use(express.static("public"));

app.get('/',function(req,res){
	res.render("search");
});
app.get('/results',function(req,res){
	var search = req.query.search;
	request("http://www.omdbapi.com/?t=" + search,function(error,response,body){
		if (!error && response.statusCode ==200){
			var data = JSON.parse(body);
			console.log(data);
			if (data["Response"] == 'False'){
				res.render("error");
			}else{
			res.render("results",{data1 : data});
			}
		}
	})
})
app.listen(3000,function(){
	console.log("SERVER IS RUNNING");
});