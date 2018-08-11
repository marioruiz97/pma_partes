import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styles: []
})
export class UsuarioDetailComponent implements OnInit {
  estado: boolean;
  usuario = new Usuario();

  constructor(
    private route: ActivatedRoute,
    public usuarioService: UsuarioService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.estado = false;
      this.usuarioService.cargarUsuario(id).then((item: Usuario) => {
        this.usuario = item;
        this.usuario.clave = atob(this.usuario.clave);
        this.alertService.refresh();
      });
    } else {
      this.estado = true;
    }
  }

  saveUsuario() {
    this.usuarioService.guardarUsuario(this.usuario);
  }

  editUsuario() {
    this.usuarioService.actualizarUsuario(this.usuario);
  }

  deleteUsuario() {
    this.usuarioService.eliminarUsuario(this.usuario);
  }

}
