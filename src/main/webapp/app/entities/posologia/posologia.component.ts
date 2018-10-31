import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPosologia } from 'app/shared/model/posologia.model';
import { Principal } from 'app/core';
import { PosologiaService } from './posologia.service';

@Component({
    selector: 'jhi-posologia',
    templateUrl: './posologia.component.html'
})
export class PosologiaComponent implements OnInit, OnDestroy {
    posologias: IPosologia[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private posologiaService: PosologiaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.posologiaService.query().subscribe(
            (res: HttpResponse<IPosologia[]>) => {
                this.posologias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPosologias();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPosologia) {
        return item.id;
    }

    registerChangeInPosologias() {
        this.eventSubscriber = this.eventManager.subscribe('posologiaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
