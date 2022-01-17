var http = require('http');
const path = require('path');

 

// const ejs = require('ejs');
const bodyParser = require('body-parser');
var express = require("express");
var mysql = require('mysql');
var app = express();
var http = require('http');
var router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
/* const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'nurvtekc_soporte',
    password : 'N057r4d4mu$',
    database : 'nurvtekc_UCSH'
}); */
const con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'N057r4d4mu$',
  database : 'Tuwe'
}); 
/* const con = mysql.createConnection({
  host     : 'localhost',
  user     : 'cdoenli1_diag',
  password : 'N057r4d4mu$',
  database : 'cdoenli1_diag'
}); */
app.use('/', express.static(__dirname + '/public')); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const {getHomePage, letItbe} = require('./routes/index');
// const { render } = require('jade');

app.get('/diag/h',(req, res) =>{
    res.send('Hello World!');
});
app.get('/intrumentos', (req, res) =>{
     res.render('index2');
});
app.get('/login',(req,res) =>{
  if (req.method == "GET"){
    var nom = "Login Miembros"; //req.query.nombre;
    res.render('login', {page:nom});
  }
});
app.get('/test',getHomePage);
app.get('/procesador', letItbe);
app.get('/diag/ctbl',(req, res) =>{
    var msg = "Prueba Conexion";
    con.connect(function(err) {
      if (err){
         msg = "Error en la conexion = "+err;
         res.send(msg);
      } 
      msg = "Connected!";
      var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
      con.query(sql, function (err, result) {
        if (err){
          msg = "Error en la conexion = "+err;
          res.send(msg);
       } 
        msg = "Tabla Creada";
        res.send(msg);
      });
    });
    
});
// comando?SQL=CREATE%20TABLE%20msgs%20(id%20INT%20NOT%20NULL%20AUTO_INCREMENT,%20rut%20VARCHAR(255),%20rutmed%20VARCHAR(255),%20nommed%20VARCHAR(255),%20nompac%20VARCHAR(255),%20msg%20VARCHAR(255),%20std%20VARCHAR(5));
// comando?SQL=CREATE TABLE instrumento(id INT NOT NULL AUTO_INCREMENT, nombre VARCHAR(255), descripcion VARCHAR(255), tipo VARCHAR(255), status VARCHAR(255), PRIMARY KEY (id));
// comando?SQL=CREATE TABLE ambito(id INT NOT NULL AUTO_INCREMENT, idins INT, nombre VARCHAR(255), descripcion VARCHAR(255), tipo VARCHAR(255), status VARCHAR(255), PRIMARY KEY (id));
// comando?SQL=CREATE TABLE subambito(id INT NOT NULL AUTO_INCREMENT, idam INT, nombre VARCHAR(255), descripcion VARCHAR(255), tipo VARCHAR(255), status VARCHAR(255), PRIMARY KEY (id));
// comando?SQL=CREATE TABLE preguntas(id INT NOT NULL AUTO_INCREMENT, idsub INT, enunciado VARCHAR(255), descripcion VARCHAR(255), tipo VARCHAR(255), status VARCHAR(255), PRIMARY KEY (id));
// comando?SQL=CREATE TABLE respuestas(id INT NOT NULL AUTO_INCREMENT, idpre INT, enunciado VARCHAR(255), ponderacion INT, status VARCHAR(255), fortaleza VARCHAR(255), debilidad VARCHAR(255) , oportunidad VARCHAR(255) , amenaza VARCHAR(255), PRIMARY KEY (id));


app.get('/diag/comando',(req, res) =>{
  let sql = req.query.SQL;
  var msg = "Prueba Conexion";
  con.connect(function(err) {
    if (err){
       msg = "Error en la conexion = "+err;
       res.send(msg);
    } 
    msg = "Connected!";
//var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err){
        msg = "Error en la conexion = "+err;
        res.send(msg);
     } 
      msg = "Procesado";
      res.send(msg);
    });
  });
  
});
app.get('/diag/getmsgd', (req, res) => {
  let rut = req.query.rut;
  let rutmed = req.query.rutmed;
  let stmt = 'SELECT * FROM msgs WHERE rut=? AND rutmed=? ';
  con.query(stmt, [rut,rutmed],(err,rows) => {
  if (err) {
    res.send(err.message);
    
  }
  // get inserted id
  
  res.send(rows);
  
  });
});

