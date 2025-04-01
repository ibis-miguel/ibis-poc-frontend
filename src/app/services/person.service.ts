import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

export interface Person{
  firstName: string,
  lastName: string
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = `${environment.apiUrl}/person`;

  constructor(private http: HttpClient) {}

addPerson(person: Person): Observable<Person>{
    return this.http.post<Person>(this.baseUrl, person);
  }

}
