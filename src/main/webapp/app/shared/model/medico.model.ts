import { Moment } from 'moment';
import { IEspecialidade } from 'app/shared/model//especialidade.model';
import { IAgendamentoConsulta } from 'app/shared/model//agendamento-consulta.model';
import { IConsulta } from 'app/shared/model//consulta.model';

export interface IMedico {
    id?: number;
    nome?: string;
    numeroDocumento?: string;
    dataNascimento?: Moment;
    numeroCRM?: string;
    especialidades?: IEspecialidade[];
    agendamentoConsultas?: IAgendamentoConsulta[];
    consultas?: IConsulta[];
}

export class Medico implements IMedico {
    constructor(
        public id?: number,
        public nome?: string,
        public numeroDocumento?: string,
        public dataNascimento?: Moment,
        public numeroCRM?: string,
        public especialidades?: IEspecialidade[],
        public agendamentoConsultas?: IAgendamentoConsulta[],
        public consultas?: IConsulta[]
    ) {}
}