app.get('/diag/setstd', (req, res ) => {
   let id = req.query.id;
   let stmt = "UPDATE msgs SET std = 'O' WHERE id = ?;";
 
   // execute the insert statment
   con.query(stmt,[id], (err, results) => {
     if (err) {
       res.send(err.message);
       
     }
     // get inserted id
     res.send('"msg":"OK"');
     
   });

});

app.get('/diag/sendmsg', (req, res) => {
  let rut = req.query.rut;
  let rutmed = req.query.rutmed;
  let nommed = req.query.nommed;
  let nompac = req.query.nompac;
  let msg = req.query.msg;
  let std = "N";
 let stmt = "INSERT INTO msgs (rut,rutmed,nommed,nompac,msg,std) VALUES(?,?,?,?,?,?);";
 
 // execute the insert statment
 con.query(stmt,[usuario,direccion], (err, results) => {
   if (err) {
     res.send(err.message);
     
   }
   // get inserted id
   res.send('"msg":"OK"');
   
 });
});

app.get('/diag/delTodo', (req, res) => {
 
 let stmt = "TRUNCATE TABLE customers";
 
 // execute the insert statment
 con.query(stmt, (err, results) => {
   if (err) {
     res.send(err.message);
     
   }
   // get inserted id
   res.send('Todo Eliminado');
   
 });
});

app.get('/diag/inserta', (req, res) => {
  let usuario = req.query.nombre;
  let direccion = req.query.direccion;
 let stmt = "INSERT INTO customers (name,address) VALUES(?,?);";
 
 // execute the insert statment
 con.query(stmt,[usuario,direccion], (err, results) => {
   if (err) {
     res.send(err.message);
     
   }
   // get inserted id
   res.send('version 223 Todo Id:' + results.insertId);
   
 });
});

app.get('/diag/insert', (req, res) => {
         var usuario = req.query.user;
	       var direccion = req.query.location;
        let stmt = "INSERT INTO customers (name,address) VALUES('"+ usuario+"','"+direccion+"')";
        
        // execute the insert statment
        con.query(stmt, (err, results) => {
          if (err) {
            res.send(err.message);
            
          }
          // get inserted id
          res.send('version 767575675 Todo Id:' + results.insertId);
          
        });
});
app.get('/diag/consultas', (req, res) => {
 

 // execute the insert statment
 con.query('SELECT * FROM customers', (err,rows) => {
   if (err) {
     res.send(err.message);
     
   }
   // get inserted id
   var datos= "i";
   for (var i=0; i<rows.length;i++)
   {
     datos = datos+"/"+rows[i].name;
   }
   
   res.send(rows);
   
 });
});
// sahdajsdhkajshdkjashdjkashdkjashdk

app.post('/uploadfile',upload_file);

function upload_file(req, res, next){
   
   if(req.method == "POST") {
    console.log('An figurativo has occured: \n');
      // create an incoming form object
      var form = new formidable.IncomingForm();
      var nombre = "valor";
      // console.log("Valor = "+ JSON.stringify(req.body.body));
      // specify that we want to allow the user to upload multiple files in a single request
      form.multiples = false;
      // store all uploads in the /uploads directory
      form.uploadDir = path.basename(path.dirname('/uploads/json_files/'))
      // every time a file has been uploaded successfully,
      // rename it to it's orignal name
      form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name), function(err){
            if (err) throw err;
            console.log('renamed complete: '+file.name);
           
            
            const file_path = '/uploads/'+file.name
            
        });
        nombre = file.name;
        console.log('Nombre del Archivo: '+nombre);
      });
      // log any errors that occur
      form.on('error', function(err) {
          console.log('An error has occured: \n' + err);
      });
      // once all the files have been uploaded, send a response to the client
      form.on('end', function() {
         //  res.end('success');
          res.statusMessage = "Archivo listo para ser procesado";
          res.statusCode = 200;
           res.redirect('/procesar?nombre='+ nombre)
           res.end()
      });
      // parse the incoming request containing the form data
      form.parse(req);
    }
}
app.get('/procesar', procesarXLS);
function procesarXLS(req, res, next)
{
    if (req.method == "GET"){
      var nom = req.query.nombre;
      res.render('procesado', {nombre:nom});
    }
}
app.get('/pagina', open_index_page);//call for main index page

function open_index_page(req, res, next){

  if(req.method == "GET"){
       res.render('index.ejs');
   }
}




//app.listen();
 const port = 6001;
 const host = "192.168.1.83";
 app.listen(port,host, () => {
  console.log(`Server running on port: ${port}`);
 });
