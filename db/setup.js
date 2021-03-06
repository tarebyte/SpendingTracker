var pg = require('pg');
var bcrypt = require('bcrypt-nodejs');
var config = require('./config');

var createDBClient = function() {
  var client = new pg.Client(config.db.postgres);
  client.connect();
  return client;
};

var client = createDBClient();
client.on('error', function(err) {
  console.log('Sorry, your database didn\'t set up correctly ' + err);
});

console.log('Creating tables...');
client.query('CREATE TABLE login (id serial primary key, username varchar(30), password varchar(60));')
client.query('CREATE TABLE spending (id int, cost float, category varchar(20), location varchar(30), date varchar(20));');
var finalQuery = client.query('CREATE TABLE categories (id int, category varchar(20));');

finalQuery.on('end', function() {
  console.log('Done!');
  client.end();
});
