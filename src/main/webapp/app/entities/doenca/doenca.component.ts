import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDoenca } from 'app/shared/model/doenca.model';
import { Principal } from 'app/core';
import { DoencaService } from './doenca.service';

@Component({
    selector: 'jhi-doenca',
    templateUrl: './doenca.component.html'
})
export class DoencaComponent implements OnInit, OnDestroy {
    doencas: IDoenca[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private doencaService: DoencaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.doencaService.query().subscribe(
            (res: HttpResponse<IDoenca[]>) => {
                this.doencas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDoencas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDoenca) {
        return item.id;
    }

    registerChangeInDoencas() {
        this.eventSubscriber = this.eventManager.subscribe('doencaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
