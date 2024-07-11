<template>
    <div class="go-back">
        <router-link to="/customized">
            返回客製化頁面 
        </router-link>
    </div>
    <div class="checkout-container">
        <div class="confirm-info">
            <div class="confirm-title">
                <span>確認訂購人資料</span>
                <!-- <button><i class="fa-solid fa-chevron-down"></i></button> -->
            </div>
            <div class="disc-line"></div>

            <div class="ord-info">
                <form>
                    <div class="form-group">
                        <label for="name">姓名:</label>
                        <input type="text" id="name" v-model="name">
                    </div>
                    <div class="form-group">
                        <label for="phone">聯繫電話：</label>
                        <input type="text" id="phone" v-model="phone">
                    </div>
                    <div class="form-group">
                        <label for="email">電子郵箱：</label>
                        <input type="email" id="email" v-model="email">
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
                <!-- <button><i class="fa-solid fa-chevron-down"></i></button> -->
                <img class="prod-img" :src="customizedData.img" alt="客製化商品">
                <div class="prod-spec">
                    <div class="prod-card">
                        <h5>特製手工油紙傘</h5>
                        <!-- <span>圖案</span><br> -->
                        <div class="mention">*暫不支持超商取貨</div>
                    </div>
                    <div class="prod-count">
                        數量：<span>{{customizedData.amount}}/隻</span>
                    </div>
                    <div class="prod-sum">
                        總計：NT$<span>{{total}}</span>
                    </div>
                    <!-- <div class="prod-card">
                        <h5>數字精緻手工油紙傘</h5>
                        <span>圖案</span><br>
                        <div class="mention">*暫不支持超商取貨</div>
                    </div>
                    <div class="prod-count">
                    數量：<span>2/隻</span>
                    </div>
                    <div class="prod-sum">
                        總計：NT$<span>1398</span>
                    </div> -->
                </div>
            </div>
            <div class="disc-line"></div>
            <div class="receiver-info">
                <span class="receiver">收件人資料</span>
                <input type="checkbox" id="checkbox" v-model="isChecked"><label for="checkbox" class="checkinfo">同訂購人資料</label>
            </div>
            <form>
                <div class="form-group">
                    <label for="name2" >收件人姓名:</label>
                    <input type="text" id="name2" :value="isChecked ? name : ''" readonly>
                </div>
                <div class="form-group">
                    <label for="phone2">收件人聯絡電話：</label>
                    <input type="text" id="phone2" :value="isChecked ? phone : ''" readonly>
                </div>
                <div class="form-group">
                    <label for="address">收件人地址：</label>
                    <select v-model="selectedCity" @change="onCityChange" class="select">
                        <option disabled value="">請選擇縣市</option>
                        <option v-for="city in uniqueCities" :key="city" :value="city">{{ city }}</option>
                    </select>

                    <select v-model="selectedDistrict" class="select" :disabled="!selectedCity">
                        <option disabled value="">請選擇鄉鎮區</option>
                        <option v-for="district in filteredDistricts" :key="district.name" :value="district.name">{{
                            district.name }}</option>
                    </select>

                    <input type="text" v-model="addressDetail" placeholder="請填寫詳細地址">
                </div>
                <div class="form-group">
                    <label for="email2">收件人電子郵箱：</label>
                    <input type="email" id="email2" :value="isChecked ? email : ''" readonly>
                </div>
                <div class="form-group">
                    <label for="prefer-time">偏好收貨時間：</label>
                    <select v-model="preferTime" @change="onTimeChange" class="select">
                        <option disabled value="">請選擇時間段</option>
                        <option v-for="time in times" :key="time.id" :value="time.id">{{ time.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="text">特殊需求備註：</label>
                    <!-- 特殊需求備註要改text格式 -->
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
                    <input type="text" id="invoicing" maxlength="8" :value="checkedCarrier ? loginStore.userData.mem_carrier : ''" readonly>
                    <input type="checkbox" class="invoicing-cb" v-model="checkedCarrier"><span>設定為常用載具</span>
                </div>
                <div class="form-group">
                    <label for="compilation-title">統一編號：</label>
                    <input type="text" id="compilation" maxlength="8" :value="checkedCompany ? loginStore.userData.mem_company : ''" readonly>
                    <input type="checkbox" class="invoicing-cb" v-model="checkedCompany"><span>設定為常用統編</span>
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
                        <input type="text" id="card-number" class="card-input" maxlength="4">
                        <span>-</span>
                        <input type="text" class="card-input" maxlength="4">
                        <span>-</span>
                        <input type="text" class="card-input" maxlength="4">
                        <span>-</span>
                        <input type="text" class="card-input" maxlength="4">
                    </div>
                    <div class="form-group">
                        <label for="expiry-date">有效日期：</label>
                        <input type="text" id="expiry-date-mm" placeholder="MM" maxlength="2">
                        <span>/</span>
                        <input type="text" id="expiry-date-yy" placeholder="YY" maxlength="2">
                        <input type="text" id="cvc" placeholder="信用卡背面的三碼" maxlength="3">
                    </div>
                    <div class="form-group">
                        <div class="save-card-use">
                            <input type="checkbox" id="save-card-cb">
                            <label for="save-card">設定為常用信用卡</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="use-coupon">是否使用優惠券：</label>
                        <input type="checkbox" id="use-coupon" class="switch" disabled><span
                            class="switch-alert">*無可使用之優惠券</span>
                    </div>
                </form>
            </div>
        </div>
        <div class="invoice">
            <div class="invoice-item">
                <div class="item-description">
                    <p>特製手工油紙傘</p>
                    <p>數量：1/隻</p>
                    <p>NT$999(元)</p>
                </div>
                <!-- <div class="item-multiplier">
                    <p>x</p>
                </div>
                <div class="item-discount">
                    <p>優惠折扣(8折)</p>
                    <p>優惠券號碼：CID101</p>
                    <p>80%</p>
                </div> -->

            </div>
            <div class="disc-line"></div>
            <div class="invoice-total">
                <p>總計：NT${{total}}</p>
            </div>
        </div>
        <div class="confirm-checkout">
            <button @click="submitOrder">確認結帳</button>
        </div>
    </div>
</template>
<script>
    // 客製化資料暫存
    import { useCustomizedStore } from '@/stores/customized.js'
    import{mapState}from 'pinia'
    // 登入資料
    import { useLoginStore } from '@/stores/loginStore';

    import {path} from "../../path.js"; //路徑

export default {
    data() {
        return {
            name: '',
            phone: '',
            email: '',
            isChecked: false,
            checkedCarrier: false,
            checkedCompany: false,
            selectedCity: '',
            selectedDistrict: '',
            addressDetail: '',
            preferTime: '',
            times: [
                {
                    id:0,
                    name: '無偏好' 
                },
                { 
                    id:1,
                    name: '上午(9:00~12:00)' 
                },
                { 
                    id:2,
                    name: '下午(13:00~18:00)' 
                }
            ],
            cities: [],
            districts: [],
            memo: '',  // 添加備註
            invoiceNum: '',  // 添加發票號碼
            uniformNum: ''  // 添加統一編號
        };
    },
    computed: {
        // 會員資料
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

        // 引用客製化data , 總計
        ...mapState(useCustomizedStore,['customizedData','total']),
    },
    created() {
        
        // 把會員資料帶到訂購人
        this.name = this.loginStore.userData.mem_name;
        this.phone = this.loginStore.userData.mem_tel;
        this.email = this.loginStore.userData.mem_email;
        
        this.fetchCities();
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

        async submitOrder() {
            const orderData = {
                mem_id: this.loginStore.userData.mem_id,
                ord_name: this.name,
                ord_tel: this.phone,
                ord_mail: this.email,
                ord_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                customized_pic: this.customizedData.img,
                ord_sum: this.total,
                promo_state: 0,  // 假設沒有使用優惠眷
                ord_pay: 0,  // 實際付款方式
                cus_order_state: 0,  // 根據需要設置實際訂單狀態
                ord_note: this.memo,
                receiver_name: this.isChecked ? this.name : '',
                receiver_tel: this.isChecked ? this.phone : '',
                receiver_address: `${this.selectedCity} ${this.selectedDistrict} ${this.addressDetail}`,
                receiver_mail: this.isChecked ? this.email : '',
                prefer_time: this.preferTime,
                invoice_num: this.checkedCarrier ? this.loginStore.userData.mem_carrier : '',
                uniform_num: this.checkedCompany ? this.loginStore.userData.mem_company : ''
            };
            console.log(orderData)

            try {
                let url = path + 'customized_order.php';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                });
                const data = await response.json();
                if (data.error) {
                    console.error(data.msg);
                } else {
                    alert(data.msg);
                    this.$router.push('/product');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

    },
    
};
</script>
<style scoped lang="scss">
.go-back {
    width: 90%;
    margin: 20px auto;

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
        height: 945px;

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
            display: flex;
            padding-left: 20px;
            height: 30%;

            button {
                background-color: transparent;
                border: none;
            }

            .prod-img {
                background-color: #eeedf5;
                // height: auto;
                width: 20%;
                object-fit: cover;
                border-radius: 20px;
                margin: auto 10px auto 0;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    vertical-align: middle;
                }

            }

            .prod-spec {
                display: flex;
                margin: auto 0;
                width: 80%;
                justify-content: space-between;

                .prod-card {
                    h5 {
                        padding-bottom: 10px;
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
                cursor: pointer;
            }
            .checkinfo{
                cursor: pointer;
            }
            

        }

        form {
            display: flex;
            flex-direction: column;
            margin-top: 40px;
            gap: 25px;
            width: 100%;
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
            margin-top: 40px;
            gap: 25px;
            width: 100%;
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
                        flex-basis: 0;

                    }

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
        height: 240px;
        margin: 40px 0;

        .invoice-item {
            margin: auto 10px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 50px 0;


            .item-description,
            .item-discount,
            .item-multiplier {
                text-align: center;
            }

            .item-description p,
            .item-discount p,
            .item-multiplier p {
                margin: 5px 0;
            }

        }

        .disc-line {
            height: 1px;
            background-color: #828282;
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
</style>