import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';
import { ItemRoute } from '@Core/models/general/navigation/item-route.interface';

@Component({
  selector: 'app-collapsable',
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      state(
        'void',
        style({
          height: '0px',
          // display: 'none',
        })
      ),
      state(
        '*',
        style({
          height: '*',
          // display: 'block',
        })
      ),
      transition('* => void', animate('300ms ease-out')),
      transition('void => *', animate('300ms ease-in')),
    ]),
  ],
})
export class CollapsableComponent implements OnInit {
  //@ts-ignore
  @Input() public item: ItemRoute;

  @HostBinding('class.open')
  public isOpen: boolean = false;

  @HostBinding('class')
  classes = 'nav-collapsable nav-item';

  /**
   * Constructor
   *
   * @param {ChangeDetectorRef} _changeDetectionRef
   */
  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  toggleOpen(ev: any): void {
    ev.preventDefault();
    this.isOpen = !this.isOpen;
    this._changeDetectorRef.markForCheck();
  }

  public expand(): void {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  collapse(): void {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
}