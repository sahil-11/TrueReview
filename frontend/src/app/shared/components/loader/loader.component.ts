import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  @Input() loaderText: string = 'Uploading...';
  loaderTextArray: string[];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.maptext();
  }

  maptext() {
    if (this.loaderText) {
      this.loaderTextArray = this.loaderText.split('');
    }
  }
}
