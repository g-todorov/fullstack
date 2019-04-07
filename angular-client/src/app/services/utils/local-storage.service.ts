import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key) {
    const currentItems = localStorage.getItem(key);
    return currentItems == null ? [] : JSON.parse(currentItems);
  }

  setItem(key, data) {
    const stringifiedItems = JSON.stringify(data);
    localStorage.setItem(key, stringifiedItems);
  }

  // removeItem(key) {
  //
  // }
}
