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


Jornada.find(function (err, jornadas) {
  if(!err)  {

    jornadas.forEach(function (val) {
      var nomJornada = val.nomJornada;

      var url = "http://www.mediotiempo.com/liga/futbol/ligamx/calendario/clausura-2018/regular/jornada-" + nomJornada.substr(nomJornada.length - 2, nomJornada.length).trim();
      
      request({'url': url }, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
                    
            $('.calendar-wrapper .mt-calendar-group').each(function (i, elem) {
              
              var fechaPartidos = $(this).find('div.calendar-date-wrapper span').text().trim();
              
              $(this).find('div.mt-calendar-match[data-id]').each(function (e, elemen) {
                                
                var local = $(this).find('a.local.team-wrapper span.name-team').text().trim();
                var visitante = $(this).find('a.visitor.team-wrapper span.name-team').text().trim();
                var horaPartido = $(this).find('div.date-time-wrapper span.date-time').text().trim();
                var lugarPartido = $(this).find('div.link-venue-wrapper div.venue-wrapper span.mt-stadium').text().trim(); 
                var finalizadoSn = isNaN(parseInt($(this).find('a.forFull.status-wrapper span:nth-child(1)').text().trim()));
                var resultadoLocal = isNaN(parseInt($(this).find('a.forFull.status-wrapper span:nth-child(1)').text().trim())) ? 0 : parseInt($(this).find('a.forFull.status-wrapper span:nth-child(1)').text().trim());
                var resultadoVisitante = isNaN(parseInt($(this).find('a.forFull.status-wrapper span:nth-child(3)').text().trim())) ? 0 : parseInt($(this).find('a.forFull.status-wrapper span:nth-child(3)').text().trim());

                Equipo.find(function (err, equipos) {

                  partido = new Partido();
                  partido.jornada = 0;
                  partido.fechaPartido = fechaPartidos;
                  partido.horaPartido = horaPartido;
                  partido.lugarPartido = lugarPartido;
                  partido.jornada = val;

                  partido.equipoLocal = equipos.filter(function (val) {
                    if(val.nomEquipo === local) return val;
                  })[0];

                  partido.equipoVisitante = equipos.filter(function (val) {
                    if(val.nomEquipo === visitante) return val;
                  })[0];

                  partido.resultadoLocal = resultadoLocal;
                  partido.resultadoVisitante = resultadoVisitante;
                  partido.finalizado = !finalizadoSn;
                  
                  Partido.create(partido, function (err, post) {
                      if (err) console.log(err);
                      console.log(post);
                  });

                });
              });
            });
        }else {
            console.log(error);
        }
    });


  });

}
});
return false;