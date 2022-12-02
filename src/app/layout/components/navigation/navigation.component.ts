import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ItemRoute } from '@Core/models/general/navigation/item-route.interface';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  //@ts-ignore
  @Input() navigation: ItemRoute[];

  /**
   * Constructor
   */
  constructor() {}

  ngOnInit(): void {
    //console.log('NavigationComponent')
    console.log(this.navigation)
  }
}