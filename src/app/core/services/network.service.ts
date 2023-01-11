import { Injectable, Inject } from '@angular/core';
import { Observable, merge, fromEvent, of } from 'rxjs';
import { takeUntil, mapTo, map } from 'rxjs/operators';

export enum StatusConnection {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private _isOnline$: Observable<boolean>;
  private _connectionStatus: StatusConnection = StatusConnection.OFFLINE;

  constructor(@Inject('Window') private _window: Window) {
    this._isOnline$ = merge(
      of(navigator.onLine),
      fromEvent(this._window, StatusConnection.ONLINE).pipe(mapTo(true)),
      fromEvent(this._window, StatusConnection.OFFLINE).pipe(mapTo(false))
    );
  }

  /**
   * init
   */
  public init() {
    this._isOnline$.subscribe((value) => {
      this._connectionStatus = value
        ? StatusConnection.ONLINE
        : StatusConnection.OFFLINE;
    });
  }

  public get connectionStatus(): StatusConnection {
    return this._connectionStatus;
  }

  public onIsOnline(): Observable<StatusConnection> {
    return this._isOnline$.pipe(
      map((value) => (value ? StatusConnection.ONLINE : StatusConnection.OFFLINE))
    );
  }
}
