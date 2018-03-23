//Initiallising node modules
var express = require("express");
var cheerio = require('cheerio');
var https = require('https');
var fs = require('fs');
var Equipo = require('./models/Equipo');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://quiniela:quiniela@ds023303.mlab.com:23303/laquinielasoccer', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


/* para crear el path de los logs que se escribiran en PROD */
//var path = require("path");
var bodyParser = require("body-parser");

var app = express(); 

//var methodsFinCredixDB = require('./api/utils/methodsFinCredixDB.js');
//var creditoController = require('./api/controllers/creditoController.js');
//var usersController = require('./api/controllers/usersController.js');


// Body Parser Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));
    
var url = "https://www.google.com.mx/async/lr_lg_fp?ei=BQFZWuaIBIjujwS3x4nwDA&yv=2&q=lg|/g/11dzt53vg0|mt|fp&ved=1t:9652&async=sp:2,lmid:%2Fm%2F0446bd,tab:mt,emid:%2Fg%2F11dzt53vg0,ct:,hl:es-419,tz:America%2FMexico_City,dtoint:2018-01-13T03%3A00%3A00Z,dtointmid:%2Fg%2F11dzt53vg0,_id:liveresults-sports-immersive__league-fullpage,_pms:s";

    ///var url = "http://espndeportes.espn.com/futbol/calendario/_/liga/mex.1";      
  https.get(url, (resp) => {
    
    resp.setEncoding("utf8");
    let data = '';
     
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
     
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        
        
        var jornadas = JSON.parse(data)[1][3][1];
        //Lista Partidos
        //var partido = JSON.parse(jornadas[4][3][0][5][1])[4];
        var partido2 = JSON.parse(jornadas[4][3][0][5][1])[1][4][1][12];
        console.log(partido2);
        
        

        /*
        fs.writeFile("test.txt", partido, function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        }); 
        */
        
        //  Jornadas
        
        for(x=4; x<jornadas.length-3; x++){
            var tem = JSON.parse(jornadas[x][3][0][5][1])[1][4][1];
            console.log(tem);
        }

        return;

        



      });
     
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });





function InsertEquipos(){
    
var url = "https://www.google.com.mx/async/lr_lg_fp?ei=BQFZWuaIBIjujwS3x4nwDA&yv=2&q=lg|/g/11dzt53vg0|mt|fp&ved=1t:9652&async=sp:2,lmid:%2Fm%2F0446bd,tab:mt,emid:%2Fg%2F11dzt53vg0,ct:,hl:es-419,tz:America%2FMexico_City,dtoint:2018-01-13T03%3A00%3A00Z,dtointmid:%2Fg%2F11dzt53vg0,_id:liveresults-sports-immersive__league-fullpage,_pms:s";

    
///var url = "http://espndeportes.espn.com/futbol/calendario/_/liga/mex.1";      
https.get(url, (resp) => {
    resp.setEncoding('utf8');
        

      let data = '';
     
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
     
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        
        var par = JSON.parse(JSON.parse(data)[1][3][1][4][3][0][5][1]);

        for(i=0; i<par[1].length; i++){
            
            equipo = new Equipo();
            equipo.nomEquipo = par[1][i][1][0][1];
            equipo.nomEquipoCompleto = par[1][i][1][0][0];
            equipo.imgUrl = par[1][i][1][7];

            Equipo.create(equipo, function (err, post) {
                if (err) console.log(err);
                console.log(post);
              });

            equipo.nomEquipo = par[1][i][2][0][1];
            equipo.nomEquipoCompleto = par[1][i][2][0][0];
            equipo.imgUrl = par[1][i][2][7];

            Equipo.create(equipo, function (err, post) {
                if (err) console.log(err);
                console.log(post);
              });
        }
      });
     
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

}