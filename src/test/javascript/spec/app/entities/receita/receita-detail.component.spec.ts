/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { ReceitaDetailComponent } from 'app/entities/receita/receita-detail.component';
import { Receita } from 'app/shared/model/receita.model';

describe('Component Tests', () => {
    describe('Receita Management Detail Component', () => {
        let comp: ReceitaDetailComponent;
        let fixture: ComponentFixture<ReceitaDetailComponent>;
        const route = ({ data: of({ receita: new Receita(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [ReceitaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ReceitaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReceitaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.receita).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
