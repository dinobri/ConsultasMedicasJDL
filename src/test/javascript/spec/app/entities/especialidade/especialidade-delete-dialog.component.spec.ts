/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { EspecialidadeDeleteDialogComponent } from 'app/entities/especialidade/especialidade-delete-dialog.component';
import { EspecialidadeService } from 'app/entities/especialidade/especialidade.service';

describe('Component Tests', () => {
    describe('Especialidade Management Delete Component', () => {
        let comp: EspecialidadeDeleteDialogComponent;
        let fixture: ComponentFixture<EspecialidadeDeleteDialogComponent>;
        let service: EspecialidadeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [EspecialidadeDeleteDialogComponent]
            })
                .overrideTemplate(EspecialidadeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EspecialidadeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EspecialidadeService);
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
