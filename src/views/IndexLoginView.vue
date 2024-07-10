<template>
    <section class="section login-box">
        <div class="login-container">
            <div class="login-wrap">
                <div class="link">
                    <button class="login" @click="showContent('login'); showLogin()">會員登入</button>
                    <button class="register" @click="showContent('register'); showRegister()">會員註冊</button>
                </div>
                <div class="login-frame">
                    <div class="input-field" v-if="content === 'login'">
                        <div class="content-container">
                            <div class="login-input">
                                <input class="email" name="memId" type="email" placeholder="請輸入電子郵件" v-model="loginStore.emailData">
                                <div class="input-icon">
                                    <input class="password" name="memPsw" type="password" placeholder="請輸入密碼" maxlength="12" minlength="6" v-model="loginStore.pswData">
                                    <picture @click="togglePasswordVisibility($event, 'password')" class="eyes">
                                        <img id="eye" src="/src/assets/pic/login/eye-close.svg" alt="" title="close">
                                    </picture>
                                </div>
                            </div>
                            <div class="forget-login-btn">
                                <button class="forget" @click="showContent('forget')">忘記密碼？</button>
                                <button class="btn" @click="clickLogin">登入</button>
                            </div>
                            <p class="quick">使用以下帳號快速登入</p>
                            <div class="login-icon">
                                <div class="login-goole" @click="googleSignIn">
                                    <img src="/src/assets/pic/login/google-icon.png" alt="">
                                </div>
                                <div class="login-facebook">
                                    <img src="/src/assets/pic/login/logos_facebook.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="input-field" v-if="content === 'forget'">
                        <div class="content-container">
                            <div class="login-input">
                                <p class="txt">忘記密碼 :</p>
                                <input class="forget-input" type="email" placeholder="請輸入電子郵件">
                            </div>
                            <div class="previous-page-verify">
                                <button class="previous-page-btn" @click="showContent('login')">上一頁</button>
                                <button class="btn">驗證</button>
                            </div>
                        </div>
                    </div>
                    <div class="input-field" v-if="content === 'register'">
                        <div class="content-container">
                            <div class="register-input">
                                <input class="email" name="memclass" type="email" placeholder="請輸入電子郵件" v-model="emailData">
                                <div class="input-icon">
                                    <input class="password" name="memPsw" type="password" placeholder="請輸入密碼" maxlength="12" minlength="6" v-model="password">
                                    <picture @click="togglePasswordVisibility($event, 'password')" class="eyes">
                                        <img id="eye" src="/src/assets/pic/login/eye-close.svg" alt="" title="close">
                                    </picture>
                                </div>
                                <div class="input-icon">
                                    <input class="password" name="memPsw" type="password" placeholder="確認密碼" maxlength="12" minlength="6" v-model="confirmPassword">
                                    <picture @click="togglePasswordVisibility($event, 'confirmPassword')" class="eyes">
                                        <img id="eye" src="/src/assets/pic/login/eye-close.svg" alt="" title="close">
                                    </picture>
                                </div>
                                <div class="verify-group">
                                    <input class="verify" type="text" placeholder="請輸入右方驗證碼" maxlength="5" required>
                                    <div class="captcha-img">AB123</div>
                                    <button class="verify-btn" type="submit">驗證</button>
                                </div>
                                <div class="gender">
                                    <h5>性別 ：</h5>
                                    <input type="radio" id="gender-man" name="gender" value="man" checked />
                                    <label for="gender-man">男性</label>
                                    <input type="radio" id="gender-girl" name="gender" value="girl" />
                                    <label for="gender-girl">女性</label>
                                    <input type="radio" id="gender-else" name="gender" value="else" />
                                    <label for="gender-else">其他</label>
                                </div>
                                <div class="date">
                                    <h5>生日 ：</h5>
                                    <input type="date" value="2000-06-19" min="1960-01-01" max="2006-12-31" />
                                </div>
                            </div>
                            <button class="register-btn">註冊</button>
                        </div>
                    </div>
                    <span class="x" @click="closeLoginInBtn">
                        <img src="/src/assets/pic/login/ph_x-bold.png" alt="">
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { gapi } from 'gapi-script';
import { useLoginStore } from '@/stores/loginStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            content: 'login',
            emailData: '',
            password: '',
            confirmPassword: '',
            loginConsider: true
        };
    },
    setup() {
        const loginStore = useLoginStore();
        const router = useRouter(); // useRouter 方法返回当前路由器实例

        const googleLogIn = () => {
            if (loginStore.googleSignIn()) {
                // alert("登入成功!");
                closeLoginBox();
                router.push('/memberinfo'); // 使用 router.push 方法进行路由跳转
                document.querySelector(".member").style.display = "block";
                document.querySelector(".logIn-btn").style.display = "none";
            }
        }
        const clickLogin = () => {
            if (loginStore.memLogin()) {
                alert("登入成功!");
                closeLoginBox();
                router.push('/memberinfo'); // 使用 router.push 方法进行路由跳转
                document.querySelector(".member").style.display = "block";
                document.querySelector(".logIn-btn").style.display = "none";
            } else {
                alert("帳號或密碼錯誤!");
            }
        };

        const closeLoginBox = () => {
            const loginBox = document.querySelector(".login-box");
            loginBox.style.opacity = "0";
            loginBox.style.pointerEvents = "none";
        };

        const googleSignIn = () => {
            gapi.load('auth2', () => {
                const auth2 = gapi.auth2.init({
                    client_id: '936842006999-iroeoumpffqet17pij6d53trmvvntkdm.apps.googleusercontent.com',
                    ux_mode: "redirect",
                    redirect_uri: "https://tibamef2e.com/cid101/g3/front/memberinfo",
                });
                auth2.signIn().then(googleUser => {
                    const profile = googleUser.getBasicProfile();
                    console.log('ID: ' + profile.getId());
                    console.log('Name: ' + profile.getName());
                    console.log('Image URL: ' + profile.getImageUrl());
                    console.log('Email: ' + profile.getEmail());
                }).catch(error => {
                    console.error('Error signing in: ', error);
                });
            });
            if (loginStore.googleSignIn()) {
                // alert("登入成功!");
                closeLoginBox();
                router.push('/memberinfo'); // 使用 router.push 方法进行路由跳转
                document.querySelector(".member").style.display = "block";
                document.querySelector(".logIn-btn").style.display = "none";
            }
        };

        onMounted(() => {
            fetch(`${import.meta.env.BASE_URL}member.json`)
                .then(res => res.json())
                .then(json => {
                    loginStore.setMemData(json);
                });
            gapi.load('auth2', function() {
                gapi.auth2.init({
                    client_id: '936842006999-iroeoumpffqet17pij6d53trmvvntkdm.apps.googleusercontent.com'
                });
            });
        });

        return {
            loginStore,
            clickLogin,
            closeLoginBox,
            googleSignIn,
            googleLogIn
        };
    },
    methods: {
        showContent(content) {
            this.content = content;
        },
        showLogin() {
            this.loginConsider = true;
            this.determineLoginOrRegister();
        },
        showRegister() {
            this.loginConsider = false;
            this.determineLoginOrRegister();
        },
        determineLoginOrRegister() {
            const login = document.querySelector(".login");
            const register = document.querySelector(".register");

            if (this.loginConsider) {
                login.classList.remove("login-hide");
                register.classList.remove("register-show");
                return;
            }

            login.classList.add("login-hide");
            register.classList.add("register-show");
        },
        closeLoginInBtn() {
            this.loginStore.setEmailData('');
            this.loginStore.setPswData('');
            this.password = "";
            this.confirmPassword = "";
            this.closeLoginBox();
        },
        togglePasswordVisibility(e, field) {
            let x = field;
            console.log(x);
            const eye = e.currentTarget.querySelector("#eye");
            const passwordInput = e.currentTarget.previousElementSibling;
            if (eye.title === "close") {
                eye.src = "/src/assets/pic/login/eye-open.svg";
                eye.title = "open";
                passwordInput.type = "text";
            } else {
                eye.src = "/src/assets/pic/login/eye-close.svg";
                eye.title = "close";
                passwordInput.type = "password";
            }
        },
    },
}
</script>


<style scoped>
/* Add your styles here */
</style>
