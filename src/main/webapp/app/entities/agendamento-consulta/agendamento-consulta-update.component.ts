import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IAgendamentoConsulta } from 'app/shared/model/agendamento-consulta.model';
import { AgendamentoConsultaService } from './agendamento-consulta.service';
import { IConsulta } from 'app/shared/model/consulta.model';
import { ConsultaService } from 'app/entities/consulta';
import { IPaciente } from 'app/shared/model/paciente.model';
import { PacienteService } from 'app/entities/paciente';
import { IMedico } from 'app/shared/model/medico.model';
import { MedicoService } from 'app/entities/medico';

@Component({
    selector: 'jhi-agendamento-consulta-update',
    templateUrl: './agendamento-consulta-update.component.html'
})
export class AgendamentoConsultaUpdateComponent implements OnInit {
    agendamentoConsulta: IAgendamentoConsulta;
    isSaving: boolean;

    consultas: IConsulta[];

    pacientes: IPaciente[];

    medicos: IMedico[];
    dataDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private agendamentoConsultaService: AgendamentoConsultaService,
        private consultaService: ConsultaService,
        private pacienteService: PacienteService,
        private medicoService: MedicoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ agendamentoConsulta }) => {
            this.agendamentoConsulta = agendamentoConsulta;
        });
        this.consultaService.query({ filter: 'agendamentoconsulta-is-null' }).subscribe(
            (res: HttpResponse<IConsulta[]>) => {
                if (!this.agendamentoConsulta.consulta || !this.agendamentoConsulta.consulta.id) {
                    this.consultas = res.body;
                } else {
                    this.consultaService.find(this.agendamentoConsulta.consulta.id).subscribe(
                        (subRes: HttpResponse<IConsulta>) => {
                            this.consultas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.pacienteService.query().subscribe(
            (res: HttpResponse<IPaciente[]>) => {
                this.pacientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.medicoService.query().subscribe(
            (res: HttpResponse<IMedico[]>) => {
                this.medicos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.agendamentoConsulta.id !== undefined) {
            this.subscribeToSaveResponse(this.agendamentoConsultaService.update(this.agendamentoConsulta));
        } else {
            this.subscribeToSaveResponse(this.agendamentoConsultaService.create(this.agendamentoConsulta));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAgendamentoConsulta>>) {
        result.subscribe((res: HttpResponse<IAgendamentoConsulta>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackConsultaById(index: number, item: IConsulta) {
        return item.id;
    }

    trackPacienteById(index: number, item: IPaciente) {
        return item.id;
    }

    trackMedicoById(index: number, item: IMedico) {
        return item.id;
    }
}
