import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReceita } from 'app/shared/model/receita.model';

type EntityResponseType = HttpResponse<IReceita>;
type EntityArrayResponseType = HttpResponse<IReceita[]>;

@Injectable({ providedIn: 'root' })
export class ReceitaService {
    public resourceUrl = SERVER_API_URL + 'api/receitas';

    constructor(private http: HttpClient) {}

    create(receita: IReceita): Observable<EntityResponseType> {
        return this.http.post<IReceita>(this.resourceUrl, receita, { observe: 'response' });
    }

    update(receita: IReceita): Observable<EntityResponseType> {
        return this.http.put<IReceita>(this.resourceUrl, receita, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IReceita>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IReceita[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
