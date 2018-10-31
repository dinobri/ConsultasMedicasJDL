import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISintoma } from 'app/shared/model/sintoma.model';

type EntityResponseType = HttpResponse<ISintoma>;
type EntityArrayResponseType = HttpResponse<ISintoma[]>;

@Injectable({ providedIn: 'root' })
export class SintomaService {
    public resourceUrl = SERVER_API_URL + 'api/sintomas';

    constructor(private http: HttpClient) {}

    create(sintoma: ISintoma): Observable<EntityResponseType> {
        return this.http.post<ISintoma>(this.resourceUrl, sintoma, { observe: 'response' });
    }

    update(sintoma: ISintoma): Observable<EntityResponseType> {
        return this.http.put<ISintoma>(this.resourceUrl, sintoma, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISintoma>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISintoma[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
