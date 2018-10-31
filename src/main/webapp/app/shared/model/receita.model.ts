import { IConsulta } from 'app/shared/model//consulta.model';
import { IPosologia } from 'app/shared/model//posologia.model';

export interface IReceita {
    id?: number;
    observacoes?: string;
    consulta?: IConsulta;
    posologias?: IPosologia[];
}

export class Receita implements IReceita {
    constructor(public id?: number, public observacoes?: string, public consulta?: IConsulta, public posologias?: IPosologia[]) {}
}
