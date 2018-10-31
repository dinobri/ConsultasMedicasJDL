import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPosologia } from 'app/shared/model/posologia.model';

type EntityResponseType = HttpResponse<IPosologia>;
type EntityArrayResponseType = HttpResponse<IPosologia[]>;

@Injectable({ providedIn: 'root' })
export class PosologiaService {
    public resourceUrl = SERVER_API_URL + 'api/posologias';

    constructor(private http: HttpClient) {}

    create(posologia: IPosologia): Observable<EntityResponseType> {
        return this.http.post<IPosologia>(this.resourceUrl, posologia, { observe: 'response' });
    }

    update(posologia: IPosologia): Observable<EntityResponseType> {
        return this.http.put<IPosologia>(this.resourceUrl, posologia, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPosologia>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPosologia[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
