import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { EspecialidadeService } from './especialidade.service';
import { IMedico } from 'app/shared/model/medico.model';
import { MedicoService } from 'app/entities/medico';

@Component({
    selector: 'jhi-especialidade-update',
    templateUrl: './especialidade-update.component.html'
})
export class EspecialidadeUpdateComponent implements OnInit {
    especialidade: IEspecialidade;
    isSaving: boolean;

    medicos: IMedico[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private especialidadeService: EspecialidadeService,
        private medicoService: MedicoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ especialidade }) => {
            this.especialidade = especialidade;
        });
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
        if (this.especialidade.id !== undefined) {
            this.subscribeToSaveResponse(this.especialidadeService.update(this.especialidade));
        } else {
            this.subscribeToSaveResponse(this.especialidadeService.create(this.especialidade));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEspecialidade>>) {
        result.subscribe((res: HttpResponse<IEspecialidade>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMedicoById(index: number, item: IMedico) {
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
