const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000 ;

var app = express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}` ;
	console.log(log);
	fs.appendFile('server.log',log + '\n',(err) => {
		if(err){
			console.log('Unable to append to server.log')			
		}
	});
	next();
});

/*app.use((req,res,next) => {
	res.render('maintenance.hbs');
});*/

hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear()
});

hbs.registerHelper('hello',() => {
	return "Hello" ;
});

app.get('/',(req,res) => {
	//res.send('<h1>Hello World</h1>') ;
	/*res.send({
		name:'Vineet',
		hobby:[
			'Cricket',
			'Music',
			'Programming'
		]
	})*/
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to Home Page'
	});
});

app.get('/about',(req,res) => {
	//res.send('About Us Page')
	res.render('about.hbs',{
		pageTitle:'About Page'
	});
});

app.get('/projects',(req,res) => {
	res.render('project.hbs',{
		message:'Profolio Page'
	});
});

app.get('/bad',(req,res) => {
	res.send({
		errorMessage:'404 Not Found'
	});
})

app.listen(port,() => {
	console.log('Server is up on port '+port)
});