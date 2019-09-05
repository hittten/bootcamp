import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Video} from '../video';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  @Input() video: Video;
  @Input() buttonLabel: string;
  @Output() clickImage = new EventEmitter<void>();
  @Output() clickButton = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  onClickImage() {
    this.clickImage.emit();
  }

  onClickButton() {
    this.clickButton.emit();
  }
}
