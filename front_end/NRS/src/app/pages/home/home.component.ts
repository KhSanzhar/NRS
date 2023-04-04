import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //Testing data, in the future will be taken from db
  videos = [
  { id: 1, title: 'Video 1' },
  { id: 2, title: 'Video 2' },
  { id: 3, title: 'Video 3' },
  { id: 4, title: 'Video 4' },
  { id: 5, title: 'Video 5' },
  { id: 1, title: 'Video 1' },
  { id: 2, title: 'Video 2' },
  { id: 3, title: 'Video 3' },
  { id: 4, title: 'Video 4' },
  { id: 5, title: 'Video 5' },
  { id: 1, title: 'Video 1' },
  { id: 2, title: 'Video 2' },
  { id: 3, title: 'Video 3' },
  { id: 4, title: 'Video 4' },
  { id: 5, title: 'Video 5' }
];
}
