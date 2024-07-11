<template>
    <div class="go-back">
        <router-link to="/cart">
            <返回購物車 </router-link>
    </div>
    <div class="checkout-container">
        <div v-if="formError" class="form-error">
            {{ formError }}
        </div>
        <div class="confirm-info">
            <div class="confirm-title">
                <span>確認訂購人資料</span>
            </div>
            <div class="disc-line"></div>

            <div class="ord-info">
                <!-- <form> -->
                <!-- <div class="form-group">
                        <label for="name">姓名:</label>
                        <input type="text" id="name" v-model="orderInfo.name" maxlength="50"
                            :class="{ 'error-input': errors.name }">
                        <div v-if="errors.name" class="error-message">{{ errors.name }}</div>

                    </div> -->
                <form @submit.prevent="validateForm">
                    <div class="form-group">
                        <label for="name">姓名:</label>
                        <input type="text" id="name" v-model="orderInfo.name" maxlength="50"
                            :class="{ 'error-input': errors.orderInfoName }">
                    </div>
                    <div class="form-group">
                        <label for="phone">聯繫電話：</label>
                        <input type="text" id="phone" v-model="orderInfo.phone" maxlength="10"
                            :class="{ 'error-input': errors.orderInfoPhone }">
                    </div>
                    <div class="form-group">
                        <label for="email">電子郵箱：</label>
                        <input type="email" id="email" v-model="orderInfo.email" maxlength="255"
                            :class="{ 'error-input': errors.orderInfoEmail }">
                    </div>
                </form>
            </div>
        </div>
        <div class="confirm-ord">
            <div class="confirm-ord-title">
                <span>確認訂單資料</span>
            </div>
            <div class="disc-line"></div>

            <div class="prod-info">
                <CheckoutProd v-for="item in selectedItems" :key="item.prod_id" :item="item" />
            </div>
            <div class="disc-line"></div>
            <div class="receiver-info">
                <span class="receiver">收件人資料</span>
                <input type="checkbox" v-model="sameAsOrderInfo" @change="updateReceiverInfo">
                <span>同訂購人資料</span>
            </div>
            <form>
                <div class="form-group">
                    <label for="name">收件人姓名:</label>
                    <!-- <input type="text" id="name" maxlength="50" v-model="receiverInfo.name"> -->
                    <input type="text" id="receiverName" v-model="receiverInfo.name" maxlength="50"
                        :class="{ 'error-input': errors.receiverInfoName }">
                </div>
                <div class="form-group">
                    <label for="phone">收件人聯絡電話：</label>
                    <input type="text" id="receiverPhone" v-model="receiverInfo.phone" maxlength="10"
                        :class="{ 'error-input': errors.receiverInfoPhone }">
                </div>
                <div class="form-group" id="address-form">

                    <label for="address">收件人地址：</label>
                    <div class="address-group">
                        <!-- <select v-model="selectedCity" @change="onCityChange" class="select"> -->
                        <select v-model="selectedCity" @change="onCityChange" class="select"
                            :class="{ 'error-input': errors.receiverInfoAddressCity }">
                            <option disabled value="">請選擇縣市</option>
                            <option v-for="city in uniqueCities" :key="city" :value="city">{{ city }}</option>
                        </select>

                        <!-- <select v-model="selectedDistrict" class="select" :disabled="!selectedCity"> -->
                        <select v-model="selectedDistrict" class="select" :disabled="!selectedCity"
                            :class="{ 'error-input': errors.receiverInfoAddressDistrict }">
                            <option disabled value="">請選擇鄉鎮區</option>
                            <option v-for="district in filteredDistricts" :key="district.name" :value="district.name">{{
                                district.name }}</option>
                        </select>

                        <!-- <input type="text" v-model="addressDetail" placeholder="請填寫詳細地址"> -->
                        <input type="text" v-model="addressDetail" placeholder="請填寫詳細地址"
                            :class="{ 'error-input': errors.receiverInfoAddressDetail }">
                    </div>
                </div>
                <div class="form-group">
                    <label for="email">收件人電子郵箱：</label>
                    <input type="email" id="email" v-model="receiverInfo.email" maxlength="255"
                        :class="{ 'error-input': errors.receiverInfoEmail }">
                </div>
                <div class="form-group">
                    <label for="prefer-time">偏好收貨時間：</label>
                    <select v-model="preferTime" @change="onTimeChange" class="select"
                        :class="{ 'error-input': errors.preferTime }">
                        <option disabled value="">請選擇時間段</option>
                        <option v-for="time in times" :key="time.name" value="time.name">{{ time.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="text">特殊需求備註：</label>
                    <textarea id="memo" v-model="memo" maxlength="500" class="large-textarea"></textarea>
                </div>

            </form>
            <div class="disc-line-form"></div>
            <div class="invoicing-title">
                <span>發票與統編</span>
            </div>
            <form class="invoicing-form">
                <div class="form-group">
                    <label for="invoicing">載具編號：</label>
                    <div class="invoicing-use">
                        <input type="text" id="invoicing" v-model="invoicingNumber" maxlength="8"
                            :class="{ 'error-input': errors.invoicingNumber }">
                        <div class="invoicing-often">
                            <input type="checkbox" class="invoicing-cb">
                            <span>設定為常用載具</span>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="compilation-title">統一編號：</label>
                    <div class="invoicing-use">
                        <input type="text" id="compilation" v-model="compilationNumber" maxlength="8"
                            :class="{ 'error-input': errors.compilationNumber }">
                        <div class="invoicing-often">
                            <input type="checkbox" class="invoicing-cb">
                            <span>設定為常用統編</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="pay-way">
            <div class="payment-title">
                <span>付款方式</span>
            </div>
            <div class="disc-line"></div>

            <div class="payment-info">
                <form>
                    <div class="form-group">
                        <input type="radio" id="credit-card" name="payment" checked>
                        <label for="credit-card">信用卡支付</label>
                    </div>
                    <div class="form-group">
                        <label for="card-number">信用卡號碼：</label>
                        <input type="text" id="card-number-1" ref="cardNumber1" class="card-input" maxlength="4"
                            :class="{ 'error-input': errors.creditCardNumber }"
                            @input="moveToNext($event, 'cardNumber2')">
                        <span>-</span>
                        <input type="text" id="card-number-2" ref="cardNumber2" class="card-input" maxlength="4"
                            :class="{ 'error-input': errors.creditCardNumber }"
                            @input="moveToNext($event, 'cardNumber3')">
                        <span>-</span>
                        <input type="text" id="card-number-3" ref="cardNumber3" class="card-input" maxlength="4"
                            :class="{ 'error-input': errors.creditCardNumber }"
                            @input="moveToNext($event, 'cardNumber4')">
                        <span>-</span>
                        <input type="text" id="card-number-4" ref="cardNumber4" class="card-input" maxlength="4"
                            :class="{ 'error-input': errors.creditCardNumber }">
                    </div>
                    <div class="form-group">
                        <label for="expiry-date">有效日期：</label>
                        <input type="text" id="expiry-date-mm" ref="expiryDate1" placeholder="MM" maxlength="2"
                            :class="{ 'error-input': errors.expiryDate }" @input="moveToNext($event, 'expiryDate2')">
                        <span>/</span>
                        <input type="text" id="expiry-date-yy" ref="expiryDate2" placeholder="YY" maxlength="2"
                            :class="{ 'error-input': errors.expiryDate }" @input="moveToNext($event, 'cvc')">
                        <input type="text" id="cvc" ref="cvc" placeholder="信用卡背面的三碼" maxlength="3"
                            :class="{ 'error-input': errors.cvc }">
                    </div>

                    <div class="form-group">
                        <div class="save-card-use">
                            <input type="checkbox" id="save-card-cb">
                            <label for="save-card">設定為常用信用卡</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="use-coupon">是否使用優惠券：</label>
                        <input type="checkbox" id="use-coupon" class="switch" v-model="useCoupon">
                        <!-- <span class="switch-alert">*無可使用之優惠券</span> -->
                    </div>
                </form>
            </div>
        </div>
        <div class="invoice" v-if="selectedItems.length">
            <div class="invoice-item">
                <div class="item-description">
                    <div class="item-total">
                        <p>{{ itemTypesCount }}件商品合計</p>
                        <p>NT${{ totalPrice }}(元)</p>
                    </div>
                    <div v-if="useCoupon" class="useCoupon">
                        <div class="item-multiplication">
                            x
                        </div>
                        <div class="item-discount">
                            <p>優惠折扣(8折)</p>
                        </div>
                    </div>
                </div>

                <div class="disc-line"></div>

                <div class="invoice-total">
                    <p>總計：NT${{ useCoupon ? discountedTotal : totalPrice }}(元)</p>
                </div>
            </div>
        </div>
        <div class="confirm-checkout">
            <button @click="validateForm">確認結帳</button>
        </div>
        <SuccessModal :visible="showSuccessModal" message="結帳成功！" @close="closeModal" />
    </div>
</template>
<script>
import { useCartStore } from '../stores/cartStore.js'
import CheckoutProd from '../components/layout/CheckoutProd.vue'
import SuccessModal from '../components/layout/SuccessModal.vue';
// 登入資料
import { useLoginStore } from '@/stores/loginStore';
export default {
    components: { CheckoutProd, SuccessModal },
    setup() {
        const cartStore = useCartStore();
        const loginStore = useLoginStore();

        return {
            cartStore,
            selectedItems: cartStore.selectedItems, // 添加 selectedItems
            loginStore,
            name: '',
        }
    },
    data() {
        return {
            cartStore: useCartStore(),
            selectedCity: '',
            selectedDistrict: '',
            addressDetail: '',
            preferTime: '',
            useCoupon: false,
            showSuccessModal: false,
            orderInfo: {
                name: '',
                phone: '',
                email: ''
            },
            receiverInfo: {
                name: '',
                phone: '',
                email: '',
                address: {
                    city: '',
                    district: '',
                    detail: ''
                },
                preferTime: ''
            },
            creditCard: {
                number1: '',
                number2: '',
                number3: '',
                number4: '',
                expiryMonth: '',
                expiryYear: '',
                cvc: ''
            },
            invoicingNumber: '',
            compilationNumber: '',
            memo: '',
            errors: {},
            sameAsOrderInfo: false,
            originalReceiverInfo: {
                name: '',
                phone: '',
                email: ''
            },
            times: [
                { name: '無偏好' },
                { name: '上午(9:00~12:00)' },
                { name: '下午(13:00~18:00)' }
            ],
            cities: [],
            districts: [],
            formError: '',
        };
    },
    computed: {
        loginStore() { 
            return useLoginStore();
        },
        uniqueCities() {
            const cityNames = this.cities.map(city => city.city_name);
            return [...new Set(cityNames)];
        },
        filteredDistricts() {
            return this.cities.filter(city => city.city_name == this.selectedCity);
        },
        itemTypesCount() {
            return this.cartStore.selectedCartItems.length;
        },
        totalPrice() {
            return this.cartStore.selectedCartItems.reduce((acc, item) => acc + (item.count * item.prod_price), 0);
        },
        discountedTotal() {
            return Math.round(this.totalPrice * 0.8);
        },
        selectedItems() {
            // 只返回選中的商品
            return this.cartStore.selectedCartItems;
        }
    },
    created() {
        this.fetchCities();
        // 把會員資料帶到訂購人
        this.orderInfo.name = this.loginStore.userData.mem_name;
        this.orderInfo.phone = this.loginStore.userData.mem_tel;
        this.orderInfo.email = this.loginStore.userData.mem_email;
    },
    methods: {
        async fetchCities() {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}Taiwan_address_data.json`);
                if (!response.ok) {
                    throw new Error('網絡出現問題，請稍後再試');
                }
                this.cities = await response.json();
            } catch (error) {
                console.error('無法選取資料:', error);
            }
        },

        onCityChange() {
            this.selectDistrict = '';
        },
        onTimeChange() {
            console.Consolelog('Selected time:', this.preferTime);
        },
        validateForm() {
            this.errors = {};

            // 訂購人信息驗證
            if (!this.orderInfo.name) {
                this.errors.orderInfoName = true;
            }
            if (!this.orderInfo.phone) {
                this.errors.orderInfoPhone = true;
            } else if (!/^09\d{8}$/.test(this.orderInfo.phone)) {
                this.errors.orderInfoPhone = true;
            }
            if (this.orderInfo.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.orderInfo.email)) {
                this.errors.orderInfoEmail = true;
            }

            // 收件人信息驗證
            if (!this.receiverInfo.name) {
                this.errors.receiverInfoName = true;
            }
            if (!this.receiverInfo.phone) {
                this.errors.receiverInfoPhone = true;
            } else if (!/^09\d{8}$/.test(this.receiverInfo.phone)) {
                this.errors.receiverInfoPhone = true;
            }
            if (this.receiverInfo.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.receiverInfo.email)) {
                this.errors.receiverInfoEmail = true;
            }
            if (!this.selectedCity) {
                this.errors.receiverInfoAddressCity = true;
            }
            if (!this.selectedDistrict) {
                this.errors.receiverInfoAddressDistrict = true;
            }
            if (!this.addressDetail) {
                this.errors.receiverInfoAddressDetail = true;
            }
            if (!this.preferTime) {
                this.errors.preferTime = true;
            }

            // 載具和統一編號驗證
            if (this.invoicingNumber && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/.test(this.invoicingNumber)) {
                this.errors.invoicingNumber = true;
            }

            // 統一編號驗證
            if (this.compilationNumber && !/^\d{8}$/.test(this.compilationNumber)) {
                this.errors.compilationNumber = true;
            }

            // 信用卡信息驗證
            const creditCardNumber = `${this.$refs.cardNumber1.value}${this.$refs.cardNumber2.value}${this.$refs.cardNumber3.value}${this.$refs.cardNumber4.value}`;
        if (!creditCardNumber || !/^\d{16}$/.test(creditCardNumber)) {
            this.errors.creditCardNumber = true;
        }
        const expiryMonth = this.$refs.expiryDate1.value;
        const expiryYear = this.$refs.expiryDate2.value;
        const expiryDate = `${expiryMonth}/${expiryYear}`;
        if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
            this.errors.expiryDate = true;
        } else {
            const [month, year] = expiryDate.split('/');
            const monthNum = parseInt(month, 10);
            if (monthNum < 1 || monthNum > 12) {
                this.errors.expiryDate = true;
            } else {
                const currentDate = new Date();
                const expiryDateObj = new Date(`20${year}`, month - 1);
                if (expiryDateObj < currentDate) {
                    this.errors.expiryDate = true;
                }
            }
        }
        if (!this.$refs.cvc.value || !/^\d{3}$/.test(this.$refs.cvc.value)) {
            this.errors.cvc = true;
        }
            // 如果沒有錯誤，提交訂單
            // 如果有錯誤，顯示錯誤信息
            if (Object.keys(this.errors).length > 0) {
                console.log('表單驗證錯誤:', this.errors);
                this.formError = '請填寫所有必填字段並確保信息正確';
                window.scrollTo(0, 0);
                return false;  // 阻止表單提交
            }

            // 如果沒有錯誤，提交訂單
            this.submitOrder();
        },
        submitOrder() {
            // 顯示成功彈窗
            this.showSuccessModal = true;

            // 清空購物車
            this.cartStore.cleanCart();
        },
        closeModal() {
            this.showSuccessModal = false;
            // 重定向到首頁
            this.$router.push('/');
        },
        moveToNext(event, nextFieldId) {
            if (event.target.value.length === event.target.maxLength) {
                setTimeout(() => {
                    this.$refs[nextFieldId].focus();
                }, 100);
            }
        },
        updateReceiverInfo() {
            if (this.sameAsOrderInfo) {
                // 儲存原始收件人資料
                this.originalReceiverInfo = { ...this.receiverInfo };
                // 更新收件人資料為訂購人資料
                this.receiverInfo = { ...this.orderInfo };
            } else {
                // 取消勾選時，清空收件人資料
                this.receiverInfo = {
                    name: '',
                    phone: '',
                    email: ''
                };
            }
        },

    },
    watch: {
        orderInfo: {
            handler(newValue) {
                if (this.sameAsOrderInfo) {
                    this.receiverInfo = { ...newValue };
                }
            },
            deep: true
        },
        sameAsOrderInfo(newValue) {
            this.updateReceiverInfo();
        }
    }
};
</script>
<style scoped lang="scss">
@import "@/assets/sass/style";

.go-back {
    width: 90%;
    margin: 20px auto;

}

.error-input {
    border-color: red;
}


.form-error {
    color: red;
    background-color: #ffeeee;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid red;
    border-radius: 4px;
}

.checkout-container {
    width: 60%;
    margin: 50px auto;

    .confirm-info {
        border: 1px solid #828282;
        background: #ffffff;
        border-radius: 20px;
        height: 240px;

        .confirm-title {
            height: 48px;
            padding-left: 20px;
            display: flex;
            align-items: center;

            button {
                background-color: transparent;
                border: none;
            }
        }

        .disc-line {
            height: 1px;
            background-color: #828282;
        }

        .ord-info {
            height: 80%;
            display: flex;
            align-items: center;
            padding-left: 20px;

            form {
                display: flex;
                flex-direction: column;
                gap: 25px;
                width: 100%;

                .form-group {
                    display: flex;
                    align-items: flex-start;
                    margin: auto 0;

                    label {
                        flex-basis: 15%;
                        margin: auto 0;
                    }

                    input {
                        height: 20px;
                        flex-basis: 25%;
                    }
                }
            }
        }
    }

    .confirm-ord {
        border: 1px solid #828282;
        background: #ffffff;
        border-radius: 20px;
        margin: 40px 0;

        .confirm-ord-title {
            height: 48px; //高的問題要解決
            padding-left: 20px;
            display: flex;
            align-items: center;
        }

        .disc-line {
            height: 1px;
            background-color: #828282;
        }



        .receiver-info {
            display: flex;
            margin: 20px 0;
            padding-left: 30px;
            align-items: center;

            .receiver {
                position: relative;
                margin-right: 80px;

                &::before {
                    content: "";
                    position: absolute;
                    height: 18px;
                    width: 2px;
                    background-color: rgba(190, 26, 14, 1);
                    left: -10px;
                    bottom: 0;
                    top: 0;
                }
            }

            input {
                margin: 0 10px 0 0;
            }

        }

        form {
            display: flex;
            flex-direction: column;
            margin-top: 40px;
            gap: 25px;
            padding-left: 20px;

            .form-group {
                display: flex;
                align-items: flex-start;
                margin: auto 0;

                label {
                    flex-basis: 20%;
                    margin: auto 0;
                }

                input {
                    height: 20px;
                    flex-basis: 25%;
                }

                select {
                    height: 26px;
                    flex-basis: 15%;
                    margin-right: 10px;
                    background-color: rgba(249, 241, 229, 1);
                }

                .large-textarea {
                    height: 80px;
                    flex-basis: 25%;
                    resize: vertical;
                    /* 允許垂直調整大小 */

                }


            }

        }

        .disc-line-form {
            margin-top: 20px;
            height: 1px;
            background-color: #828282;
        }

        .invoicing-title {
            display: flex;
            margin: 20px 0;
            padding-left: 30px;
            position: relative;

            &::before {
                content: "";
                position: absolute;
                height: 18px;
                width: 2px;
                background-color: rgba(190, 26, 14, 1);
                left: 20px;
                bottom: 0;
                top: 0;
            }
        }

        .invoicing-form {
            display: flex;
            flex-direction: column;
            margin: 40px 0 20px 0;
            gap: 25px;
            padding-left: 20px;

            .form-group {
                display: flex;
                align-items: flex-start;
                margin: auto 0;
                flex-wrap: wrap;

                label {
                    flex-basis: 20%;
                    margin: auto 0;
                }

                input {
                    height: 20px;
                    flex-basis: 0;

                }

                .invoicing-use {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;

                    .invoicing-often {
                        .invoicing-cb {
                            width: 13px;
                            height: 13px;
                            margin: auto 10px auto 30px;
                        }

                        span {
                            display: inline-block;
                            margin: auto 0;
                        }
                    }
                }
            }
        }

    }

    .pay-way {
        border: 1px solid #828282;
        background: #ffffff;
        border-radius: 20px;
        height: 290px;

        .payment-title {
            height: 48px;
            padding-left: 20px;
            display: flex;
            align-items: center;
        }

        .disc-line {
            height: 1px;
            background-color: #828282;
        }

        .payment-info {
            height: 82%;
            display: flex;
            align-items: center;
            padding-left: 20px;

            form {
                display: flex;
                flex-direction: column;
                gap: 25px;
                width: 100%;
                margin: auto 0;

                .form-group {
                    display: flex;
                    align-items: flex-start;
                    margin: auto 0;

                    input[type="radio"] {
                        margin-right: 10px;
                        accent-color: #be1a0e;
                    }

                    label {
                        flex-basis: 20%;
                        margin: auto 0;
                    }

                    .card-input {
                        display: flex;
                        width: 30px;
                        flex-basis: 10%;
                    }

                    span {
                        display: inline-block;
                        padding: 0 3px;
                        margin: auto 0;
                    }

                    input[type="text"] {
                        height: 20px;
                    }

                    #expiry-date-mm {
                        display: flex;
                        width: 30px;
                        flex-basis: 10%;
                    }

                    #expiry-date-yy {
                        display: flex;
                        width: 30px;
                        flex-basis: 10%;
                    }

                    #cvc {
                        margin-left: 14px;
                        width: 50px;
                        flex-basis: 15%;
                    }

                    .save-card-use {
                        display: flex;
                        align-items: center;

                        input {
                            margin: 0px;
                        }

                        label {
                            flex-basis: 100%;
                            padding-left: 10px;
                        }
                    }

                    .switch {
                        appearance: none;
                        width: 40px;
                        height: 20px;
                        background: #ddd;
                        border-radius: 10px;
                        position: relative;
                        cursor: pointer;
                        outline: none;
                        transition: background 0.3s;

                        &:checked {
                            background: #4caf50;
                        }

                        &::before {
                            content: '';
                            position: absolute;
                            width: 18px;
                            height: 18px;
                            background: #fff;
                            border-radius: 50%;
                            top: 1px;
                            left: 1px;
                            transition: transform 0.3s;
                        }

                        &:checked::before {
                            transform: translateX(20px);
                        }
                    }

                    .switch-alert {
                        color: #be1a0e;
                        font-size: 12px;
                        padding-left: 20px;
                    }
                }
            }
        }
    }

    .invoice {
        border: 1px solid #828282;
        background: #ffffff;
        border-radius: 20px;
        margin: 40px 0;

        .invoice-item {
            margin: auto;
            padding: 30px 0 10px 0;

            .item-description {
                text-align: center;
                display: flex;
                justify-content: center;
                margin-bottom: 20px;

                p {
                    margin: 5px 0;
                }

                .item-total {
                    margin: 0 10px;
                    width: 33.33%;
                }

                .useCoupon {
                    display: flex;
                    justify-content: space-around;
                    width: 66.66%;
                    margin: auto;

                    .item-multiplication {
                        margin: 0 10px;
                        width: 50%;
                    }

                    .item-discount {
                        margin: 0 10px;
                        width: 50%;
                    }
                }


            }




            .disc-line {
                height: 1px;
                background-color: #828282;
            }

        }

        .invoice-total {
            margin: auto 40px;
            text-align: right;
            padding: 20px 0;
            font-weight: 600;
        }

    }

    .confirm-checkout {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 80px 0;

        button {
            background-color: transparent;
            border: none;
            background: #be1a0e;
            border-radius: 20px;
            width: 130px;
            height: 50px;
            color: #ffffff;
            font-size: 16px;
            cursor: pointer;
        }
    }




}

@media screen and (min-width: $md) and (max-width: $xl) {
    .checkout-container {
        width: 80%;
        margin: 50px auto;

        .confirm-info {
            .ord-info {
                font-size: 14px;

                form {
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                    width: 100%;

                    .form-group {
                        display: flex;
                        align-items: flex-start;
                        margin: auto 0;

                        label {
                            flex-basis: 25%;
                            margin: auto 0;
                        }

                        input {
                            height: 20px;
                            flex-basis: 25%;
                        }
                    }
                }
            }
        }

        .confirm-ord {

            .confirm-ord-title {
                height: 48px; //高的問題要解決
                padding-left: 20px;
                display: flex;
                align-items: center;
            }

            .disc-line {
                height: 1px;
                background-color: #828282;
            }



            .prod-info {
                display: block;
                padding-left: 0px;
                height: 30%;

                .prod-img {
                    height: auto;
                    width: 20%;
                    object-fit: cover;
                    border-radius: 10px;
                    margin: auto 10px auto 0;

                }

                .prod-spec {
                    display: flex;
                    margin: auto 0;
                    width: 80%;
                    justify-content: space-between;

                    .prod-card {
                        h5 {
                            padding-bottom: 10px;
                            font-size: 16px;
                        }

                        span {
                            line-height: 150%;
                            font-size: 14px;
                        }

                        .mention {
                            font-size: 12px;
                            padding-top: 50px;
                        }

                    }

                    .prod-count {
                        margin: auto;
                    }

                    .prod-sum {
                        margin: auto;
                    }

                }
            }

            .receiver-info {
                display: flex;
                margin: 20px 0;
                padding-left: 30px;
                align-items: center;

                .receiver {
                    position: relative;
                    margin-right: 80px;

                    &::before {
                        content: "";
                        position: absolute;
                        height: 18px;
                        width: 2px;
                        background-color: rgba(190, 26, 14, 1);
                        left: -10px;
                        bottom: 0;
                        top: 0;
                    }
                }

                input {
                    margin: 0 10px 0 0;
                }

            }

            form {
                display: flex;
                flex-direction: column;
                margin-top: 40px;
                gap: 25px;
                padding-left: 20px;

                .form-group {
                    display: flex;
                    align-items: flex-start;
                    margin: auto 0;

                    label {
                        flex-basis: 25%;
                        margin: auto 0;
                        font-size: 14px;
                    }

                    input {
                        height: 20px;
                        flex-basis: 25%;
                        font-size: 14px;
                    }

                    select {
                        height: 26px;
                        flex-basis: 10%;
                        margin-right: 10px;
                        background-color: rgba(249, 241, 229, 1);
                    }

                    .large-textarea {
                        height: 80px;
                        flex-basis: 25%;
                        resize: vertical;
                        /* 允許垂直調整大小 */

                    }


                }

            }

            .disc-line-form {
                margin-top: 20px;
                height: 1px;
                background-color: #828282;
            }

            .invoicing-title {
                display: flex;
                margin: 20px 0;
                padding-left: 30px;
                position: relative;

                &::before {
                    content: "";
                    position: absolute;
                    height: 18px;
                    width: 2px;
                    background-color: rgba(190, 26, 14, 1);
                    left: 20px;
                    bottom: 0;
                    top: 0;
                }
            }

            .invoicing-form {
                display: flex;
                flex-direction: column;
                margin-top: 40px;
                gap: 25px;
                padding-left: 20px;

                .form-group {
                    display: flex;
                    align-items: flex-start;
                    margin: auto 0;
                    font-size: 14px;

                    label {
                        flex-basis: 25%;
                        margin: auto 0;
                    }

                    input {
                        height: 20px;
                        flex-basis: 0;

                    }
                }
            }

        }

        .pay-way {
            border: 1px solid #828282;
            background: #ffffff;
            border-radius: 20px;
            height: 290px;

            .payment-title {
                height: 48px;
                padding-left: 20px;
                display: flex;
                align-items: center;
            }

            .disc-line {
                height: 1px;
                background-color: #828282;
            }

            .payment-info {
                height: 82%;
                display: flex;
                align-items: center;
                padding-left: 20px;

                form {
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                    width: 100%;
                    margin: auto 0;

                    .form-group {
                        display: flex;
                        align-items: flex-start;
                        margin: auto 0;

                        input[type="radio"] {
                            margin-right: 10px;
                            accent-color: #be1a0e;
                        }

                        label {
                            flex-basis: 25%;
                            margin: auto 0;
                            font-size: 14px;
                        }

                        .card-input {
                            display: flex;
                            width: 30px;
                            flex-basis: 10%;
                        }

                        span {
                            display: inline-block;
                            padding: 0 3px;
                            margin: auto 0;
                        }

                        input[type="text"] {
                            height: 20px;
                            font-size: 14px;
                        }

                        #expiry-date-mm {
                            display: flex;
                            width: 30px;
                            flex-basis: 10%;
                        }

                        #expiry-date-yy {
                            display: flex;
                            width: 30px;
                            flex-basis: 10%;

                        }

                        #cvc {
                            margin-left: 14px;
                            width: 50px;
                            flex-basis: 20%;

                        }

                        .save-card-use {
                            display: flex;
                            align-items: center;

                            input {
                                margin: 0px;
                            }

                            label {
                                flex-basis: 100%;
                                padding-left: 10px;
                            }
                        }

                        .switch {
                            appearance: none;
                            width: 40px;
                            height: 20px;
                            background: #ddd;
                            border-radius: 10px;
                            position: relative;
                            cursor: pointer;
                            outline: none;
                            transition: background 0.3s;

                            &:checked {
                                background: #4caf50;
                            }

                            &::before {
                                content: '';
                                position: absolute;
                                width: 18px;
                                height: 18px;
                                background: #fff;
                                border-radius: 50%;
                                top: 1px;
                                left: 1px;
                                transition: transform 0.3s;
                            }

                            &:checked::before {
                                transform: translateX(20px);
                            }
                        }

                        .switch-alert {
                            color: #be1a0e;
                            font-size: 12px;
                            padding-left: 20px;
                        }
                    }
                }
            }
        }

        .invoice {
            border: 1px solid #828282;
            background: #ffffff;
            border-radius: 20px;
            margin: 40px 0;

            .invoice-item {
                margin: auto;
                padding: 30px 0 10px 0;

                .item-description {
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20px;

                    p {
                        margin: 5px 0;
                    }

                    .item-total {
                        margin: 0 10px;
                        width: 33.33%;
                    }

                    .useCoupon {
                        display: flex;
                        justify-content: space-around;
                        width: 66.66%;
                        margin: auto;

                        .item-multiplication {
                            margin: 0 10px;
                            width: 50%;
                        }

                        .item-discount {
                            margin: 0 10px;
                            width: 50%;
                        }
                    }


                }




                .disc-line {
                    height: 1px;
                    background-color: #828282;
                }

            }



            .invoice-total {
                margin: auto 40px;
                text-align: right;
                padding: 20px 0;
                font-weight: 600;
            }

        }

        .confirm-checkout {

            button {
                background-color: transparent;
                border: none;
                background: #be1a0e;
                border-radius: 20px;
                width: 130px;
                height: 50px;
                color: #ffffff;
                font-size: 16px;
                cursor: pointer;
            }
        }




    }
}

@media screen and (max-width: $md) {
    .go-back {
        font-size: 14px;
    }

    .checkout-container {
        width: 80%;
        margin: 50px auto;

        .confirm-info {
            border: 1px solid #828282;
            background: #ffffff;
            border-radius: 20px;
            height: 240px;

            .confirm-title {
                height: 48px;
                padding-left: 20px;
                display: flex;
                align-items: center;
                font-size: 14px;

            }

            .ord-info {
                height: 80%;
                display: flex;
                align-items: center;
                padding-left: 20px;

                form {
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                    width: 100%;

                    .form-group {
                        display: flex;
                        align-items: flex-start;
                        margin: auto 0;

                        label {
                            flex-basis: 40%;
                            margin: auto 0;
                            font-size: 14px;
                        }

                        input {
                            height: 20px;
                            flex-basis: 20%;
                        }
                    }
                }
            }
        }

        .confirm-ord {
            border: 1px solid #828282;
            background: #ffffff;
            border-radius: 20px;
            margin: 40px 0;

            .confirm-ord-title {
                font-size: 14px;
            }

            .receiver-info {
                font-size: 14px;

                .receiver {
                    position: relative;
                    margin-right: 80px;

                    &::before {
                        content: "";
                        position: absolute;
                        height: 16px;
                        width: 2px;
                        background-color: rgba(190, 26, 14, 1);
                        left: -10px;
                        bottom: 0;
                        top: 0;
                    }
                }

                input {
                    margin: 0 10px 0 0;
                }

            }

            form {
                display: flex;
                flex-direction: column;
                margin-top: 40px;
                gap: 25px;
                padding-left: 20px;
                font-size: 14px;

                #address-form {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;

                    .address-group {
                        display: flex;
                        flex-wrap: wrap;
                        flex: 1;

                        select {
                            height: 26px;
                            flex-basis: auto;
                            margin-right: 10px;
                            background-color: rgba(249, 241, 229, 1);
                            margin: 0 10px 10px 0;
                        }
                    }
                }

                .form-group {
                    display: flex;
                    align-items: flex-start;
                    margin: auto 0;
                    flex-wrap: wrap;

                    label {
                        flex-basis: 40%;
                        margin: auto 0;
                        font-size: 14px;

                    }

                    input {
                        height: 20px;
                        flex-basis: 20%;
                    }


                    .large-textarea {
                        height: 80px;
                        flex-basis: 50%;
                        resize: vertical;
                        /* 允許垂直調整大小 */

                    }


                }

            }

            .invoicing-title {
                display: flex;
                margin: 20px 0;
                padding-left: 30px;
                position: relative;
                font-size: 14px;

                &::before {
                    content: "";
                    position: absolute;
                    height: 16px;
                    width: 2px;
                    background-color: rgba(190, 26, 14, 1);
                    left: 20px;
                    bottom: 0;
                    top: 0;
                }
            }

            .invoicing-form {
                display: flex;
                flex-direction: column;
                margin: 40px 0 20px 0;
                gap: 25px;
                padding-left: 20px;

                .form-group {
                    display: flex;
                    align-items: flex-start;
                    margin: auto 0;

                    label {
                        flex-basis: 40%;
                        margin: auto 0;
                        font-size: 14px;

                    }

                    .invoicing-use {
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        margin-top: 10px;

                        input {
                            height: 20px;
                            flex-basis: 20%;
                        }

                        .invoicing-often {
                            width: auto;

                            .invoicing-cb {
                                margin: 0 10px 0 20px;
                            }

                            span {
                                display: inline-block;
                                margin: auto 0;
                            }
                        }
                    }
                }
            }

        }

        .pay-way {
            border: 1px solid #828282;
            background: #ffffff;
            border-radius: 20px;
            height: 290px;
            font-size: 14px;

            .payment-title {
                height: 48px;
                padding-left: 20px;
                display: flex;
                align-items: center;
            }

            .payment-info {
                height: 82%;
                display: flex;
                align-items: center;
                padding-left: 20px;
                padding-right: 20px;

                form {
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                    width: 100%;
                    margin: auto 0;

                    .form-group {
                        display: flex;
                        align-items: flex-start;
                        margin: auto 0;


                        label {
                            flex-basis: 40%;
                            margin: auto 0;
                            font-size: 14px;
                            flex-shrink: 0;
                            flex-grow: 0;
                        }

                        .card-input {
                            display: flex;
                            width: 30px;
                            flex-basis: 10%;
                            flex-shrink: 1;
                            flex-grow: 1;
                        }

                        span {
                            display: inline-block;
                            padding: 0 3px;
                            margin: auto 0;
                        }

                        input[type="text"] {
                            height: 20px;
                            font-size: 14px;
                        }

                        input::placeholder {
                            font-size: 12px;
                            /* 調整為你需要的字體大小 */
                        }

                        #expiry-date-mm {
                            display: flex;
                            width: 30px;
                            flex-basis: 10%;
                        }

                        #expiry-date-yy {
                            display: flex;
                            width: 30px;
                            flex-basis: 10%;

                        }

                        #cvc {
                            margin-left: 14px;
                            width: 50px;
                            flex-basis: 35%;

                        }

                        .save-card-use {
                            display: flex;
                            align-items: center;

                            input {
                                margin: 0px;
                            }

                            label {
                                flex-basis: 100%;
                                padding-left: 10px;
                            }
                        }

                        .switch {
                            appearance: none;
                            width: 40px;
                            height: 20px;
                            background: #ddd;
                            border-radius: 10px;
                            position: relative;
                            cursor: pointer;
                            outline: none;
                            transition: background 0.3s;

                            &:checked {
                                background: #4caf50;
                            }

                            &::before {
                                content: '';
                                position: absolute;
                                width: 18px;
                                height: 18px;
                                background: #fff;
                                border-radius: 50%;
                                top: 1px;
                                left: 1px;
                                transition: transform 0.3s;
                            }

                            &:checked::before {
                                transform: translateX(20px);
                            }
                        }

                        .switch-alert {
                            color: #be1a0e;
                            font-size: 12px;
                            padding-left: 20px;
                        }
                    }
                }
            }
        }

        .invoice {
            border: 1px solid #828282;
            background: #ffffff;
            border-radius: 20px;
            margin: 40px 0;

            .invoice-item {
                margin: auto;
                padding: 30px 0 10px 0;

                .item-description {
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20px;

                    p {
                        margin: 5px 0;
                        font-size: 14px;
                    }

                    .item-total {
                        margin: 0 10px;
                        width: 33.33%;

                    }

                    .useCoupon {
                        display: flex;
                        justify-content: space-around;
                        width: 66.66%;
                        margin: auto;

                        .item-multiplication {
                            margin: 0 10px;
                            width: 50%;
                        }

                        .item-discount {
                            margin: 0 10px;
                            width: 50%;
                        }
                    }


                }

            }



            .invoice-total {
                margin: auto 40px;
                text-align: right;
                padding: 20px 0;
                font-weight: 600;
                font-size: 14px;
            }

        }

        .confirm-checkout {

            button {
                background-color: transparent;
                border: none;
                background: #be1a0e;
                border-radius: 20px;
                width: 120px;
                height: 46px;
                color: #ffffff;
                font-size: 14px;
                cursor: pointer;
            }
        }




    }
}
</style>