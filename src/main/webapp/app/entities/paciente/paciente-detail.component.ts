import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaciente } from 'app/shared/model/paciente.model';

@Component({
    selector: 'jhi-paciente-detail',
    templateUrl: './paciente-detail.component.html'
})
export class PacienteDetailComponent implements OnInit {
    paciente: IPaciente;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ paciente }) => {
            this.paciente = paciente;
        });
    }

    previousState() {
        window.history.back();
    }
}
