import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { ItemRoute } from '@Core/models/general/navigation/item-route.interface';
import { joinRoute } from '@Shared/helpers/join-route';
import { TabService } from '../../services/tab.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @HostBinding('class')
  classes = 'nav-item';

  //@ts-ignore
  @Input() public item: ItemRoute;

  constructor(private readonly _tabService: TabService) {}

  ngOnInit(): void {
    console.log(this.item)
  }

  public goTo() {
    //@ts-ignore
    //console.log(this.joinRoute(this.item.url))
    //@ts-ignore
    this._tabService.goToView(this.item.id, this.joinRoute(this.item.url));
  }

  public joinRoute(route: string[]) {
    return joinRoute(route);
  }
}