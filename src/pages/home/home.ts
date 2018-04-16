import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { User } from '../../modals/User';
import { userList } from '../../modals/UserList';
import { EditUserPage } from '../edit-user/edit-user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  filteredItems: User[];
  users: User[];
  pages: number = 10;
  pageSize: number = 6;
  pageNumber: number = 0;
  currentIndex: number = 1;
  pagesIndex: Array<number>;
  pageStart: number = 1;
  inputName: string = '';

  constructor(public navCtrl: NavController,) {
    console.log('Hello HomePage');
    this.filteredItems = userList;
    this.init();
  }

  init() {
    this.currentIndex = 1;
    this.pageStart = 1;
    this.pages = 10;

    this.pageNumber = parseInt("" + (this.filteredItems.length / this.pageSize));

    if (this.filteredItems.length % this.pageSize != 0) {
      this.pageNumber++;
    }

    if (this.pageNumber < this.pages) {
      this.pages = this.pageNumber;
    }

    this.refreshItems();
    console.log("this.pageNumber :  " + this.pageNumber);
  }

  openEditPage(num) {
    console.log("Hello openEditPage + " );
    this.navCtrl.push(EditUserPage);
  }

  // Search Method
  FilterByName() {
    this.filteredItems = [];
    if (this.inputName != "") {
      userList.forEach(element => {
        if (element.fname.toUpperCase().indexOf(this.inputName.toUpperCase()) >= 0) {
          this.filteredItems.push(element);
        }
      });
    } else {
      this.filteredItems = userList;
    }
    console.log(this.filteredItems);
    this.init();
  }

  fillArray(): any {
    var obj = new Array();
    for (var index = this.pageStart; index < this.pageStart + this.pages; index++) 
    {
      obj.push(index);
    }
    return obj;
  }

  refreshItems() {
    this.users = this.filteredItems.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
    this.pagesIndex = this.fillArray();
  }

  prevPage() {
    if (this.currentIndex > 1) {
      this.currentIndex--;
    }
    if (this.currentIndex < this.pageStart) {
      this.pageStart = this.currentIndex;
    }
    this.refreshItems();
  }
  nextPage() {
    if (this.currentIndex < this.pageNumber) {
      this.currentIndex++;
    }
    if (this.currentIndex >= (this.pageStart + this.pages)) {
      this.pageStart = this.currentIndex - this.pages + 1;
    }

    this.refreshItems();
  }

  setPage(index: number) {
    this.currentIndex = index;
    this.refreshItems();
  }

}