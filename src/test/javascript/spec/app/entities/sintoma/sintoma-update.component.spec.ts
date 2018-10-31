/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { SintomaUpdateComponent } from 'app/entities/sintoma/sintoma-update.component';
import { SintomaService } from 'app/entities/sintoma/sintoma.service';
import { Sintoma } from 'app/shared/model/sintoma.model';

describe('Component Tests', () => {
    describe('Sintoma Management Update Component', () => {
        let comp: SintomaUpdateComponent;
        let fixture: ComponentFixture<SintomaUpdateComponent>;
        let service: SintomaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [SintomaUpdateComponent]
            })
                .overrideTemplate(SintomaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SintomaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SintomaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Sintoma(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sintoma = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Sintoma();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sintoma = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
