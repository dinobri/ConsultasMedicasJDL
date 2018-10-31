import { IConsulta } from 'app/shared/model//consulta.model';

export interface IConsultorio {
    id?: number;
    numero?: number;
    consultas?: IConsulta[];
}

export class Consultorio implements IConsultorio {
    constructor(public id?: number, public numero?: number, public consultas?: IConsulta[]) {}
}
