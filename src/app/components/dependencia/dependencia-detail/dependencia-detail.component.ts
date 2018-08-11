import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dependencia } from '../../../models/dependencia';
import { DependenciaService } from '../../../services/dependencia.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-dependencia-detail',
  templateUrl: './dependencia-detail.component.html',
  styles: []
})
export class DependenciaDetailComponent implements OnInit {
  estado: boolean;
  dependencia = new Dependencia();

  constructor(
    private route: ActivatedRoute,
    public dependenciaService: DependenciaService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getDependencia();
  }

  getDependencia() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.estado = false;
      this.dependenciaService.cargarDependencia(id).then((item: Dependencia) => {
        this.dependencia = item;
        this.alertService.refresh();
      });
    } else {
      this.estado = true;
    }
  }

  saveDependencia() {
    this.dependenciaService.guardarDependencia(this.dependencia);
  }

  editDependencia() {
    this.dependenciaService.actualizarDependencia(this.dependencia);
  }

  deleteDependencia() {
    this.dependenciaService.eliminarDependencia(this.dependencia);
  }

}
