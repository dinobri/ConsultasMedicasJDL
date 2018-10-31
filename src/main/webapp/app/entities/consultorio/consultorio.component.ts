import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IConsultorio } from 'app/shared/model/consultorio.model';
import { Principal } from 'app/core';
import { ConsultorioService } from './consultorio.service';

@Component({
    selector: 'jhi-consultorio',
    templateUrl: './consultorio.component.html'
})
export class ConsultorioComponent implements OnInit, OnDestroy {
    consultorios: IConsultorio[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private consultorioService: ConsultorioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.consultorioService.query().subscribe(
            (res: HttpResponse<IConsultorio[]>) => {
                this.consultorios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInConsultorios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IConsultorio) {
        return item.id;
    }

    registerChangeInConsultorios() {
        this.eventSubscriber = this.eventManager.subscribe('consultorioListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
