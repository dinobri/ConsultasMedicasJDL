import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDiagnostico } from 'app/shared/model/diagnostico.model';
import { DiagnosticoService } from './diagnostico.service';
import { IDoenca } from 'app/shared/model/doenca.model';
import { DoencaService } from 'app/entities/doenca';
import { IConsulta } from 'app/shared/model/consulta.model';
import { ConsultaService } from 'app/entities/consulta';
import { IPaciente } from 'app/shared/model/paciente.model';
import { PacienteService } from 'app/entities/paciente';

@Component({
    selector: 'jhi-diagnostico-update',
    templateUrl: './diagnostico-update.component.html'
})
export class DiagnosticoUpdateComponent implements OnInit {
    diagnostico: IDiagnostico;
    isSaving: boolean;

    doencas: IDoenca[];

    consultas: IConsulta[];

    pacientes: IPaciente[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private diagnosticoService: DiagnosticoService,
        private doencaService: DoencaService,
        private consultaService: ConsultaService,
        private pacienteService: PacienteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ diagnostico }) => {
            this.diagnostico = diagnostico;
        });
        this.doencaService.query().subscribe(
            (res: HttpResponse<IDoenca[]>) => {
                this.doencas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.consultaService.query().subscribe(
            (res: HttpResponse<IConsulta[]>) => {
                this.consultas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.pacienteService.query().subscribe(
            (res: HttpResponse<IPaciente[]>) => {
                this.pacientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.diagnostico.id !== undefined) {
            this.subscribeToSaveResponse(this.diagnosticoService.update(this.diagnostico));
        } else {
            this.subscribeToSaveResponse(this.diagnosticoService.create(this.diagnostico));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDiagnostico>>) {
        result.subscribe((res: HttpResponse<IDiagnostico>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDoencaById(index: number, item: IDoenca) {
        return item.id;
    }

    trackConsultaById(index: number, item: IConsulta) {
        return item.id;
    }

    trackPacienteById(index: number, item: IPaciente) {
        return item.id;
    }
}
