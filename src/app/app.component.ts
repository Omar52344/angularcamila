import { Component, ViewChild } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'menu';
  status = true;
  @ViewChild(SidenavComponent) sidenav: SidenavComponent;

  changeStatus(){
    this.sidenav.viewMenu();
  }
}
