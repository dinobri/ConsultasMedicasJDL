import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRemedio } from 'app/shared/model/remedio.model';
import { Principal } from 'app/core';
import { RemedioService } from './remedio.service';

@Component({
    selector: 'jhi-remedio',
    templateUrl: './remedio.component.html'
})
export class RemedioComponent implements OnInit, OnDestroy {
    remedios: IRemedio[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private remedioService: RemedioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.remedioService.query().subscribe(
            (res: HttpResponse<IRemedio[]>) => {
                this.remedios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRemedios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRemedio) {
        return item.id;
    }

    registerChangeInRemedios() {
        this.eventSubscriber = this.eventManager.subscribe('remedioListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
