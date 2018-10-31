import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { Principal } from 'app/core';
import { EspecialidadeService } from './especialidade.service';

@Component({
    selector: 'jhi-especialidade',
    templateUrl: './especialidade.component.html'
})
export class EspecialidadeComponent implements OnInit, OnDestroy {
    especialidades: IEspecialidade[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private especialidadeService: EspecialidadeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.especialidadeService.query().subscribe(
            (res: HttpResponse<IEspecialidade[]>) => {
                this.especialidades = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEspecialidades();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEspecialidade) {
        return item.id;
    }

    registerChangeInEspecialidades() {
        this.eventSubscriber = this.eventManager.subscribe('especialidadeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
