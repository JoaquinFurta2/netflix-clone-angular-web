import { Component, ViewChild, ElementRef, HostListener, viewChild, signal } from '@angular/core';
import { NotificationsComponent } from './ui/notifications/notifications.component';
import { PorfileComponent } from './ui/porfile/porfile.component';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [NotificationsComponent, PorfileComponent, RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  host:{'(window:scroll)': 'onScroll()'},
})
export class NavbarComponent {
  navItems = [{name: 'Home', href: '/'},{name: 'Tv Shows', href: '/series'}, {name: 'Movies', href: '/movies'}, {name: 'My List', href: '/my-list'}]
  inputPlaceholder = "Titles, people, genres"  
  searchButClicked = false
  notiDropdown = false
  hideDropdownTimeoutofNoti : any;

  porfileDropdown = false
  hideDropdownTimeoutofPorfile : any;

  navBackground = signal(false)
  isMobile = false


  constructor(private router: Router) {}

  onScroll() {
    this.navBackground.set(window.scrollY > 100)
  }

  onTop() {  
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }, 5);
  }


  onSearchClick() {
      this.searchButClicked = true
      setTimeout(() => {
        fromEvent(this.searchInput.nativeElement, 'input')
        .pipe(
            map((event: any) => event.target.value),
            debounceTime(600)
        )
        .subscribe((query) => {
            this.performSearch(query);
        });
        this.searchInput.nativeElement.focus();
      },100);
  }

    onMouseLeave(dropdown : "noti" | "porfile") {
      let timeout: any
      timeout = setTimeout(() => {
        if (dropdown === "noti")
          this.notiDropdown = false;
        else {
          this.porfileDropdown = false;
        }
      }, 200);
      dropdown === 'noti'
       ? this.hideDropdownTimeoutofNoti = timeout 
       : this.hideDropdownTimeoutofPorfile = timeout
  }

  onMouseEnter(dropdown : "noti" | "porfile" ) {
      dropdown === 'noti' 
      ? clearTimeout(this.hideDropdownTimeoutofNoti)
      : clearTimeout(this.hideDropdownTimeoutofPorfile)
     
      if (dropdown === "noti")
        this.notiDropdown = true;
      else {
        this.porfileDropdown = true;
      }
  }


  isActive: 'explore' | 'notifications' | 'profile' | null = null;


  toggleDropdown(dropdown: 'explore' | 'notifications' | 'profile'): void {
    this.isActive = this.isActive === dropdown ? null : dropdown;
  }

  isActiveFunc(dropdown: 'explore' | 'notifications' | 'profile'): boolean {
    return this.isActive === dropdown;
  }



  @ViewChild('searchInput') searchInput!: ElementRef;

  performSearch(query:string) {
    let q = query.trim()
    this.router.navigate(['/search'], { queryParams: { q: q } });
  }


  
  @HostListener('document:click', ['$event'])
   onDocumentClick(e:Event) :void {
     if(this.searchInput && 
        !this.searchInput.nativeElement.contains(e.target)){
        setTimeout(() => {
          this.searchButClicked = false
        }, 100);
       
     }
   }

   @HostListener('window:resize', [])
   onResize() {
     this.isMobile = window.innerWidth <= 550; 
   }
 
   ngOnInit() {
     this.isMobile = window.innerWidth <= 550;
     
   }

}
