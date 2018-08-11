import { Dependencia } from "./dependencia";
import { Infractor } from "./infractor";
import { TipoVehiculo } from "./tipoVehiculo";
import { TipoComparendo } from "./tipoComparendo";
import { Usuario } from "./usuario";

export class Parte {
    public codigo: number;
    public fecha: Date;
    public lugar: string;
    public dependencia: Dependencia;
    public infractor: Infractor;
    public tipoVehiculo: TipoVehiculo;
    public placa: string;
    public tipoComparendo: TipoComparendo;
    public usuario: Usuario;
    public descripcion: string;
    public estado: boolean;

    constructor() {
        this.dependencia = new Dependencia();
        this.infractor = new Infractor();
        this.tipoVehiculo = new TipoVehiculo();
        this.tipoComparendo = new TipoComparendo();
    }
}