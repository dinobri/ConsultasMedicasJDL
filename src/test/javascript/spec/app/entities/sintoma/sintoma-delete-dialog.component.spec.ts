/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { SintomaDeleteDialogComponent } from 'app/entities/sintoma/sintoma-delete-dialog.component';
import { SintomaService } from 'app/entities/sintoma/sintoma.service';

describe('Component Tests', () => {
    describe('Sintoma Management Delete Component', () => {
        let comp: SintomaDeleteDialogComponent;
        let fixture: ComponentFixture<SintomaDeleteDialogComponent>;
        let service: SintomaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [SintomaDeleteDialogComponent]
            })
                .overrideTemplate(SintomaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SintomaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SintomaService);
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
