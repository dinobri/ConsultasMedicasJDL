import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISintoma } from 'app/shared/model/sintoma.model';
import { SintomaService } from './sintoma.service';
import { IDoenca } from 'app/shared/model/doenca.model';
import { DoencaService } from 'app/entities/doenca';

@Component({
    selector: 'jhi-sintoma-update',
    templateUrl: './sintoma-update.component.html'
})
export class SintomaUpdateComponent implements OnInit {
    sintoma: ISintoma;
    isSaving: boolean;

    doencas: IDoenca[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private sintomaService: SintomaService,
        private doencaService: DoencaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sintoma }) => {
            this.sintoma = sintoma;
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
        if (this.sintoma.id !== undefined) {
            this.subscribeToSaveResponse(this.sintomaService.update(this.sintoma));
        } else {
            this.subscribeToSaveResponse(this.sintomaService.create(this.sintoma));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISintoma>>) {
        result.subscribe((res: HttpResponse<ISintoma>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
