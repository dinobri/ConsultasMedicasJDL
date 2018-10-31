import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMedico } from 'app/shared/model/medico.model';
import { Principal } from 'app/core';
import { MedicoService } from './medico.service';

@Component({
    selector: 'jhi-medico',
    templateUrl: './medico.component.html'
})
export class MedicoComponent implements OnInit, OnDestroy {
    medicos: IMedico[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private medicoService: MedicoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.medicoService.query().subscribe(
            (res: HttpResponse<IMedico[]>) => {
                this.medicos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMedicos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMedico) {
        return item.id;
    }

    registerChangeInMedicos() {
        this.eventSubscriber = this.eventManager.subscribe('medicoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
