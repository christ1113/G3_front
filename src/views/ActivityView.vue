<template>

  <section class="section-activity-banner">
    <div class="activity-banner">
      <h1>活動資訊</h1>
    </div>
  </section>
  <section class="section-activity-nav">
    <div class="activity-category">
      <div class="register">
        <h4>報名</h4>
        <button @click="filterByStatus('全部')" :class="{ 'default-status': currentStatus === '全部' }">
          <p>全部</p>
        </button>
        <button @click="filterByStatus(1)" :class="{ 'default-status': currentStatus === 1 }">
          <p>進行中</p>
        </button>
        <button @click="filterByStatus(2)" :class="{ 'default-status': currentStatus === 2 }">
          <p>已結束</p>
        </button>
      </div>
      <div class="category">
        <h4>類型</h4>
        <button @click="filterByType('全部')" :class="{ 'default-type': currentType === '全部' }">
          <p>全部</p>
        </button>
        <button @click="filterByType(0)" :class="{ 'default-type': currentType === 0 }">
          <p>DIY 手作</p>
        </button>
        <button @click="filterByType(1)" :class="{ 'default-type': currentType === 1 }">
          <p>導覽預約</p>
        </button>
        <button @click="filterByType(2)" :class="{ 'default-type': currentType === 2 }">
          <p>文創市集</p>
        </button>
      </div>
    </div>
    <div class="search-filter">
      <div class="search-box"><img src="@/assets/pic/search.png" alt=""><input @input="filterData" type="text"
          v-model="search" class="search-input" placeholder="搜尋活動名稱"><i class="fa-solid fa-x" @click="clear"></i></div>
      <button @click="toggleFilterPopup"><img src="@/assets/pic/filter.png" alt="">
        <p>篩選</p>
      </button>
      <div v-if="showFilterPopup" class="filter-popup">
        <div class="filter-popup-content">
          <button class="closebtn" @click="closeFilterPopup">✖</button>
          <h4>篩選</h4>
          <h5>地點</h5>
          <div class="filter-loc">
            <button @click="filterByLoc('高雄')" :class="{ 'current-loc': currentLoc === '高雄' }">
              <p>高雄</p>
            </button>
            <button @click="filterByLoc('台北')" :class="{ 'current-loc': currentLoc === '台北' }">
              <p>台北</p>
            </button>
          </div>
          <h5>活動日期</h5>
          <div class="filter-date">
            <div class="datepicker"><datepicker v-model="range.start" format="yyyy-MM-dd" placeholder="開始日期" @change="applyFilters" :style="{ width:'100%', color: '#564A41', textAlign:'center', fontSize:'16px', borderRadius: '5px', padding: '10px 0px', border: '1px solid #A9A8A8' }"></datepicker></div>
            <div>~</div>
            <div class="datepicker"><datepicker v-model="range.end" format="yyyy-MM-dd" placeholder="結束日期" @change="applyFilters" :style="{ width:'100%', color: '#564A41', textAlign:'center', fontSize:'16px', borderRadius: '5px', padding: '10px 0px', border: '1px solid #A9A8A8' }"></datepicker></div>
          </div>
          <hr>
          <div class="filter-result">
            <button class="clear-btn" @click="clearFilters">
              <p>清除</p>
            </button>
            <button class="result-btn" @click="applyFilters">
              <p>查看結果</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section-activity">
    <div class="activity-card" v-for="(activity, index) in filteredActivities" :key="index"
      @click="goToActivityDetail(activity.act_id)">
      <div class="card-pic">
        <img :src="parseImg(activity.act_img1)" alt="活動圖片">
      </div>
      <div class="card-title">
        <h5>{{ activity.act_name }}</h5>
      </div>
      <div class="card-date">{{ activity.act_date }}</div>
      <div class="card-time">{{ activity.sess_time }}</div>
      <div class="card-loc"><img src="@/assets/pic/activity/map.png" alt="">{{ activity.act_loc }}</div>
      <div class="card-price">NT${{ activity.act_price }}</div>
    </div>
  </section>

</template>

<script>
import 'v-calendar/style.css';
import Datepicker from 'vue3-datepicker';

