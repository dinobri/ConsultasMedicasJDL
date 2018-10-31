/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { SintomaComponent } from 'app/entities/sintoma/sintoma.component';
import { SintomaService } from 'app/entities/sintoma/sintoma.service';
import { Sintoma } from 'app/shared/model/sintoma.model';

describe('Component Tests', () => {
    describe('Sintoma Management Component', () => {
        let comp: SintomaComponent;
        let fixture: ComponentFixture<SintomaComponent>;
        let service: SintomaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [SintomaComponent],
                providers: []
            })
                .overrideTemplate(SintomaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SintomaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SintomaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Sintoma(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sintomas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
