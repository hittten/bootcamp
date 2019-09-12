import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
  @Output() clickButton = new EventEmitter<HTMLButtonElement>();

  @ViewChild('check', {static: false}) checkInput: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  onClickImage() {
    this.clickImage.emit();
  }

  onClickButton(button: HTMLButtonElement) {
    this.clickButton.emit(button);
  }

  toggleFavorite(video: Video) {
    video.favorite = !video.favorite;
  }

  toggleFavoriteViewChild() {
    this.checkInput.nativeElement.checked = !this.checkInput.nativeElement.checked;
  }
}
