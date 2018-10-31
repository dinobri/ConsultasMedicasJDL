import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiagnostico } from 'app/shared/model/diagnostico.model';

@Component({
    selector: 'jhi-diagnostico-detail',
    templateUrl: './diagnostico-detail.component.html'
})
export class DiagnosticoDetailComponent implements OnInit {
    diagnostico: IDiagnostico;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ diagnostico }) => {
            this.diagnostico = diagnostico;
        });
    }

    previousState() {
        window.history.back();
    }
}
