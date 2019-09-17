import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore,
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ){}

  getTasks(){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.collection('temperature').snapshotChanges();
          console.log('getTasks');
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }

  getSampleData() {
    return this.afDB.list('temperature/Sample').valueChanges();
  }

  getDeviceAnalysisData() {
    return this.afDB.list('deviceAnalysisData').valueChanges();
  }

  getTemperature(){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe( x => {
          this.snapshotChangesSubscription = this.afs.collection('temperature/daily/seconds/', ref => ref.orderBy('created_ts', 'desc').limit(5)).valueChanges()
          .subscribe(snapshots => {
            console.log('getTemperature');
            resolve(snapshots);
          }, err => {
            console.error('getTemperature Error', err);
            reject(err);
          })
      })
    });

  }

  readTemperature() {
        return this.afs.collection('temperature/daily/seconds/', ref => ref.orderBy('created_ts', 'desc').limit(5)).valueChanges();
  }

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }
}
