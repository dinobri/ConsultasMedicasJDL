import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConsultasMedicasJdlSharedModule } from 'app/shared';
import {
    MedicoComponent,
    MedicoDetailComponent,
    MedicoUpdateComponent,
    MedicoDeletePopupComponent,
    MedicoDeleteDialogComponent,
    medicoRoute,
    medicoPopupRoute
} from './';

const ENTITY_STATES = [...medicoRoute, ...medicoPopupRoute];

@NgModule({
    imports: [ConsultasMedicasJdlSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MedicoComponent, MedicoDetailComponent, MedicoUpdateComponent, MedicoDeleteDialogComponent, MedicoDeletePopupComponent],
    entryComponents: [MedicoComponent, MedicoUpdateComponent, MedicoDeleteDialogComponent, MedicoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultasMedicasJdlMedicoModule {}
