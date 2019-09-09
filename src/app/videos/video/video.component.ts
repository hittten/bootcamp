import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Video} from '../video';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, OnChanges {
  @Input() video: Video;
  @Input() buttonLabel: string;
  @Output() clickImage = new EventEmitter<void>();
  @Output() clickButton = new EventEmitter<void>();

  @ViewChild('check', {static: false}) checkInput: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  onClickImage() {
    this.clickImage.emit();
  }

  onClickButton() {
    this.clickButton.emit();
  }

  toggleFavorite(video: Video) {
    video.favorite = !video.favorite;
  }

  toggleFavoriteViewChild() {
    this.checkInput.nativeElement.checked = !this.checkInput.nativeElement.checked;
  }
}
