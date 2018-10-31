import { Moment } from 'moment';
import { IConsulta } from 'app/shared/model//consulta.model';
import { IPaciente } from 'app/shared/model//paciente.model';
import { IMedico } from 'app/shared/model//medico.model';

export interface IAgendamentoConsulta {
    id?: number;
    data?: Moment;
    horaInicio?: number;
    horaFim?: number;
    isHoraMarcada?: boolean;
    consulta?: IConsulta;
    paciente?: IPaciente;
    medico?: IMedico;
}

export class AgendamentoConsulta implements IAgendamentoConsulta {
    constructor(
        public id?: number,
        public data?: Moment,
        public horaInicio?: number,
        public horaFim?: number,
        public isHoraMarcada?: boolean,
        public consulta?: IConsulta,
        public paciente?: IPaciente,
        public medico?: IMedico
    ) {
        this.isHoraMarcada = this.isHoraMarcada || false;
    }
}
