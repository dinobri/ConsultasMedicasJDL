import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConsultasMedicasJdlSharedModule } from 'app/shared';
import {
    SintomaComponent,
    SintomaDetailComponent,
    SintomaUpdateComponent,
    SintomaDeletePopupComponent,
    SintomaDeleteDialogComponent,
    sintomaRoute,
    sintomaPopupRoute
} from './';

const ENTITY_STATES = [...sintomaRoute, ...sintomaPopupRoute];

@NgModule({
    imports: [ConsultasMedicasJdlSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SintomaComponent,
        SintomaDetailComponent,
        SintomaUpdateComponent,
        SintomaDeleteDialogComponent,
        SintomaDeletePopupComponent
    ],
    entryComponents: [SintomaComponent, SintomaUpdateComponent, SintomaDeleteDialogComponent, SintomaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultasMedicasJdlSintomaModule {}
