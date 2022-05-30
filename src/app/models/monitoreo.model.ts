export class Monitoreo {
  constructor(
    public id_monitoreo: string,
    public temp_ambiente: string,
    public hum_relativa: string,
    public temp_suelo: string,
    public profundidad: string,
    public resistencia: string,
    public tension: string,
    public fecha: string,
    public hora: string,
    public id_sitio: string,
    public id_nodo_sensor: string
  ) { }
}
/*export interface Monitoreo {
  id_monitoreo: string,
  temp_ambiente: string,
  hum_relativa: string,
  temp_suelo: string,
  profundidad: string,
  resistencia: string,
  tension: string,
  fecha: string,
  hora: string,
  id_sitio: string,
  id_nodo_sensor: string
}*/
