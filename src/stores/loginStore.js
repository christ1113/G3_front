import { defineStore } from 'pinia';
import { gapi } from 'gapi-script';
// import {path} from "../../../path.js"; //路徑

export const useLoginStore = defineStore('loginStore', {
    state: () => ({
        userData:{},
        isLoggedIn: false,
        currentUser: null,
        emailData: '',
        pswData: '',
        mem: [],
        googleUser: null,
    }),
    actions: {
        setUserData(userData) {
            this.userData = userData;
        },
        setEmailData(email) {
            this.emailData = email;
        },
        setPswData(password) {
            this.pswData = password;
        },
        setMemData(mem) {
            this.mem = mem;
        },
        memLogin() {
            const member = document.querySelector('.member');
            const logInBtn = document.querySelector('.logIn-btn');
            
            if (this.emailData === this.mem[0].account && this.pswData === this.mem[0].psw) {
                this.emailData = '';
                this.pswData = '';
                member.style.display = 'block';
                logInBtn.style.display = 'none';
                this.isLoggedIn = true;
                this.currentUser = this.mem[0];
                return true;
            } else {
                this.isLoggedIn = false;
                this.currentUser = null;
                this.emailData = '';
                this.pswData = '';
                return false;
            }
        },
        googleSignIn() {
            return new Promise((resolve, reject) => {
                gapi.load('auth2', () => {
                    const auth2 = gapi.auth2.init({
                        client_id: '936842006999-iroeoumpffqet17pij6d53trmvvntkdm.apps.googleusercontent.com',
                    });
                    auth2.signIn().then(googleUser => {
                        const profile = googleUser.getBasicProfile();
                        this.googleUser = {
                            id: profile.getId(),
                            name: profile.getName(),
                            imageUrl: profile.getImageUrl(),
                            email: profile.getEmail(),
                        };
                        this.isLoggedIn = true;
                        this.currentUser = this.googleUser;
                        resolve(this.googleUser);
                    }).catch(error => {
                        console.error('Error signing in:', error);
                        reject(error);
                    });
                });
            });
        },
        googleSignOut() {
            gapi.load('auth2', () => {
                const auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(() => {
                    this.isLoggedIn = false;
                    this.currentUser = null;
                    this.googleUser = null;
                    console.log('Google user signed out.');
                }).catch(error => {
                    console.error('Error signing out:', error);
                });
            });
        },
    },
});
