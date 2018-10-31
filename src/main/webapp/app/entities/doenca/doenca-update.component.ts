import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDoenca } from 'app/shared/model/doenca.model';
import { DoencaService } from './doenca.service';
import { ISintoma } from 'app/shared/model/sintoma.model';
import { SintomaService } from 'app/entities/sintoma';
import { IPaciente } from 'app/shared/model/paciente.model';
import { PacienteService } from 'app/entities/paciente';

@Component({
    selector: 'jhi-doenca-update',
    templateUrl: './doenca-update.component.html'
})
export class DoencaUpdateComponent implements OnInit {
    doenca: IDoenca;
    isSaving: boolean;

    sintomas: ISintoma[];

    pacientes: IPaciente[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private doencaService: DoencaService,
        private sintomaService: SintomaService,
        private pacienteService: PacienteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ doenca }) => {
            this.doenca = doenca;
        });
        this.sintomaService.query().subscribe(
            (res: HttpResponse<ISintoma[]>) => {
                this.sintomas = res.body;
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
        if (this.doenca.id !== undefined) {
            this.subscribeToSaveResponse(this.doencaService.update(this.doenca));
        } else {
            this.subscribeToSaveResponse(this.doencaService.create(this.doenca));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDoenca>>) {
        result.subscribe((res: HttpResponse<IDoenca>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSintomaById(index: number, item: ISintoma) {
        return item.id;
    }

    trackPacienteById(index: number, item: IPaciente) {
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
