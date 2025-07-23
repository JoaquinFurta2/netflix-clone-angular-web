import { effect, Injectable, signal } from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Injectable({  providedIn: 'root',})

export class HoverService {
  /*   ishover =  signal<number>(0)
    origin = signal<CdkOverlayOrigin | null >(null)
    isFirst = signal(true) */

    
    Modal = signal(false)
    toggleModal = () => {
        this.Modal() 
        ? this.Modal.set(false) 
        : this.Modal.set(true)
    }
}