import {Component, OnInit} from '@angular/core';
import {Video} from '../video';
import {ActivatedRoute} from '@angular/router';
import {VideoService} from '../video.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  video$: Observable<Video>;

  constructor(private route: ActivatedRoute, private videoService: VideoService) {
    const id = this.route.snapshot.paramMap.get('id');

    this.video$ = this.videoService.getVideo(parseInt(id, 10));
  }

  ngOnInit() {
  }

}
