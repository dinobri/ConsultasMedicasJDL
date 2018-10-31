import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConsultasMedicasJdlSharedModule } from 'app/shared';
import {
    PosologiaComponent,
    PosologiaDetailComponent,
    PosologiaUpdateComponent,
    PosologiaDeletePopupComponent,
    PosologiaDeleteDialogComponent,
    posologiaRoute,
    posologiaPopupRoute
} from './';

const ENTITY_STATES = [...posologiaRoute, ...posologiaPopupRoute];

@NgModule({
    imports: [ConsultasMedicasJdlSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PosologiaComponent,
        PosologiaDetailComponent,
        PosologiaUpdateComponent,
        PosologiaDeleteDialogComponent,
        PosologiaDeletePopupComponent
    ],
    entryComponents: [PosologiaComponent, PosologiaUpdateComponent, PosologiaDeleteDialogComponent, PosologiaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultasMedicasJdlPosologiaModule {}
