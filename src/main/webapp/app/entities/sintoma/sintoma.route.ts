import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sintoma } from 'app/shared/model/sintoma.model';
import { SintomaService } from './sintoma.service';
import { SintomaComponent } from './sintoma.component';
import { SintomaDetailComponent } from './sintoma-detail.component';
import { SintomaUpdateComponent } from './sintoma-update.component';
import { SintomaDeletePopupComponent } from './sintoma-delete-dialog.component';
import { ISintoma } from 'app/shared/model/sintoma.model';

@Injectable({ providedIn: 'root' })
export class SintomaResolve implements Resolve<ISintoma> {
    constructor(private service: SintomaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((sintoma: HttpResponse<Sintoma>) => sintoma.body));
        }
        return of(new Sintoma());
    }
}

export const sintomaRoute: Routes = [
    {
        path: 'sintoma',
        component: SintomaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sintomas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sintoma/:id/view',
        component: SintomaDetailComponent,
        resolve: {
            sintoma: SintomaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sintomas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sintoma/new',
        component: SintomaUpdateComponent,
        resolve: {
            sintoma: SintomaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sintomas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sintoma/:id/edit',
        component: SintomaUpdateComponent,
        resolve: {
            sintoma: SintomaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sintomas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sintomaPopupRoute: Routes = [
    {
        path: 'sintoma/:id/delete',
        component: SintomaDeletePopupComponent,
        resolve: {
            sintoma: SintomaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sintomas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
