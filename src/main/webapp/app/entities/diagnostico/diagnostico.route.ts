import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Diagnostico } from 'app/shared/model/diagnostico.model';
import { DiagnosticoService } from './diagnostico.service';
import { DiagnosticoComponent } from './diagnostico.component';
import { DiagnosticoDetailComponent } from './diagnostico-detail.component';
import { DiagnosticoUpdateComponent } from './diagnostico-update.component';
import { DiagnosticoDeletePopupComponent } from './diagnostico-delete-dialog.component';
import { IDiagnostico } from 'app/shared/model/diagnostico.model';

@Injectable({ providedIn: 'root' })
export class DiagnosticoResolve implements Resolve<IDiagnostico> {
    constructor(private service: DiagnosticoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((diagnostico: HttpResponse<Diagnostico>) => diagnostico.body));
        }
        return of(new Diagnostico());
    }
}

export const diagnosticoRoute: Routes = [
    {
        path: 'diagnostico',
        component: DiagnosticoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Diagnosticos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'diagnostico/:id/view',
        component: DiagnosticoDetailComponent,
        resolve: {
            diagnostico: DiagnosticoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Diagnosticos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'diagnostico/new',
        component: DiagnosticoUpdateComponent,
        resolve: {
            diagnostico: DiagnosticoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Diagnosticos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'diagnostico/:id/edit',
        component: DiagnosticoUpdateComponent,
        resolve: {
            diagnostico: DiagnosticoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Diagnosticos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const diagnosticoPopupRoute: Routes = [
    {
        path: 'diagnostico/:id/delete',
        component: DiagnosticoDeletePopupComponent,
        resolve: {
            diagnostico: DiagnosticoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Diagnosticos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
