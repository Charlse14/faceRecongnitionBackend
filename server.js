/*****

	/ --> res = this is working
	/signin --> POST = sucess/failure
	/register --> POST = user
	/profile/:id --> GET = user
	/image --> PUT = user

****/

const express = require('express');            
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const imageEntry = require('./controllers/imageEntry');
const profile = require('./controllers/profile');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'dignity',
    database : 'smart_brain'
  }
});


const app = express();

app.use(cors());

app.use(bodyParser.json());



app.post('/signin' , (req, res) => {signin.handle(req, res, db, bcrypt)});

app.post('/register' , (req, res) => {register.handle(req, res, db, bcrypt)});

app.put('/image', (req, res) => {imageEntry.handle(req, res, db)});

app.post('/imageurl', (req, res) => {imageEntry.handleApi(req, res)});

app.get('/profile/:id' , profile.handle(db)); //currying function concept





app.listen(3000, ()=>{
	console.log('everything is fine!')
});