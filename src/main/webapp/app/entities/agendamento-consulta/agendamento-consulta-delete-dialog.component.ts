import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgendamentoConsulta } from 'app/shared/model/agendamento-consulta.model';
import { AgendamentoConsultaService } from './agendamento-consulta.service';

@Component({
    selector: 'jhi-agendamento-consulta-delete-dialog',
    templateUrl: './agendamento-consulta-delete-dialog.component.html'
})
export class AgendamentoConsultaDeleteDialogComponent {
    agendamentoConsulta: IAgendamentoConsulta;

    constructor(
        private agendamentoConsultaService: AgendamentoConsultaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.agendamentoConsultaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'agendamentoConsultaListModification',
                content: 'Deleted an agendamentoConsulta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-agendamento-consulta-delete-popup',
    template: ''
})
export class AgendamentoConsultaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agendamentoConsulta }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AgendamentoConsultaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.agendamentoConsulta = agendamentoConsulta;
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
