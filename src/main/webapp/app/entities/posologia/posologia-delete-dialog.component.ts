import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPosologia } from 'app/shared/model/posologia.model';
import { PosologiaService } from './posologia.service';

@Component({
    selector: 'jhi-posologia-delete-dialog',
    templateUrl: './posologia-delete-dialog.component.html'
})
export class PosologiaDeleteDialogComponent {
    posologia: IPosologia;

    constructor(private posologiaService: PosologiaService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.posologiaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'posologiaListModification',
                content: 'Deleted an posologia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-posologia-delete-popup',
    template: ''
})
export class PosologiaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ posologia }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PosologiaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.posologia = posologia;
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