export default {
  name: 'ActivityView',
  components: {
    Datepicker
  },
  data() {
    return {
      activities: [],
      responseData: [],
      search: "",
      currentStatus: '全部',
      currentType: '全部',
      currentLoc: '',
      showFilterPopup: false,
      range: {
        start: null,
        end: null,
      },
      filterPending: false,  // 標示是否需要重新計算篩選結果
    };
  },
  // mounted() {
  //   fetch(`${import.meta.env.BASE_URL}activities.json`)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.activities = data;
  //       this.responseData = data;

  //     })
  //     .catch(error => console.error('Error fetching activities:', error));
  mounted() {
    const body = {
      // 確保身體定義並包含正確的數據
    };

    fetch(`http://localhost/G3_php/activity.php`, {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok ' + res.statusText);
        }
        return res.json();
      })
      .then(json => {
        // 確認有沒有response
        console.log(json);
        this.responseData = json["data"]["list"];
        this.activities = json["data"]["list"];
        console.log(this.activities);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  },
  computed: {

    filteredActivities() {
      if (this.filterPending) {
        // 對 activities 數據進行篩選
        return this.activities.filter(activity => {
          // 檢查活動的狀態是否匹配當前篩選條件
          const matchesStatus = this.currentStatus === '全部' || activity.act_status === this.currentStatus;
          // 檢查活動的類型是否匹配當前篩選條件
          const matchesType = this.currentType === '全部' || activity.act_type === this.currentType;
          // 檢查活動的地點是否匹配當前篩選條件
          const matchesLoc = this.currentLoc === '' || activity.act_loc === this.currentLoc;
          const matchesDate = !this.range.start || !this.range.end ||
            (new Date(activity.act_date) >= new Date(this.range.start) && new Date(activity.act_date) <= new Date(this.range.end));
          // 檢查活動的標題是否包含搜索關鍵字
          const matchesSearch = activity.act_name.includes(this.search);
          // 只有當活動同時滿足狀態、類型和搜索條件時，才會被篩選出來
          return matchesStatus && matchesType && matchesSearch && matchesLoc && matchesDate;
        });
      }
      return this.activities; // 初始返回所有活動
    }
  },
  methods: {
    parseImg(file) {
      // 指到src || ..的意思是“回到上一層”
      return new URL(`../assets/pic/activity/${file}`, import.meta.url).href;
    },
    goToActivityDetail(id) {
      this.$router.push({ name: 'activitydetail', params: { id } });
    },
    filterByStatus(status) {
      this.filterPending = true;
      this.currentStatus = status;
    },
    filterByType(type) {
      this.filterPending = true;
      this.currentType = type;
    },
    filterByLoc(loc) {
      this.filterPending = false;
      this.currentLoc = loc;
    },
    filterData() {
      this.filterPending = true;
      console.log(this.search);
      this.activities = this.responseData.filter((activity) => {
        return activity.act_name.includes(this.search);
      });
    },
    clear() {
      this.search = "";
      this.activities = this.responseData;
    },
    toggleFilterPopup() {
      this.showFilterPopup = !this.showFilterPopup;
      document.body.style.overflow = this.showFilterPopup ? 'hidden' : 'auto';
    },
    closeFilterPopup() {
      this.showFilterPopup = false;
      document.body.style.overflow = 'auto';
    },
    clearFilters() {
      this.currentLoc = '';
      this.range = { start: null, end: null };
      this.filterPending = true;
    },
    applyFilters() {
      if (this.range.end && this.range.start && new Date(this.range.end) < new Date(this.range.start)) {
        alert("結束日期須大於開始日期");
        return;
      }
      this.filterPending = true;
      this.toggleFilterPopup();
      // this.range.start = null;
      // this.range.end = null;
    }
  }
}
</script>

<style lang="scss" scoped>


.filter-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .filter-popup-content {
    width: 400px;
    height: 400px;
    background-color: #FAF8F4;
    border: 1px solid #564A41;
    border-radius: 30px;
    position: relative;

    >h4 {
      margin: 20px 0px 0px 20px;
    }

    >h5 {
      margin: 30px 0px 20px 20px;
    }

    .closebtn {
      cursor: pointer;
      border: 0;
      background: transparent;
      position: absolute;
      right: -35px;
      top: -10px;
      font-size: 25px;
      color: #FAF8F4;
    }

    .filter-loc {
      margin-left: 20px;
      display: flex;
      gap: 30px;

      .current-loc {
        background-color: #BE1A0E;

        >p {
          color: white;
        }
      }

      >button {
        border: 1px solid #A9A8A8;
        border-radius: 20px;
        background: transparent;
        cursor: pointer;

        >p {
          padding: 10px 20px;
        }

      }

    }

    .filter-date {
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      .datepicker{
        width: 40%;
      }
      .v3dp__datepicker {
    --popout-bg-color: var(--vdp-bg-color, #fff);
    --text-color: var(--vdp-text-color, #564A41);
    --border-radius: var(--vdp-border-radius, 5px);
    --heading-size: var(--vdp-heading-size, 20px);
    --heading-weight: var(--vdp-heading-weight, bold);
    --heading-hover-color: var(--vdp-heading-hover-color, #eeeeee);
    --arrow-color: var(--vdp-arrow-color, #564A41);
    --elem-color: var(--vdp-elem-color, #564A41);
    --elem-hover-color: var(--vdp-hover-color, #fff);
    --elem-hover-bg-color: var(--vdp-hover-bg-color, #B1241A);
    --elem-selected-color: var(--vdp-selected-color, #fff);
    --elem-selected-bg-color: var(--vdp-selected-bg-color, #B1241A);
    --elem-current-outline-color: var(--vdp-current-date-outline-color, none);
    --elem-current-font-weight: var(--vdp-current-date-font-weight, none);
    --elem-font-size: var(--vdp-elem-font-size, .8em);
    --elem-border-radius: var(--vdp-elem-border-radius, 3px);
    position: relative;
}

      >div{
        font-size: 20px;
      }
    }

    >hr {
      margin-top: 20px;

    }

    .filter-result {
      margin: 25px 20px;
      display: flex;
      justify-content: space-between;

      .clear-btn {
        border: 0;
        background: transparent;
        cursor: pointer;

        >p {
          text-decoration: underline;
        }
      }

      .result-btn {
        background-color: #BE1A0E;
        border-radius: 30px;
        padding: 20px 50px;
        border: none;
        cursor: pointer;

        >p {
          color: white;
        }
      }
    }
  }
}
</style>