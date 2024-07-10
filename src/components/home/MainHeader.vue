<template>
    <header>
        <div class="header-nav">
            <div class="logo">
                <RouterLink to="/"><img class="desktop-logo" src="../../assets/pic/logo.png" alt="logo"></RouterLink>
                <RouterLink to="/"><img class="mobile-logo" src="../../assets/pic/logo-mobile.svg" alt="logo">
                </RouterLink>
            </div>
            <nav class="desktop-menu">
                <ul>
                    <li v-for="link in links" :key="link.path" class="menu-item">
                        <a v-if="link.submenu" href="#" @click.prevent="toggleSubMenu(link)">
                            {{ link.name }}
                        </a>
                        <RouterLink v-else :to="link.path">{{ link.name }}</RouterLink>
                        <ul v-if="link.submenu" class="submenu" :class="{ 'submenu-visible': link.showSubMenu }">
                            <li v-for="sublink in link.submenu" :key="sublink.path">
                                <RouterLink :to="sublink.path">{{ sublink.name }}</RouterLink>
                            </li>
                        </ul>
                    </li>
                    
                </ul>
            </nav>
            <div class="icons">
                <button>
                    <RouterLink to="/cart">
                        <img class="desktop-cart" src="../../assets/pic/icon_cart.svg" alt="購物車">
                        <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
                    </RouterLink>
                    <RouterLink to="/cart">
                        <img class="mobile-cart" src="../../assets/pic/mobile-cart.svg" alt="購物車-手機版">
                        <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
                    </RouterLink>
                </button>
                <button class="logIn-btn">
                    <a href="#" @click="loginIn">
                        <img class="desktop-user" src="../../assets/pic/icon_user.svg" alt="會員登入/註冊">
                        <img class="mobile-user" src="../../assets/pic/mobile-user.svg" alt="會員登入/註冊">
                    </a>
                </button>
                <button class="member">{{this.loginStore.userData.mem_name}}
                    <ul>
                        <router-link class="mem-info" to="/memberinfo">會員資訊</router-link>
                        <li class="sign-out" @click="signOut">登出</li>
                    </ul>
                </button>

                <button @click="toggleMenu" class="hamburger-menu">
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>
        </div>
        <!-- <div v-if="menuOpen" class="mobile-menu"> -->
            <div :class="['mobile-menu', { open: menuOpen, close: !menuOpen }]" :data-initial-render="initialRender">
            <div class="overlay-background" @click="toggleMenu" v-show="menuOpen"></div>
            <ul>
                <li v-for="(link, index) in links" :key="link.path">
                    <!-- 修改这里：移除 @click.prevent -->
                    <a href="#" @click.prevent="handleMainMenuClick(link, index)">
                        {{ link.name }}
                        <i v-if="link.submenu"
                            :class="{ 'fa-solid fa-chevron-down': !link.showSubMenu, 'fa-solid fa-chevron-up': link.showSubMenu }"></i>
                    </a>
                    <transition name="slide-fade">
                    <ul style="position: static; height: auto;" v-if="link.submenu && link.showSubMenu" class="submenu">
                        <li v-for="sublink in link.submenu" :key="sublink.path">
                            <RouterLink :to="sublink.path" @click="closeMenu">{{ sublink.name }}</RouterLink>
                        </li>
                    </ul>
                </transition>
                </li>
                <li class="sign-out" @click="signOut">登出</li>
            </ul>
        </div>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';
import { gapi } from 'gapi-script';
import { useLoginStore } from '@/stores/loginStore'; // 添加這行

