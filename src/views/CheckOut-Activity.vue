<template>
    <div class="go-back" v-if="activity">
        <router-link :to="`/activity/${activity.id}`">
            <返回活動詳情頁 </router-link>
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
                        <input type="text" id="name">
                    </div>
                    <div class="form-group">
                        <label for="phone">聯繫電話：</label>
                        <input type="text" id="phone">
                    </div>
                    <div class="form-group">
                        <label for="email">電子郵箱：</label>
                        <input type="email" id="email">
                    </div>
                </form>
            </div>
        </div>
        <div class="confirm-ord">
            <div class="confirm-ord-title">
                <span>確認訂單資料</span>
            </div>
            <div class="disc-line"></div>

            <div class="act-info" v-if="activity">
                <CheckoutAct :item="activity" />
            </div>
            <div class="disc-line"></div>
            <div class="join-info">
                <span class="join-person">參與者資料</span>
                <input type="checkbox"><span>同訂購人資料</span>
            </div>
            <form>
                <div class="form-group">
                    <label for="name">姓名:</label>
                    <input type="text" id="name">
                </div>
                <div class="form-group">
                    <label for="phone">聯繫電話：</label>
                    <input type="text" id="phone">
                </div>
                <div class="form-group">
                    <label for="email">電子郵箱：</label>
                    <input type="email" id="email">
                </div>
                <div class="form-group">
                    <label for="text">特殊需求備註：</label>
                    <!-- 特殊需求備註要改text格式 -->
                    <textarea id="memo" v-model="memo" maxlength="500" class="large-textarea"></textarea>

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
                        <input type="checkbox" id="use-coupon" class="switch" v-model="useCoupon">
                        <!-- <span class="switch-alert">*無可使用之優惠券</span> -->
                    </div>
                </form>
            </div>
        </div>
        <div class="invoice" >
            <div class="invoice-item">
                <div class="item-description">
                    <p>{{ activity.title }}</p>
                    <p>人數：{{ activitycheckout.participantCount }}人</p>
                    <p>NT${{ activitycheckout.totalAmount }}(元)</p>
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
                <p>總計：NT${{ useCoupon ? discountedTotal : totalPrice }}</p>
            </div>
        </div>
        <div class="confirm-checkout">
            <button @click="submitOrder">確認結帳</button>
        </div>
        <SuccessModal :visible="showSuccessModal" message="結帳成功！" @close="closeModal" />
    </div>
    
</template>


<script>
import { useActivityStore } from '../stores/activitycheckout.js';
import CheckoutAct from '../components/layout/CheckoutAct.vue';

import SuccessModal from '../components/layout/SuccessModal.vue';

export default {
    components: { CheckoutAct, SuccessModal },

    data() {
        return {
            id: null,
            useCoupon: false,
            showSuccessModal: false,
            activities: [],
            activityId: null,
            activitycheckout: null, // 假设这是你的活动信息存储对象
            order: {
                name: '',
                phone: '',
                email: '',
                receiverName: '',
                receiverPhone: '',
                receiverEmail: '',
                invoiceNumber: '',
            }
        };
    },
    computed: {
        totalPrice() {
            return this.activitycheckout.totalAmount;
        },
        discountedTotal() {
            return Math.round(this.totalPrice * 0.8);
        },
        activity() {
            return this.activities.find(activity => activity.id === this.activityId);
        },
    },
    methods: {
        submitOrder() {
            // 表单驗證
            // if (!this.order.name || !this.order.phone || !this.order.email || !this.order.receiverName || !this.order.receiverPhone || !this.order.receiverEmail || !this.addressDetail) {
            //     alert('請填寫並確認完成所有訂單資料');
            //     return;
            // }

            // 顯示成功彈窗
            this.showSuccessModal = true;

            // 清空購物車
            this.activitycheckout.cleanCart();
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
        async fetchActivities() {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}activities.json`);
                this.activities = await response.json();

                // 假设从路由参数中获取 id
                this.activityId = +this.$route.query.id;
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        },
    },
    created() {
        this.activitycheckout = useActivityStore(); // 使用活动存储对象
        this.fetchActivities(); // 加载活动数据
    }
};
</script>
<style scoped lang="scss">
@import "@/assets/sass/style";

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
        height: 565px;

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

        // .act-info {
        //     display: flex;
        //     padding-left: 20px;
        //     height: 30%;

        //     button {
        //         background-color: transparent;
        //         border: none;
        //     }

        //     .act-img {
        //         height: 80%;
        //         width: 20%;
        //         object-fit: cover;
        //         border-radius: 20px;
        //         margin: auto 10px;

        //     }

        //     .act-detail {
        //         display: flex;
        //         margin: auto 0;
        //         width: 80%;
        //         justify-content: space-between;

        //         .act-location {
        //             h5 {
        //                 padding-bottom: 10px;
        //             }

        //             span {
        //                 line-height: 150%;
        //                 font-size: 14px;
        //             }

        //             .mention {
        //                 font-size: 12px;
        //                 padding-top: 20px;
        //             }

        //         }

        //         .act-people {
        //             margin: auto;
        //         }

        //         .act-amount {
        //             margin: auto;
        //         }

        //     }
        // }

        .join-info {
            display: flex;
            margin: 20px 0;
            padding-left: 30px;
            align-items: center;

            .join-person {
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
            width: 100%;
            padding-left: 20px;

            .form-group {
                display: flex;
                align-items: flex-start;
                margin: auto 0;

                label {
                    flex-basis: 18%;
                    margin: auto 0;
                }

                input {
                    height: 20px;
                    flex-basis: 25%;
                }

                .large-textarea {
                    height: 80px;
                    flex-basis: 25%;
                    resize: vertical;
                    /* 允許垂直調整大小 */

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

            .item-description{
                text-align:left;

            }

            .useCoupon{
                display: flex;
                justify-content: space-between;
                width: 40%;
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
@media screen and (min-width: $md) and (max-width: $xl) {
    .checkout-container {
        width: 80%;
        margin: 50px auto;

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

                    label {
                        flex-basis: 25%;
                        margin: auto 0;
                        font-size: 14px;
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
                        font-size: 14px;
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
                    text-align:left;                    display: flex;
                    flex-direction: column;
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
            padding-bottom: 150px;

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
                    select {
                        height: 26px;
                        flex-basis: auto;
                        margin-right: 10px;
                        background-color: rgba(249, 241, 229, 1);
                        margin: 0 10px 10px 0;
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

                    input {
                        height: 20px;
                        flex-basis: 20%;
                    }

                    .invoicing-cb {
                        margin: 10px 0;
                        flex-basis: 20%;

                    }

                    span {
                        display: flex;
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
                    text-align:left;
                    display: flex;
                    flex-direction: column;
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