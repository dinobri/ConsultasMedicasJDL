import { NgModule } from '@angular/core';

import { ConsultasMedicasJdlSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [ConsultasMedicasJdlSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ConsultasMedicasJdlSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ConsultasMedicasJdlSharedCommonModule {}
