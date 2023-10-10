import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {

  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: any = [];
  @Input() depth: number;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  constructor( public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    console.log(this.item);
  }

  onItemSelected(item: any) {
    if (!item.children || !item.children.length) {
      this.emitt();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  emitt(){
    this.submit.emit();
  }

}
