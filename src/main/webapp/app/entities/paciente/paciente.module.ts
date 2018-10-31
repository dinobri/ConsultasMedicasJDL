import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConsultasMedicasJdlSharedModule } from 'app/shared';
import {
    PacienteComponent,
    PacienteDetailComponent,
    PacienteUpdateComponent,
    PacienteDeletePopupComponent,
    PacienteDeleteDialogComponent,
    pacienteRoute,
    pacientePopupRoute
} from './';

const ENTITY_STATES = [...pacienteRoute, ...pacientePopupRoute];

@NgModule({
    imports: [ConsultasMedicasJdlSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PacienteComponent,
        PacienteDetailComponent,
        PacienteUpdateComponent,
        PacienteDeleteDialogComponent,
        PacienteDeletePopupComponent
    ],
    entryComponents: [PacienteComponent, PacienteUpdateComponent, PacienteDeleteDialogComponent, PacienteDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultasMedicasJdlPacienteModule {}
