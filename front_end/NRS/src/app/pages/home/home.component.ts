import { Component } from '@angular/core';
import { Videos } from '../../data/videos';
import { Video } from '../../modules/video';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  video: Video[] = []



}
