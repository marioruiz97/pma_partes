import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TipoComparendo } from '../../../models/tipoComparendo';
import { TipoComparendoService } from '../../../services/tipo-comparendo.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-tipo-comparendo-detail',
  templateUrl: './tipo-comparendo-detail.component.html',
  styles: []
})
export class TipoComparendoDetailComponent implements OnInit {
  estado: boolean;
  tipoComparendo = new TipoComparendo();

  constructor(
    private route: ActivatedRoute,
    public tipoComparendoService: TipoComparendoService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getTipoComparendo();
  }

  getTipoComparendo() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.estado = false;
      this.tipoComparendoService.cargarTipoComparendo(id).then((item: TipoComparendo) => {
        this.tipoComparendo = item;
        this.alertService.refresh();
      });
    } else {
      this.estado = true;
    }
  }

  saveTipoComparendo() {
    this.tipoComparendoService.guardarTipoComparendo(this.tipoComparendo);
  }

  editTipoComparendo() {
    this.tipoComparendoService.actualizarTipoComparendo(this.tipoComparendo);
  }

  deleteTipoComparendo() {
    this.tipoComparendoService.eliminarTipoComparendo(this.tipoComparendo);
  }

}
