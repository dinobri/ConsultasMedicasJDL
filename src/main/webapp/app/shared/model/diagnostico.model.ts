import { IDoenca } from 'app/shared/model//doenca.model';
import { IConsulta } from 'app/shared/model//consulta.model';
import { IPaciente } from 'app/shared/model//paciente.model';

export interface IDiagnostico {
    id?: number;
    doenca?: IDoenca;
    consulta?: IConsulta;
    paciente?: IPaciente;
}

export class Diagnostico implements IDiagnostico {
    constructor(public id?: number, public doenca?: IDoenca, public consulta?: IConsulta, public paciente?: IPaciente) {}
}
