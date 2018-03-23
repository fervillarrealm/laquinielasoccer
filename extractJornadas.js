var HttpProxyAgent = require('http-proxy-agent');
var proxy = 'http://177.238.243.142:8080';
var agent = new HttpProxyAgent(proxy);

var cheerio = require('cheerio');
var Equipo = require('./models/Equipo');
var Jornada = require('./models/Jornada');
var Partido = require('./models/Partido');
var Liga = require('./models/Liga');
var request = require('request');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://quiniela:quiniela@ds023303.mlab.com:23303/laquinielasoccer', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var url = "http://www.mediotiempo.com/liga/futbol/ligamx/calendario/clausura-2018/regular/jornada-1";
   
request({'url': url }, function (error, response, body) {

    if (!error && response.statusCode == 200) {
        $ = cheerio.load(body);
                
        Liga.find(function (err, liga) {
            if (err) return next(err);

            $('ul.dropdown-list.round li').each(function (i, elem) {
                console.log($(elem).text().trim());

                var nomJornada = $(elem).text().trim();

                Jornada.findOne({ nomJornada: nomJornada }, function (err, eq) {
                    if(eq != null) {
                        jornada = new Jornada();
                        jornada.nomJornada = nomJornada;
                        jornada.liga = liga[0];
                        jornada._id = eq._id;
                        Jornada.findByIdAndUpdate(eq._id, jornada, function (err, post) {
                            if (err) console.log(err);
                            console.log(post);
                        });
                    }
                    else {
                        jornada = new Jornada();
                        jornada.nomJornada = nomJornada;
                        jornada.liga = liga[0];
                        Jornada.create(jornada, function (err, post) {
                            if (err) console.log(err);
                            console.log(post);
                        });
                    }
                });
                
            });
        
        });
    }else {
        console.log(error);
    }
});
