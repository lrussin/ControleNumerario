import { ChangeDetectorRef, Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NgClass],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  constructor(
    public NotificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.NotificationService.notificationLine = [...this.NotificationService.notificationLine];
    this.cdr.detectChanges();
  }
}
