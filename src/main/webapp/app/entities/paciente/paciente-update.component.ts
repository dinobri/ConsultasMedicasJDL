import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IPaciente } from 'app/shared/model/paciente.model';
import { PacienteService } from './paciente.service';
import { IDoenca } from 'app/shared/model/doenca.model';
import { DoencaService } from 'app/entities/doenca';

@Component({
    selector: 'jhi-paciente-update',
    templateUrl: './paciente-update.component.html'
})
export class PacienteUpdateComponent implements OnInit {
    paciente: IPaciente;
    isSaving: boolean;

    doencas: IDoenca[];
    dataNascimentoDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private pacienteService: PacienteService,
        private doencaService: DoencaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ paciente }) => {
            this.paciente = paciente;
        });
        this.doencaService.query().subscribe(
            (res: HttpResponse<IDoenca[]>) => {
                this.doencas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.paciente.id !== undefined) {
            this.subscribeToSaveResponse(this.pacienteService.update(this.paciente));
        } else {
            this.subscribeToSaveResponse(this.pacienteService.create(this.paciente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPaciente>>) {
        result.subscribe((res: HttpResponse<IPaciente>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
