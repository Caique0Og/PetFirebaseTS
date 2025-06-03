import { Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,GoogleAuthProvider,signInWithPopup } from '@angular/fire/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private auth: Auth) { }

  login(email:string, senha:string){

    return signInWithEmailAndPassword(this.auth, email , senha)

  }

  regiter(email:string,senha:string){

    return createUserWithEmailAndPassword(this.auth, email , senha)

  }

  logout(){

    return signOut(this.auth)

  }

  loginWithGoogle(){

    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)

  }

}
