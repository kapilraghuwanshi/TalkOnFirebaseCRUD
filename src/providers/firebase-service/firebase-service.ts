import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User, editUser } from '../../modals/User';

@Injectable()
export class FirebaseServiceProvider {

  userscollection: AngularFirestoreCollection<editUser>;
  users: Observable<editUser[]>;
  userDoc: AngularFirestoreDocument<editUser>;

  constructor(public Afs: AngularFirestore) {
    console.log('Hello FirebaseServiceProvider Provider');
  }

  getUsers() {
    this.userscollection = this.Afs.collection('TalkOnUserList',x => x.orderBy('fname', 'asc'));
    this.users = this.userscollection.snapshotChanges().map(
      changes => {
        return changes.map(
          a => {
            const data = a.payload.doc.data() as editUser;
            data.id = a.payload.doc.id;
            return data;
          });
      });
    return this.users;
  }

  addUser(newUser) {
    this.userscollection.add(newUser);
  }

}