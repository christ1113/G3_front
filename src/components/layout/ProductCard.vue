<template>
    <div v-if="item" class="card-single">
        <router-link :to="`/product/${item.prod_id}`">
            <div class="card-pic">
            <img v-if="item.prod_img1" :src="parseIcon(item.prod_img1)" :alt="item.prod_name">
            <img v-else src="" alt="">
            <div class="card-fav">
                <div class="card-fav-icon" @click.prevent="toogleFav(item.prod_id)" >
                    <!-- <i v-if="item.fav" class="fa-solid fa-heart"></i>
                    <i v-else class="fa-regular fa-heart"></i> -->
                </div>
            </div>
        </div>
        <div class="card-txt">
            <div class="card-tag">
                <span>{{ item.prod_category || '' }}</span>
            </div>
            <div class="card-title">
                {{ item.prod_name || '' }}
            </div>
            <div class="card-rating">
                <span v-for="star in Math.floor(item.prod_rating)" :key="star">
                    🌟
                </span>
            </div>
            <div class="card-price">
                NT${{ item.prod_price || '' }}
            </div>

        </div>
        </router-link>  
    </div>
</template>

<script>
export default {
    props: ['item'],
    methods: {
        parseIcon(file) {
            // 指到src || ..的意思是“回到上一層”
            return new URL(`../../assets/pic/product/${file}`, import.meta.url).href
        },
        toogleFav(id) {
            this.item.fav = !this.item.fav;
        }
    }
}
</script>

<style lang="scss" scoped >
.card-single {
    width: 280px;
    .card-pic {
        position: relative;
        margin-bottom: 15px;

        > img {
            width: 100%;
            border-radius: 20px;
            object-fit: cover;
        }

        .card-fav {
            position: absolute;
            right: 10px;
            bottom: 10px;

            .card-fav-icon {
                .fa-heart {
                    color: #CB2E27;
                    font-size: 30px;
                }
            }

        }
    }

    .card-txt {
        padding: 5px;

        .card-tag {
            margin-bottom: 15px;

            > span {
                background-color: #fff;
                border-radius: 15px;
                padding: 2px 10px;
                font-size: 16px;
                color: #CB2E27;
                border: #CB2E27 1px solid;
            }
        }

        .card-title {
            font-size: 20px;
            font-weight: bold;
            color: #564A41;
            margin-bottom: 15px;
        }

        .card-rating {
            margin-bottom: 15px;
        }

        .card-price {
            font-family: noto sans tc;
            font-size: 20px;
            color: #564A41;
        }
    }

}
</style>