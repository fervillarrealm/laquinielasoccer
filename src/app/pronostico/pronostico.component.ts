import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators, AbstractControl, FormControlName } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-pronostico',
  templateUrl: './pronostico.component.html',
  styleUrls: ['./pronostico.component.css']
})
export class PronosticoComponent implements OnInit {
  claJornada = '';
  partidos = [];
  jornadas: any;
  pronosticoForm: FormArray;
  partidoForm: FormGroup;

  constructor(private http: HttpClient,  private formBuilder: FormBuilder, ) {

    this.partidoForm = formBuilder.group({
      jornada: '',
      fechaPartido: '',
      horaPartido: '',
      lugarPartido: '',
      equipoLocal: '',
      resultadoLocal: ['', Validators.compose([ Validators.required ]) ],
      equipoVisitante: '',
      resultadoVisitante : ['', Validators.compose([ Validators.required ]) ]
    });

   }

   buildPartidoForm(partido): FormGroup {
      const form = this.formBuilder.group({
        'jornada':            [],
        'fechaPartido':       [partido.fechaPartido],
        'horaPartido':        [],
        'lugarPartido':       [],
        'equipoLocal':        [],
        'resultadoLocal':     [],
        'equipoVisitante':    [],
        'resultadoVisitante': []
      });
      return form;
   }

  ngOnInit() {
    this.http.get('/jornada').subscribe(data => {
      this.jornadas = data;
    });
  }

  onChange(newValue) {
    console.log(newValue);
    this.claJornada = newValue;

    this.http.get('/partido/' + newValue).subscribe(data => {
      this.partidos = this.groupBy(data, 'fechaPartido');
    });
  }

  groupBy(collection, property) {
    let i = 0, val, index, values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);

        if (index > -1) {
            result[index].push(collection[i]);
        } else {
            values.push(val);
            result.push([collection[i]]);
        }
    }
    return result;
  }
}
