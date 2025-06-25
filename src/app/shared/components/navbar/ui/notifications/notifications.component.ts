import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'nav-notifications',
  imports: [NgOptimizedImage],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  items = [{img: '/images/notification-1.jpg', 
            title:"Top 10 TV Show: England", 
            desc: " See what's popular.", 
            ago: "1 day ago"}, 
            {img: '/images/notification-2.jpg', title:"Last call to watch", desc: "Time's almost up on these", ago: "3 day ago"},{img: '/images/notification-3.jpg', title:"Last call to watch", desc: "Time's almost up on these", ago: "3 day ago"},{img: '/images/notification-4.jpg', title:"Last call to watch", desc: "Time's almost up on these", ago: "3 day ago"},{img: '/images/notification-5.jpg', title:"Last call to watch", desc: "Time's almost up on these", ago: "3 day ago"},{img: '/images/notification-6.jpg', title:"Last call to watch", desc: "Time's almost up on these", ago: "3 day ago"},{img: '/images/notification-7.jpg', title:"Last call to watch", desc: "Time's almost up on these", ago: "3 day ago"},{img: '/images/notification-8.jpg', title:"Last call to watch", desc: "Time's almost up on these", ago: "3 day ago"}]
}
