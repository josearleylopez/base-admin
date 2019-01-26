export class Vehiculo {

  constructor(
    public placa: string,
    public marca: string,
    public descripcion: string,
    public modelo: number,
    public capacidad: number,
    public tipoServicio?: string,
    public estado?: boolean,
    public vencimientoSOAT?: Date,
    public vencimientoTecnicoMecanica?: Date,
    public vencimientoSanidad?: Date,
    public vencimientoFumigacion?: Date,
    public img?: string,
    public usuario?: string,
    public tercero?: string,
    public _id?: string
  ) { }
}
