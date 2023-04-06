import {Video} from "../modules/video";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class VideoServices {
  constructor(private http: HttpClient) {
  }

  //here we will get uploaded videos
  getAll():Observable<Video[]> {
    // return this.http.get<Video[]>('http://localhost') this from our site
    return this.http.get<Video[]>('https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/video.json')
  }
}
