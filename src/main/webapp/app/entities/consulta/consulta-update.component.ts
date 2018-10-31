import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IConsulta } from 'app/shared/model/consulta.model';
import { ConsultaService } from './consulta.service';
import { IReceita } from 'app/shared/model/receita.model';
import { ReceitaService } from 'app/entities/receita';
import { IConsultorio } from 'app/shared/model/consultorio.model';
import { ConsultorioService } from 'app/entities/consultorio';
import { IPaciente } from 'app/shared/model/paciente.model';
import { PacienteService } from 'app/entities/paciente';
import { IMedico } from 'app/shared/model/medico.model';
import { MedicoService } from 'app/entities/medico';
import { IAgendamentoConsulta } from 'app/shared/model/agendamento-consulta.model';
import { AgendamentoConsultaService } from 'app/entities/agendamento-consulta';

@Component({
    selector: 'jhi-consulta-update',
    templateUrl: './consulta-update.component.html'
})
export class ConsultaUpdateComponent implements OnInit {
    consulta: IConsulta;
    isSaving: boolean;

    receitas: IReceita[];

    consultorios: IConsultorio[];

    pacientes: IPaciente[];

    medicos: IMedico[];

    agendamentoconsultas: IAgendamentoConsulta[];
    dataHoraDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private consultaService: ConsultaService,
        private receitaService: ReceitaService,
        private consultorioService: ConsultorioService,
        private pacienteService: PacienteService,
        private medicoService: MedicoService,
        private agendamentoConsultaService: AgendamentoConsultaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ consulta }) => {
            this.consulta = consulta;
        });
        this.receitaService.query({ filter: 'consulta-is-null' }).subscribe(
            (res: HttpResponse<IReceita[]>) => {
                if (!this.consulta.receita || !this.consulta.receita.id) {
                    this.receitas = res.body;
                } else {
                    this.receitaService.find(this.consulta.receita.id).subscribe(
                        (subRes: HttpResponse<IReceita>) => {
                            this.receitas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.consultorioService.query().subscribe(
            (res: HttpResponse<IConsultorio[]>) => {
                this.consultorios = res.body;
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
        this.agendamentoConsultaService.query().subscribe(
            (res: HttpResponse<IAgendamentoConsulta[]>) => {
                this.agendamentoconsultas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.consulta.id !== undefined) {
            this.subscribeToSaveResponse(this.consultaService.update(this.consulta));
        } else {
            this.subscribeToSaveResponse(this.consultaService.create(this.consulta));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IConsulta>>) {
        result.subscribe((res: HttpResponse<IConsulta>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackReceitaById(index: number, item: IReceita) {
        return item.id;
    }

    trackConsultorioById(index: number, item: IConsultorio) {
        return item.id;
    }

    trackPacienteById(index: number, item: IPaciente) {
        return item.id;
    }

    trackMedicoById(index: number, item: IMedico) {
        return item.id;
    }

    trackAgendamentoConsultaById(index: number, item: IAgendamentoConsulta) {
        return item.id;
    }
}
