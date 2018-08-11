import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

import { Parte } from '../../../models/parte';
import { Dependencia } from '../../../models/dependencia';
import { Infractor } from '../../../models/infractor';
import { TipoVehiculo } from '../../../models/tipoVehiculo';
import { TipoComparendo } from '../../../models/tipoComparendo';
import { Usuario } from '../../../models/usuario';


import { ParteService } from '../../../services/parte.service';
import { DependenciaService } from '../../../services/dependencia.service';
import { InfractorService } from '../../../services/infractor.service';
import { TipoVehiculoService } from '../../../services/tipo-vehiculo.service';
import { TipoComparendoService } from '../../../services/tipo-comparendo.service';
import { UsuarioService } from '../../../services/usuario.service';



@Component({
  selector: 'app-parte-detail',
  templateUrl: './parte-detail.component.html',
  styles: []
})
export class ParteDetailComponent implements OnInit {
  infractor: Infractor;
  estado: boolean;
  dependencia: number;
  tipoVehiculo: number;
  tipoComparendo: number;
  identificacion: number;
 // usuario: string;
  parte = new Parte();

  constructor(
    private route: ActivatedRoute,
    public parteService: ParteService,
    public infractorService: InfractorService, 
   // public usuarioService: UsuarioService, 
    public dependenciaService: DependenciaService,
    public tipoComparendoService: TipoComparendoService,
    public tipoVehiculoService: TipoVehiculoService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getParte();
    this.dependenciaService.cargarDependencias().then(_ => this.dependencia = this.dependenciaService.dependencias[0].id);
    this.tipoComparendoService.cargarTipoComparendos().then(_ => this.tipoComparendo = this.tipoComparendoService.tipoComparendos[0].codigo);
    this.tipoVehiculoService.cargarTipoVehiculos().then(_ => this.tipoVehiculo = this.tipoComparendoService.tipoComparendos[0].codigo);
  }

  getParte() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.estado = false;
      this.parteService.cargarParte(id).then((item: Parte) => {
        this.parte = item;
        this.dependencia = this.parte.dependencia.id;
        this.tipoComparendo = this.parte.tipoComparendo.codigo;
        this.tipoVehiculo = this.parte.tipoVehiculo.codigo;
        this.alertService.refresh();
      });
    } else {
      this.estado = true;
    }
  }

  getInfractor() {
      this.infractorService.cargarInfractor(this.identificacion).then((item: Infractor) => {
        this.infractor = item;
        this.infractor.tipoDocumento.codigo = this.infractor.tipoDocumento.codigo;
        this.infractor.grado.codigo = this.infractor.grado.codigo;
        this.alertService.refresh();
      });
      return this.infractor;
    } 
  

  saveParte() {
    debugger;
    
    this.parte.dependencia = this.dependenciaService.dependencias.filter((item : Dependencia) => item.id === +this.dependencia)[0];
    this.parte.tipoComparendo = this.tipoComparendoService.tipoComparendos.filter((item : TipoComparendo) => item.codigo === +this.tipoComparendo)[0];
    this.parte.tipoVehiculo = this.tipoVehiculoService.tipoVehiculos.filter((item : TipoVehiculo) => item.codigo === +this.tipoVehiculo)[0];
    this.parte.infractor = this.getInfractor();
    this.parteService.guardarParte(this.parte);
  }

  editParte() {
    this.parteService.actualizarParte(this.parte);
  }

  deleteParte() {
    this.parteService.eliminarParte(this.parte);
  }

}
