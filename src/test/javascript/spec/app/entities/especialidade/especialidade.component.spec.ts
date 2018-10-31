/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { EspecialidadeComponent } from 'app/entities/especialidade/especialidade.component';
import { EspecialidadeService } from 'app/entities/especialidade/especialidade.service';
import { Especialidade } from 'app/shared/model/especialidade.model';

describe('Component Tests', () => {
    describe('Especialidade Management Component', () => {
        let comp: EspecialidadeComponent;
        let fixture: ComponentFixture<EspecialidadeComponent>;
        let service: EspecialidadeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [EspecialidadeComponent],
                providers: []
            })
                .overrideTemplate(EspecialidadeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EspecialidadeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EspecialidadeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Especialidade(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.especialidades[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
