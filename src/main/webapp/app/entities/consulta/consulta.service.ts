import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConsulta } from 'app/shared/model/consulta.model';

type EntityResponseType = HttpResponse<IConsulta>;
type EntityArrayResponseType = HttpResponse<IConsulta[]>;

@Injectable({ providedIn: 'root' })
export class ConsultaService {
    public resourceUrl = SERVER_API_URL + 'api/consultas';

    constructor(private http: HttpClient) {}

    create(consulta: IConsulta): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(consulta);
        return this.http
            .post<IConsulta>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(consulta: IConsulta): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(consulta);
        return this.http
            .put<IConsulta>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IConsulta>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IConsulta[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(consulta: IConsulta): IConsulta {
        const copy: IConsulta = Object.assign({}, consulta, {
            dataHora: consulta.dataHora != null && consulta.dataHora.isValid() ? consulta.dataHora.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dataHora = res.body.dataHora != null ? moment(res.body.dataHora) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((consulta: IConsulta) => {
            consulta.dataHora = consulta.dataHora != null ? moment(consulta.dataHora) : null;
        });
        return res;
    }
}
