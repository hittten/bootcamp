import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectRouteId, selectVideoDetail, selectVideoLoading} from '../../store/selectors';
import {getVideo} from '../../store/actions/video.actions';
import {State} from '../../store/reducers';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  video$ = this.store.select(selectVideoDetail);
  loading$ = this.store.select(selectVideoLoading);

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.store.select(selectRouteId).subscribe(id => {
      this.store.dispatch(getVideo({id: parseInt(id, 10)}));
    }).unsubscribe();
  }
}
