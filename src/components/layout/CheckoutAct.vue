<!-- <template>
    <div class="act-info" v-if="item">
        <img class="act-img" :src="getImageUrl(item.pic)" :alt="item.name">
        <div class="act-detail">
            <div class="act-location">
                <h5>{{ item.title }}</h5>
                <p>地點:{{ item.loc }}</p>
                <p>活動時間: {{ item.date }} {{ activityStore.selectedTime }}</p>
            </div>
            <div class="act-people">
                <p>人數：{{ activityStore.participantCount }}</p>
            </div>
            <div class="act-amount">
                <p>總計：NT${{ activityStore.totalAmount }}</p>
            </div>
        </div>
    </div>
</template>


<script>
import { useActivityStore } from '../../stores/activitycheckout.js';
import { getImageUrl } from '../../utils/utils.js';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const activityStore = useActivityStore();
    return {
      activityStore,
      getImageUrl,
    };
  },
};
</script> -->

<!-- CheckoutAct.vue -->
<template>
    <div class="checkout-activity" v-if="item">
        <img :src="activitycheckout.imageUrl" :alt="item.name" class="activity-image">
        <div class="act-detail">
            <div class="act-info">
                <h5>{{ item.title }}</h5>
                <p>地點:{{  activitycheckout.location }}</p>
                <p>活動時間: {{ item.date }} {{ activitycheckout.selectedTime }}</p>
            </div>
            <div class="act-people">
                <p>人數：{{ activitycheckout.count }}</p>
            </div>
            <div class="act-amount">
                <p>總計：NT${{ activitycheckout.totalAmount }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { useActivityStore } from '../../stores/activitycheckout.js';
export default {
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        activitycheckout() {
      return useActivityStore(); // 使用 `useActivityStore` 方法來取得 Pinia store 的實例
    },
    },
    methods: {
        getAbsoluteImageUrl(relativeUrl) {
            // 假設圖片位於 `/assets/images/` 目錄下，你可以根據實際情況調整路徑
            return `/assets/images/${relativeUrl}`;
        },
    },
};
</script>

<style lang="scss" scoped>
 @import "@/assets/sass/style";

.card {
    display: flex;
    padding-left: 20px;
    height: 30%;

    .prod-detail {
        display: flex;
        margin: 20px 0;

        img {
            height: auto;
            width: 20%;
            object-fit: cover;
            border-radius: 20px;
            margin: auto 10px auto 0;

        }

        .prod-spec {
            display: flex;
            margin: auto 0;
            width: 80%;


            .info {
                width: 40%;

                h5 {
                    padding-bottom: 10px;
                }

                span {
                    line-height: 150%;
                    font-size: 14px;
                }
            }

            .amount {
                width: 30%;
                display: flex;
                margin: auto;
                justify-content: center;
            }

            .price {
                display: flex;
                width: 30%;
                margin: auto;
                justify-content: center;
            }

        }
    }
}

.checkout-activity {
    display: flex;
    padding-left: 20px;
    height: 30%;

    @media screen and (max-width: $md){
        flex-direction: column;
    }

    .activity-image {
        height: auto;
        width: 23%;
        object-fit: cover;
        border-radius: 20px;
        margin: 20px 10px 20px 0;

        @media screen and (max-width: $md){
            width: 40%;    }

    }

    .act-detail {
        display: flex;
        margin: auto 0;
        width: 80%;

        @media screen and (max-width: $md){
        flex-direction: column;
    }

        .act-info {
            h5 {
                padding-bottom: 10px;
            }

            p{padding-bottom: 10px;
                letter-spacing: 1px;
            }

            .mention {
                font-size: 12px;
                padding-top: 20px;
            }

        }

        .act-people, .act-amount {
            margin: auto;

            @media screen and (max-width: $md){
                margin: 0;
                padding-bottom: 10px;    
            }
        }

    }
}
</style>