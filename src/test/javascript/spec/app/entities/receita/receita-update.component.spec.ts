/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { ReceitaUpdateComponent } from 'app/entities/receita/receita-update.component';
import { ReceitaService } from 'app/entities/receita/receita.service';
import { Receita } from 'app/shared/model/receita.model';

describe('Component Tests', () => {
    describe('Receita Management Update Component', () => {
        let comp: ReceitaUpdateComponent;
        let fixture: ComponentFixture<ReceitaUpdateComponent>;
        let service: ReceitaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [ReceitaUpdateComponent]
            })
                .overrideTemplate(ReceitaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReceitaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceitaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Receita(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receita = entity;
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
                    const entity = new Receita();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receita = entity;
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
