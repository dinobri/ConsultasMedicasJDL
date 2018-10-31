import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISintoma } from 'app/shared/model/sintoma.model';
import { SintomaService } from './sintoma.service';

@Component({
    selector: 'jhi-sintoma-delete-dialog',
    templateUrl: './sintoma-delete-dialog.component.html'
})
export class SintomaDeleteDialogComponent {
    sintoma: ISintoma;

    constructor(private sintomaService: SintomaService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sintomaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sintomaListModification',
                content: 'Deleted an sintoma'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sintoma-delete-popup',
    template: ''
})
export class SintomaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sintoma }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SintomaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.sintoma = sintoma;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
