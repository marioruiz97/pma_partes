import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Grado } from '../../../models/grado';
import { GradoService } from '../../../services/grado.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-grado-detail',
  templateUrl: './grado-detail.component.html',
  styles: []
})
export class GradoDetailComponent implements OnInit {
  estado: boolean;
  grado = new Grado();

  constructor(
    private route: ActivatedRoute,
    public gradoService: GradoService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getGrado();
  }

  getGrado() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.estado = false;
      this.gradoService.cargarGrado(id).then((item: Grado) => {
        this.grado = item;
        this.alertService.refresh();
      });
    } else {
      this.estado = true;
    }
  }

  saveGrado() {
    this.gradoService.guardarGrado(this.grado);
  }

  editGrado() {
    this.gradoService.actualizarGrado(this.grado);
  }

  deleteGrado() {
    this.gradoService.eliminarGrado(this.grado);
  }

}
