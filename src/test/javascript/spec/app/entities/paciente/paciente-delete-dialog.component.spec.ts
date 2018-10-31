/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { PacienteDeleteDialogComponent } from 'app/entities/paciente/paciente-delete-dialog.component';
import { PacienteService } from 'app/entities/paciente/paciente.service';

describe('Component Tests', () => {
    describe('Paciente Management Delete Component', () => {
        let comp: PacienteDeleteDialogComponent;
        let fixture: ComponentFixture<PacienteDeleteDialogComponent>;
        let service: PacienteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [PacienteDeleteDialogComponent]
            })
                .overrideTemplate(PacienteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PacienteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PacienteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
