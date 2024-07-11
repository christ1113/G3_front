<template>
    <section class="mem-buy">
        <div class="mem-title">
            <h1>報名紀錄</h1>
        </div>
        <hr />
        <div class="mem-box">
            <MemberManageList class="mem-list" />
            <div class="activityorder-cardlist">
                <div class="activityorder-card" v-for="(activity, index) in activities" :key="index">
                    
                    <div class="card-pic" >
                        <img :src="parseImg(activity.pic)" alt="活動圖片">
                    </div>
                    <div class="card-info">
                        <h5>{{ activity.loc }}|{{ activity.title }}</h5>
                        <p>活動日期:{{ activity.date }}</p>
                        <p>活動時間:{{ activity.time1 }}</p>
                        <p>活動費用:{{ activity.subtotal }}</p>
                    </div>
                    <div class="cancel">
                        <button class="btn">取消報名</button>
                        <p>註: 活動當天不能取消</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import MemberManageList from '../components/layout/MemberManageList.vue'

export default {
    components: {
        MemberManageList
    },
    data() {
        return {
            activities: [],
            responseData: [],
        }
    },
    mounted() {
        fetch(`${import.meta.env.BASE_URL}activitiesorder.json`)
            .then(response => response.json())
            .then(data => {
                this.activities = data;
                this.responseData = data;

            })
            .catch(error => console.error('Error fetching activities:', error));
    },
    methods: {
        parseImg(file) {
            // 指到src || ..的意思是“回到上一層”
            return new URL(`../assets/pic/activity/${file}`, import.meta.url).href;
        },
        goToActivityDetail(id) {
            this.$router.push({ name: 'activitydetail', params: { id } });
        },
    }
}

</script>

<style lang="scss" scoped>
@import "@/assets/sass/style";

.mem-buy {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: auto;
    position: relative;

    .mem-title {
        width: 100%;
        text-align: center;

        >h1 {
            margin-top: 50px;
            color: #564a41;

            @media screen and (max-width:576px) {
                margin-top: 180px;
            }

            @media screen and (min-width:577px) and (max-width:996px) {
                margin-top: 150px;
            }
        }
    }

    hr {
        width: 100%;
        color: #564a41;
        margin: 2% auto;
    }

    .mem-box {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin: 2% 0 15% 0;
        width: 100%;

        @media screen and (max-width:576px) {
            justify-content: space-around;
        }

        @media screen and (min-width:577px) and (max-width:996px) {
            justify-content: space-around;

            .mem-list {
                margin: 0 auto;
            }


        }

        .mem-list {
            @media screen and (max-width:576px) {
                position: absolute;
                top: 0%;
                left: 0%;
                height: auto;
                display: grid;
                row-gap: 15px;
            }

            @media screen and (min-width:577px) and (max-width:996px) {
                position: absolute;
                top: 0%;
                left: 0%;
            }
        }

        .activityorder-cardlist {
            width: 80%;
            display: flex;
            flex-direction: column;

            .activityorder-card {
                display: flex;
                justify-content: space-around;
                margin-bottom: 40px;

                @media screen and (max-width: $md) {
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }

                .card-pic {
                    width: 30%;
                    aspect-ratio: 4/3;
                    border-radius: 10px;
                    overflow: hidden;
                    cursor: pointer;

                    @media screen and (max-width: $md) {
                        width: 70%;
                }


                    img {
                        object-fit: cover;
                        width: 100%;
                        height: 100%;
                    }
                }

                .card-info{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    @media screen and (max-width: $md) {
                        gap:20px;
                }
                    

                }

                .cancel{
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;

                }

            }


        }






    }


}
</style>
