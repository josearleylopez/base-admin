export class Ruta {

  constructor(
    public nombre: string,
    public origen: string,
    public destino: string,
    public descripcion?: string,
    public valorFlete?: number,
    public valorViaticos?: number,
    public valorPeaje?: number,
    public peaje?: boolean,
    public hotel?: boolean,
    public usuario?: string,
    public _id?: string
  ) { }
}
