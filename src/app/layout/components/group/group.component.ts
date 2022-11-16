import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ItemRoute } from '@Core/models/general/navigation/item-route.interface';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @HostBinding('class')
  classes = 'nav-group nav-item';
  //@ts-ignore
  @Input()  item: ItemRoute;

  constructor() {}

  ngOnInit(): void {
    console.log(this.item)
  }
}
