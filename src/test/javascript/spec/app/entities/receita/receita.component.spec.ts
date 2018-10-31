/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { ReceitaComponent } from 'app/entities/receita/receita.component';
import { ReceitaService } from 'app/entities/receita/receita.service';
import { Receita } from 'app/shared/model/receita.model';

describe('Component Tests', () => {
    describe('Receita Management Component', () => {
        let comp: ReceitaComponent;
        let fixture: ComponentFixture<ReceitaComponent>;
        let service: ReceitaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [ReceitaComponent],
                providers: []
            })
                .overrideTemplate(ReceitaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReceitaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceitaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Receita(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.receitas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
