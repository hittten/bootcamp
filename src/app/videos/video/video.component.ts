import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Video} from '../video';
import {Store} from '@ngrx/store';
import {State} from '../../store/reducers';
import {MatButton} from '@angular/material';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  @Input() video: Video;
  @Input() buttonLabel: string;
  @Output() clickImage = new EventEmitter<void>();
  @Output() clickButton = new EventEmitter<MatButton>();

  @ViewChild('check', {static: false}) checkInput: ElementRef;

  isLogged = false;

  constructor(private store: Store<State>) {
    this.store.select('user').subscribe(user => {
      if (user) {
        this.isLogged = true;
      }
    }).unsubscribe();
  }

  ngOnInit() {
  }

  onClickImage() {
    this.clickImage.emit();
  }

  onClickButton(button: MatButton) {
    this.clickButton.emit(button);
  }

  toggleFavorite(video: Video) {
    video.favorite = !video.favorite;
  }

  toggleFavoriteViewChild() {
    this.checkInput.nativeElement.checked = !this.checkInput.nativeElement.checked;
  }
}
