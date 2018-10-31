import { ISintoma } from 'app/shared/model//sintoma.model';
import { IDiagnostico } from 'app/shared/model//diagnostico.model';
import { IPaciente } from 'app/shared/model//paciente.model';

export const enum TipoDoenca {
    CONGENITA = 'CONGENITA',
    BACTERIANA = 'BACTERIANA',
    VIRAL = 'VIRAL',
    TRAUMA = 'TRAUMA'
}

export interface IDoenca {
    id?: number;
    nome?: string;
    tipo?: TipoDoenca;
    sintomas?: ISintoma[];
    diagnosticos?: IDiagnostico[];
    pacientes?: IPaciente[];
}

export class Doenca implements IDoenca {
    constructor(
        public id?: number,
        public nome?: string,
        public tipo?: TipoDoenca,
        public sintomas?: ISintoma[],
        public diagnosticos?: IDiagnostico[],
        public pacientes?: IPaciente[]
    ) {}
}
