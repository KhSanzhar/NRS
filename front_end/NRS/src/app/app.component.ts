import {Component, OnInit} from '@angular/core';
import {Video} from "./modules/video";
import {VideoServices} from "./services/video.services";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'NRS';

  videos: Video[] = []

  constructor(private videoServices: VideoServices) {
  }
  ngOnInit(): void {
    this.videoServices.getAll().subscribe(videos => {
      this.videos = videos
    })
  }

}
