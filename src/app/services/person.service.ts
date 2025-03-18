import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Person{
  firstName: string,
  lastName: string
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = 'http://localhost:8080/person';

  constructor(private http: HttpClient) {}

addPerson(person: Person): Observable<Person>{
    return this.http.post<Person>(this.baseUrl, person);
  }

}
