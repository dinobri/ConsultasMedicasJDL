import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAgendamentoConsulta } from 'app/shared/model/agendamento-consulta.model';

type EntityResponseType = HttpResponse<IAgendamentoConsulta>;
type EntityArrayResponseType = HttpResponse<IAgendamentoConsulta[]>;

@Injectable({ providedIn: 'root' })
export class AgendamentoConsultaService {
    public resourceUrl = SERVER_API_URL + 'api/agendamento-consultas';

    constructor(private http: HttpClient) {}

    create(agendamentoConsulta: IAgendamentoConsulta): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(agendamentoConsulta);
        return this.http
            .post<IAgendamentoConsulta>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(agendamentoConsulta: IAgendamentoConsulta): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(agendamentoConsulta);
        return this.http
            .put<IAgendamentoConsulta>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAgendamentoConsulta>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAgendamentoConsulta[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(agendamentoConsulta: IAgendamentoConsulta): IAgendamentoConsulta {
        const copy: IAgendamentoConsulta = Object.assign({}, agendamentoConsulta, {
            data:
                agendamentoConsulta.data != null && agendamentoConsulta.data.isValid() ? agendamentoConsulta.data.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.data = res.body.data != null ? moment(res.body.data) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((agendamentoConsulta: IAgendamentoConsulta) => {
            agendamentoConsulta.data = agendamentoConsulta.data != null ? moment(agendamentoConsulta.data) : null;
        });
        return res;
    }
}
