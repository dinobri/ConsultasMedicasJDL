import { Moment } from 'moment';
import { IDiagnostico } from 'app/shared/model//diagnostico.model';
import { IDoenca } from 'app/shared/model//doenca.model';
import { IAgendamentoConsulta } from 'app/shared/model//agendamento-consulta.model';
import { IConsulta } from 'app/shared/model//consulta.model';

export interface IPaciente {
    id?: number;
    nome?: string;
    numeroDocumento?: string;
    dataNascimento?: Moment;
    altura?: number;
    peso?: number;
    amf?: string;
    amp?: string;
    diagnosticos?: IDiagnostico[];
    doencas?: IDoenca[];
    agendamentoConsultas?: IAgendamentoConsulta[];
    consultas?: IConsulta[];
}

export class Paciente implements IPaciente {
    constructor(
        public id?: number,
        public nome?: string,
        public numeroDocumento?: string,
        public dataNascimento?: Moment,
        public altura?: number,
        public peso?: number,
        public amf?: string,
        public amp?: string,
        public diagnosticos?: IDiagnostico[],
        public doencas?: IDoenca[],
        public agendamentoConsultas?: IAgendamentoConsulta[],
        public consultas?: IConsulta[]
    ) {}
}
