var HttpProxyAgent = require('http-proxy-agent');
var proxy = 'http://177.238.243.142:8080';
var agent = new HttpProxyAgent(proxy);

var cheerio = require('cheerio');
var Equipo = require('./models/Equipo');
var Liga = require('./models/Liga');
var request = require('request');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


mongoose.connect('mongodb://quiniela:quiniela@ds023303.mlab.com:23303/laquinielasoccer', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


var url = "http://www.mediotiempo.com/liga/futbol/ligamx/tabla-general";

request({'url': url }, function (error, response, body) {

    if (!error && response.statusCode == 200) {
        $ = cheerio.load(body);
        var lugares = $('div.table-positions div.scroll table.mt-table tbody.mt-table-body tr.mt-table-row');
        var imagen = $('div.table-positions div.fixed table.mt-table tbody.mt-table-body tr.mt-table-row');

        var posiciones = [];
        $(lugares, 'td').each(function (i, tr) {
            var td = [];
            td[0] = i + 1;
            $($(this).children()).each(function (e, data) {
                td[e + 1] = $(data).text().trim();
            });
            posiciones.push(td);
        });

        $(imagen).find('td a.img-team img').each(function (i, tr){ 
            posiciones[i][10] = $(this).attr('src').trim();
        });

        var liga;
        Liga.find({ nomLiga: 'Liga-MX' }, function (err, liga) {
            if (err) return next(err);
            liga = liga;
        });

        
        posiciones.forEach(function (val) {
            
            var equipo = new Equipo();
            equipo.posicion = val[0];
            equipo.nomEquipo = val[1];
            equipo.puntos = val[2];
            equipo.jj = val[3];
            equipo.dg = val[4];
            equipo.jg = val[5];
            equipo.je = val[6];
            equipo.jp = val[7];
            equipo.gf = val[8];
            equipo.gc = val[9];
            equipo.imgUrl = val[10];
            equipo.liga = liga;

            Equipo.findOne({ nomEquipo: equipo.nomEquipo }, function (err, eq) {
                if(eq != null) {
                    //  UPDATE
                    equipo._id = eq._id;
                    Equipo.findByIdAndUpdate(eq._id, equipo, function (err, post) {
                        if (err) console.log(err);
                        console.log(post);
                    });
                }else {
                    //  CERATE
                    Equipo.create(equipo, function (err, post) {
                        if (err) console.log(err);
                        console.log(post);
                    });
                }
            }); 
        });

    }else {
        console.log(error);
    }
});
