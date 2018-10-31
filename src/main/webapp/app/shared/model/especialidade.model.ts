import { IMedico } from 'app/shared/model//medico.model';

export interface IEspecialidade {
    id?: number;
    nome?: string;
    medicos?: IMedico[];
}

export class Especialidade implements IEspecialidade {
    constructor(public id?: number, public nome?: string, public medicos?: IMedico[]) {}
}
