import { Injectable } from '@angular/core';
import { DeclarationRequestType } from '../domain/requests.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeclarationRequestService {
  private generatedDeclarationsSubject = new BehaviorSubject<
    DeclarationRequestType[]
  >([]);
  generatedDeclarations$ = this.generatedDeclarationsSubject.asObservable();

  constructor() {}

  setGeneratedDeclarations(data: DeclarationRequestType[]) {
    this.generatedDeclarationsSubject.next(data);
  }

  getGeneratedDeclarations() {
    return this.generatedDeclarationsSubject.getValue();
  }
}
