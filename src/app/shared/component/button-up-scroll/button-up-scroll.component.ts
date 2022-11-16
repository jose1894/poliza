import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@BCTheme/services/layout.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-button-up-scroll',
  templateUrl: './button-up-scroll.component.html',
  styleUrls: ['./button-up-scroll.component.scss']
})

export class ButtonUpScrollComponent implements OnInit {
  
  public scrollHiddenToolbar$: Observable<boolean>;

  constructor(private _layoutService: LayoutService) {
    this.scrollHiddenToolbar$ = this._layoutService.onHiddenToolbar();
  }

  ngOnInit(): void {}

  public showrHeader(): void {
    this._layoutService.setShowToolbar();
  }
}

