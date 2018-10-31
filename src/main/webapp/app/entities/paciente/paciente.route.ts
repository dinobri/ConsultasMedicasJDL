import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paciente } from 'app/shared/model/paciente.model';
import { PacienteService } from './paciente.service';
import { PacienteComponent } from './paciente.component';
import { PacienteDetailComponent } from './paciente-detail.component';
import { PacienteUpdateComponent } from './paciente-update.component';
import { PacienteDeletePopupComponent } from './paciente-delete-dialog.component';
import { IPaciente } from 'app/shared/model/paciente.model';

@Injectable({ providedIn: 'root' })
export class PacienteResolve implements Resolve<IPaciente> {
    constructor(private service: PacienteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((paciente: HttpResponse<Paciente>) => paciente.body));
        }
        return of(new Paciente());
    }
}

export const pacienteRoute: Routes = [
    {
        path: 'paciente',
        component: PacienteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pacientes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'paciente/:id/view',
        component: PacienteDetailComponent,
        resolve: {
            paciente: PacienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pacientes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'paciente/new',
        component: PacienteUpdateComponent,
        resolve: {
            paciente: PacienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pacientes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'paciente/:id/edit',
        component: PacienteUpdateComponent,
        resolve: {
            paciente: PacienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pacientes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pacientePopupRoute: Routes = [
    {
        path: 'paciente/:id/delete',
        component: PacienteDeletePopupComponent,
        resolve: {
            paciente: PacienteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pacientes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
