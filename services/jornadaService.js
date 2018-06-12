// import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';

// import cheerio from 'cheerio';
// import Equipo from '../models/Equipo';
// import Jornada from '../models/Jornada';
// import Partido from '../models/Partido';
// import Liga from '../models/Liga';
// import request from 'request';

//     updateJornadas() {
//         const url = 'http://www.mediotiempo.com/liga/futbol/ligamx/calendario/clausura-2018/regular/jornada-1';
//     }
//         // http.get(url)
    
//     request({'url': url }, function (error, response, body) {

//         if (!error && response.statusCode == 200) {
//             $ = cheerio.load(body);
                    
//             Liga.find(function (err, liga) {
//                 if (err) return next(err);

//                 $('ul.dropdown-list.round li').each(function (i, elem) {
//                     console.log($(elem).text().trim());

//                     var nomJornada = $(elem).text().trim();

//                     Jornada.findOne({ nomJornada: nomJornada }, function (err, eq) {
//                         if(eq != null) {
//                             jornada = new Jornada();
//                             jornada.nomJornada = nomJornada;
//                             jornada.liga = liga[0];
//                             jornada._id = eq._id;
//                             Jornada.findByIdAndUpdate(eq._id, jornada, function (err, post) {
//                                 if (err) console.log(err);
//                                 console.log(post);
//                             });
//                         }
//                         else {
//                             jornada = new Jornada();
//                             jornada.nomJornada = nomJornada;
//                             jornada.liga = liga[0];
//                             Jornada.create(jornada, function (err, post) {
//                                 if (err) console.log(err);
//                                 console.log(post);
//                             });
//                         }
//                     });
                    
//                 });
            
//             });
//         }else {
//             console.log(error);
//         }
//     });
//     }

// }
