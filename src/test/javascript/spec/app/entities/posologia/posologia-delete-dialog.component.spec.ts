/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { PosologiaDeleteDialogComponent } from 'app/entities/posologia/posologia-delete-dialog.component';
import { PosologiaService } from 'app/entities/posologia/posologia.service';

describe('Component Tests', () => {
    describe('Posologia Management Delete Component', () => {
        let comp: PosologiaDeleteDialogComponent;
        let fixture: ComponentFixture<PosologiaDeleteDialogComponent>;
        let service: PosologiaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [PosologiaDeleteDialogComponent]
            })
                .overrideTemplate(PosologiaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PosologiaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PosologiaService);
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
