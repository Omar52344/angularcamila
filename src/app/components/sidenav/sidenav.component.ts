import { Component, EventEmitter, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { timer } from 'rxjs';
import { isNull } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  menu = [
    {
      name: 'First',
      icon: 'mode_edit',
      url: 'https://newprimeux.azurewebsites.net/ui/login',
      children: [
        {
          name: 'Apple',
          icon: 'mode_edit',
          children: [
            {
              name: 'Apple2',
              icon: 'mode_edit',
              url: 'https://newprimeux.azurewebsites.net/ui/login'
            }
          ]
        },
        { name: 'Banana', icon: 'mode_edit', },
        { name: 'Fruit loops', icon: 'mode_edit', },
      ]
    },
    {
      name: 'two',
      icon: 'mode_edit',
      url: 'http://localhost:4201/'
    },
    {
      name: 'three',
      icon: 'mode_edit',
      url: 'https://stackoverflow.com/'
    },
    {
      name: 'four',
      icon: 'mode_edit',
      url: 'https://www.exito.com/'
    },
  ];

  tabs: any[] = [];
  fm: any;
  p;

  selected: number = 0;

  @ViewChild('sidenav') sidenav: MatSidenav;

  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() depth: number;

  constructor(public router: Router, private dom: DomSanitizer) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.fm = this.menu;
  }


  viewMenu() {
    this.sidenav.toggle()
  }



  filter(event) {
    this.p = event.srcElement.value
    //this.fm = [];
    let a = []
    // for (let i = 0; i < this.menu.length; i++) {
    //   let p = this.filtro(this.menu[i], this.p)
    //   if (typeof p !== 'undefined') {
    //     a.push(p);
    //   }
    // }
    this.menu.forEach(menu => {
      let p = this.filtro(menu, this.p)
      if (typeof p !== 'undefined') {
        a.push(p);
      }
    })
    this.fm = a;
    debugger;
    //this.fm = (this.menu.filter(menu => this.filterR(event.srcElement.value, menu, this.fm)));
  }
  filtro(original, palabra): any {
    let result: any = [];
    try {
      result.name = original.name;
      result.icon = original.icon;
      result.url = original.url;
      result.children = [];
      if (typeof original.children !== 'undefined') {
        for (let i = 0; i < original.children.length; i++) {
          let a = this.filtro(original.children[i], palabra)
          if (typeof a !== 'undefined') {
            result.children.push(a)
          }
        }
        return result;
      } else {
        if (result.name.includes(palabra)) {
          return result
        } else {
          return undefined
        }
      }
    } catch (error) {
      console.log(error)
      debugger
    }
  }

  filterR(text: string, menu: any, array: any) {
    try {
      let a = menu.children
      if (typeof menu.children === 'undefined')

        menu.children.foreach(
          menu =>
            this.filterR(text, menu, array.children)

        )

      if (menu.children.length > 0) {
        return true
      }
      else {
        return false
      }
    } catch (error) {
      console.log(menu);
      let b = menu.name.includes(text);
      return b;
    }
    // try {
    //   let a = menu.children
    //   menu.children = menu.children.filter(menu => this.filterR(text, menu))
    //   if (menu.children.length > 0) {
    //     return true
    //   }
    //   else {
    //     return false
    //   }
    // } catch (error) {
    //   console.log(menu);
    //   let b = menu.name.includes(text);
    //   return b;
    // }
    // if (menu.children !== undefined) {

    // } else {

    // }
  }
  newTab(element) {
    debugger;
    this.tabs.push(element)
    this.selected = this.tabs.length - 1
  }

  removeTab(element) {
    const index = this.tabs.findIndex(tab => tab.name === element.name);
    this.tabs.splice(index, 1);
    this.selected = this.tabs.length - 1
  }

}
