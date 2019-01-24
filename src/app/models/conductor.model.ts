export class Conductor {

  constructor(
    public cedula: string,
    public nombres: string,
    public apellidos: string,
    public vencimientoLicenciaConduccion?: Date,
    public vencimientoCertificadoManipulacion?: Date,
    public certificadoPazSalvo?: boolean,
    public certificadoExamenes?: boolean,
    public img?: string,
    public telefono?: string,
    public usuario?: string,
    public vehiculo?: string,
    public _id?: string
  ) { }
}
