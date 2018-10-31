import { Moment } from 'moment';
import { IReceita } from 'app/shared/model//receita.model';
import { IDiagnostico } from 'app/shared/model//diagnostico.model';
import { IConsultorio } from 'app/shared/model//consultorio.model';
import { IPaciente } from 'app/shared/model//paciente.model';
import { IMedico } from 'app/shared/model//medico.model';
import { IAgendamentoConsulta } from 'app/shared/model//agendamento-consulta.model';

export interface IConsulta {
    id?: number;
    dataHora?: Moment;
    receita?: IReceita;
    diagnosticos?: IDiagnostico[];
    consultorio?: IConsultorio;
    paciente?: IPaciente;
    medico?: IMedico;
    agendamentoConsulta?: IAgendamentoConsulta;
}

export class Consulta implements IConsulta {
    constructor(
        public id?: number,
        public dataHora?: Moment,
        public receita?: IReceita,
        public diagnosticos?: IDiagnostico[],
        public consultorio?: IConsultorio,
        public paciente?: IPaciente,
        public medico?: IMedico,
        public agendamentoConsulta?: IAgendamentoConsulta
    ) {}
}
