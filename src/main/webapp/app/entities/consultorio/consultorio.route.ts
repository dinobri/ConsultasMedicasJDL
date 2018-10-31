import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Consultorio } from 'app/shared/model/consultorio.model';
import { ConsultorioService } from './consultorio.service';
import { ConsultorioComponent } from './consultorio.component';
import { ConsultorioDetailComponent } from './consultorio-detail.component';
import { ConsultorioUpdateComponent } from './consultorio-update.component';
import { ConsultorioDeletePopupComponent } from './consultorio-delete-dialog.component';
import { IConsultorio } from 'app/shared/model/consultorio.model';

@Injectable({ providedIn: 'root' })
export class ConsultorioResolve implements Resolve<IConsultorio> {
    constructor(private service: ConsultorioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((consultorio: HttpResponse<Consultorio>) => consultorio.body));
        }
        return of(new Consultorio());
    }
}

export const consultorioRoute: Routes = [
    {
        path: 'consultorio',
        component: ConsultorioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consultorios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consultorio/:id/view',
        component: ConsultorioDetailComponent,
        resolve: {
            consultorio: ConsultorioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consultorios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consultorio/new',
        component: ConsultorioUpdateComponent,
        resolve: {
            consultorio: ConsultorioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consultorios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consultorio/:id/edit',
        component: ConsultorioUpdateComponent,
        resolve: {
            consultorio: ConsultorioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consultorios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const consultorioPopupRoute: Routes = [
    {
        path: 'consultorio/:id/delete',
        component: ConsultorioDeletePopupComponent,
        resolve: {
            consultorio: ConsultorioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consultorios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
