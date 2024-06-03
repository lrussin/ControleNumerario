import { Injectable } from '@angular/core';

interface NotificationInterface {
  notificationMessage: string;
  functionOnMessage?: Function;
  clearNotificationTimeOut: number | undefined;
  toLeave: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {}

  private _leaveTimer = 400;

  public notificationLine: NotificationInterface[] = [];

  public setNotificationMessage(notificationMessage: string): void {
    if (notificationMessage !== "") {
      let newNotification: NotificationInterface = {
        notificationMessage: notificationMessage,
        functionOnMessage: undefined,
        clearNotificationTimeOut: undefined,
        toLeave: false,
      }

      newNotification.clearNotificationTimeOut = window.setTimeout(() => {
        newNotification.toLeave = true;
        setTimeout(() => {
          this.notificationLine.shift();
        }, this._leaveTimer);
      }, 10000);

      this.notificationLine.push(newNotification);
    }
  }

  public setFunctionOnMessage(newFunction: Function): void {
    if (this.notificationLine.length > 0) {
      this.notificationLine[this.notificationLine.length - 1].functionOnMessage = newFunction;
    }
  }

  public closeNotification(index: number): void {
    this.notificationLine[index].toLeave = true;
    setTimeout(() => {
      this.notificationLine.splice(index, 1);
    }, this._leaveTimer);
  }
}
