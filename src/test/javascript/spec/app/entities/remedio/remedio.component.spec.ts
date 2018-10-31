/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { RemedioComponent } from 'app/entities/remedio/remedio.component';
import { RemedioService } from 'app/entities/remedio/remedio.service';
import { Remedio } from 'app/shared/model/remedio.model';

describe('Component Tests', () => {
    describe('Remedio Management Component', () => {
        let comp: RemedioComponent;
        let fixture: ComponentFixture<RemedioComponent>;
        let service: RemedioService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [RemedioComponent],
                providers: []
            })
                .overrideTemplate(RemedioComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RemedioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RemedioService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Remedio(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.remedios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