export default {
    components: {
        RouterLink,
    },
    data() {
        return {
            links: [
                { name: '關於我們', path: '/about', showSubMenu: false, submenu: [{ name: '歷史沿革', path: '/about' }, { name: '品牌故事', path: '/about/story' }] },
                { name: '最新消息', path: '/news' },
                { name: '活動資訊', path: '/activity' },
                { name: '周邊商品', path: '/product' },
                { name: '知識小學堂', path: '/quiz' }
            ],
            menuOpen: false,
            activeSubMenu: null,
            initialRender: true // 新增這一行
        };
    },
    computed: {
        cartStore() {
            return useCartStore();
        },
        cartItemCount() {
            return this.cartStore.uniqueItemCount;
        },
        loginStore() { // 添加這段
            return useLoginStore();
        }
    },
    methods: {
        signOut() {
            gapi.load('auth2', () => {
                const auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(() => {
                    console.log('Google user signed out.');
                    this.loginStore.emailData = ''
                    this.loginStore.pswData = ''
                    this.loginStore.userData = {}
                    this.loginStore.isLoggedIn = false; // 更新 Pinia 狀態
                    this.loginStore.currentUser = null; // 清除當前用戶信息
                    this.$router.push('/');
                    const logInBtn = document.querySelector(".logIn-btn");
                    const member = document.querySelector(".member");
                    member.style.display = "none";
                    logInBtn.style.display = "block";
                    this.menuOpen = false; // 隱藏 mobile-menu
                });
            });
        },
        loginIn() {
            const loginBox = document.querySelector(".login-box");
            loginBox.style.opacity = "1";
            loginBox.style.pointerEvents = "auto";
        },
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
            this.activeSubMenu = null;
            this.firstRender = false; // 菜單第一次打開後禁用初始狀態
        },
        // toggleSubMenu(index) {
        //     console.log(this.links[index])
        //     if (this.activeSubMenu === index) {
        //         this.activeSubMenu = null;
        //     } else {
        //         this.activeSubMenu = index;
        //     }
        //     console.log(this.links[index].showSubMenu)
        //     this.links[index].showSubMenu = !this.links[index].showSubMenu;
        //     console.log(this.links[index].showSubMenu)

        //     setTimeout(() => {
        //         console.log(this.links[index].showSubMenu)

        //     }, 2000)
        // },
        toggleSubMenu(index) {
    // console.log('Before toggle:', this.links[index]);

    if (this.activeSubMenu === index) {
        this.activeSubMenu = null;
    } else {
        this.activeSubMenu = index;
    }

    this.links[index].showSubMenu = !this.links[index].showSubMenu;
    console.log('After toggle:', this.links[index].showSubMenu);

    this.$nextTick(() => {
        const submenu = this.$el.querySelector(`.mobile-menu ul li:nth-child(${index + 1}) .submenu`);
        if (submenu) {
            if (this.links[index].showSubMenu) {
                submenu.style.maxHeight = submenu.scrollHeight + "px";
                // console.log('Submenu opened, maxHeight:', submenu.style.maxHeight);
            } else {
                submenu.style.maxHeight = "0px";
                // console.log('Submenu closed, maxHeight:', submenu.style.maxHeight);
            }
        }
    });

    setTimeout(() => {
        console.log('After 2 seconds:', this.links[index].showSubMenu);
    }, 2000);
},
        handleMainMenuClick(link, index) {
            console.log(link.submenu)
            console.log(link)
            if (link.submenu) {
                this.toggleSubMenu(index);
            } else {
                this.$router.push(link.path);
                this.closeMenu();
            }
        },
        handleResize() {
            if (window.innerWidth > 996) {
                this.menuOpen = false;
                this.activeSubMenu = null;
            }
        },
        closeMenu() {
            this.menuOpen = false;
            this.links.forEach(link => {
                if (link.submenu) {
                    link.showSubMenu = false;
                }
            });
        },
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);

        // 更新路由監聽器
        this.$router.afterEach(() => {
        this.closeMenu(); // 使用新的 closeMenu 方法
    });
    setTimeout(() => {
            this.initialRender = false;
        }, 0);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
        // 如果有必要，移除路由监听器
    },
}
</script>

<style scoped></style>
