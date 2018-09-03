import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {


  target: any = '';
  colorItems: any = ['body', 'header', 'action'];
  data : any = {};
  constructor(private elementRef: ElementRef) { }

  getColor(data : any){
    this.data[this.target] =  data;
}
  onClick($event) {
      this.target = $event.target.id;
  }

  ngOnInit() {
    
   
  }
}
