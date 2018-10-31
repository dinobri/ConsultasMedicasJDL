import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { EspecialidadeService } from './especialidade.service';

@Component({
    selector: 'jhi-especialidade-delete-dialog',
    templateUrl: './especialidade-delete-dialog.component.html'
})
export class EspecialidadeDeleteDialogComponent {
    especialidade: IEspecialidade;

    constructor(
        private especialidadeService: EspecialidadeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.especialidadeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'especialidadeListModification',
                content: 'Deleted an especialidade'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-especialidade-delete-popup',
    template: ''
})
export class EspecialidadeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ especialidade }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EspecialidadeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.especialidade = especialidade;
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
