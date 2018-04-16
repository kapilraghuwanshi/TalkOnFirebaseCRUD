import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { editUser } from '../../modals/User';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {

  private selectedChatEntry: any;
  private showRingVolume: boolean = true;
  private rating: number;
  private checkSession: boolean = true;
  private showMessage: boolean = false;
  private selectedGender: string = "Select Gender";
  private selectedEmailLimit: string = "Select Email Limit";
  private selectedVolume: string = "Select Volume";
  private selectedRing: string = "Select Ring Type";

  model = {
    role: '', fname: '', vname: '', useremail: '', gender: '',
    emaillimit: null, chatlimit: null, multisession:false, ringtype: null, volume: null, rating: null, message: ''
  }

  genderType = [{ name: 'Select Gender' }, { name: 'Male' }, { name: 'Female' }];
  selectEmailLimit = [{no:'Select Email Limit'},{no: 1}, {no:2}, {no:3}, {no:4}, {no:5}];
  selectVolume = [{no:'Select Volume'}, {no: 1}, {no:2}, {no:3}, {no:4}, {no:5}];
  selectRingType = [{no:'Select Ring Type'},{no: 1}, {no:2}, {no:3}, {no:4}, {no:5}];
  radioChatLimit = [
    { id: 1, no: 1 }, { id: 2, no: 2 }, { id: 3, no: 3 }, { id: 4, no: 4 }, { id: 5, no: 5 }, { id: 6, no: 6 },
    { id: 7, no: 7 }, { id: 8, no: 8 }, { id: 9, no: 9 }, { id: 10, no: 10 }
  ];

  constructor(public firebaseServ: FirebaseServiceProvider,
    public navCtrl: NavController, public navParams: NavParams) {

  }

  openHomePage() {
    this.navCtrl.push(HomePage);
  }

  onGenderdrop() {
    this.model.gender = this.selectedGender;
    console.log("this.model.gender - " + this.model.gender);
  }

  onSelectEmail() {
    this.model.emaillimit = this.selectedEmailLimit;
    console.log("this.model.emaillimit - " + this.model.emaillimit);
  }

  onSelectionChange(chat) {
    this.selectedChatEntry = chat;
    this.model.chatlimit = chat;
    console.log("selectedChatEntry - " + this.model.chatlimit);
  }

  onCheckboxChange(checkSession) {
    if (this.checkSession = !this.checkSession)
      this.showRingVolume = true;
    else
      this.showRingVolume = false;
  }

  onratingClick(rating) {
    this.model.rating = rating;
    console.log("rating - " + this.model.rating);
    if (this.model.rating >= 5)
      this.showMessage = true;
    else
      this.showMessage = false;
  }

  onSelectRing() {
    this.model.ringtype = this.selectedRing;
    console.log("this.model.ringtype - " + this.model.ringtype);
  }

  onSelectVolume() {
    this.model.volume = this.selectedVolume;
    console.log("this.model.volume - " + this.model.volume);
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.model);
  }

  userSubmit() {
    console.log(this.model);
    this.firebaseServ.addUser(this.model);
    this.model.role = '';
    this.model.fname = '';
    this.model.vname = '';
    this.model.useremail = '';
    this.model.gender = '';
    this.model.emaillimit = null;
    this.model.chatlimit = null;
    this.model.multisession = false;
    this.model.ringtype = null,
    this.model.volume = null;
    this.model.rating = null
    this.model.message = '';
  }

}
