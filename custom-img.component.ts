import { Component, OnInit, ElementRef, HostListener, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-img',
  templateUrl: './custom-img.component.html',
  styleUrls: ['./custom-img.component.scss']
})
export class CustomImgComponent implements OnInit {

  base64Data : ''; // put base64 data
  @Input('target') target;
  @Output()
  colorChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private elementRef: ElementRef) { }

  elData: any = {};
  ngOnInit() {
    this.elData =
      {
        img: this._('img'),
        canvas: this._('#cs'),
        x: '',
        y: ''
      }
  }

  @HostListener('click', ['$event'])
  clickEvent(e: any) {
    this.processColor(e);
  }


// We don't need to mouse move event for now so commented this out
  @HostListener('mousemove', ['$event'])
  mouseMove(e: any) {
    //this.processColor(e);
  }

  processColor(e: any) {
    if (!this.target) { return; }
    if (e.offsetX) {
      this.elData.x = e.offsetX;
      this.elData.y = e.offsetY;
    }
    else if (e.layerX) {
      this.elData.x = e.layerX;
      this.elData.y = e.layerY;
    }
    this.useCanvas(this.elData.canvas, this.elData.img, () => {
      let p = this.elData.canvas.getContext('2d')
        .getImageData(this.elData.x, this.elData.y, 1, 1).data;

      console.log(p);
      this.colorChange.emit(this.rgbToHex(p[0], p[1], p[2]));
      this.elementRef.nativeElement.style.cursor = 'auto';
    });
  }

  _(el) {
    return this.elementRef.nativeElement.querySelector(el);
  };

  useCanvas(el, image, callback) {
    el.width = image.width;
    el.height = image.height;
    el.getContext('2d')
      .drawImage(image, 0, 0, image.width, image.height);
    return callback();
  }

  componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

}
