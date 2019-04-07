import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private sourceQuestion = new BehaviorSubject(null);
  question = this.sourceQuestion.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
  ) { }

  requestQuestions(query: any) {
    return this.apiService.httpGetRequest('/questions', { params: query }).subscribe(data => {
      this.sourceQuestion.next(data.questions);
    });
  }
}
