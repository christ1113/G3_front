<template >
    <section class="section-customized">
        <div class="customized-bgc-l">
                    <img src="/src/assets/pic/customized/customized-bgc-l.png" alt="">
                </div>
        <div class="customized-bgc-r">
            <img src="/src/assets/pic/customized/customized-bgc-r.png" alt="">
        </div>
        
        <!-- 客製化開始 -->
        <div class="container-customized-start" v-show="currentStep === 1">
            <h1 @click="currentStep++">打造專屬自我風格
                <span>( 點擊立即開始 )</span>
            </h1>
        </div>
        
        <!-- 客製化 step 1 -->
        <div class="container-customized-step1" v-show="currentStep === 2">
            <div class="container-box">
                <div class="title">
                    <div class="circle">
                        <span class="num1">1</span>
                        <span class="num2">3</span>
                    </div>
                    <h3>選擇喜歡的傘面材質</h3>
                </div>
                <div class="pics">
                    <div
                    v-for="(pic, index) in pics"
                    :key="index"
                    :class="{'dark': selectedIndex !== null && selectedIndex !== index}"
                    class="pic"
                    @click="selectPic(index)"
                    >
                        <img :src="parseIcon(pic.img)" />
                        <h4>{{ pic.title }}</h4>
                    </div>
                </div>
                <div class="next-arrow" @click="nextStep">
                    <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.897949 0.816406L10.0816 10.0001L1.91836 18.1633" stroke="#B1241A" stroke-linecap="round"/>
                    </svg>
                </div>
                
            </div>
        </div>

        <!-- 客製化 step 2 -->
        <div class="container-customized-step2" v-show="currentStep === 3">
            <div class="container-box">
                <div class="title">
                    <div class="circle">
                        <span class="num1">2</span>
                        <span class="num2">3</span>
                    </div>
                    <h3>設計出你的獨特傘面</h3>
                </div>
                <!-- 圖片清單列 -->
                <div class="design-group">
                    <div class="customized-list">
                        <div class="item-list">
                            <div class="item"  @click="showGroup('upload')" :class="{'selected': currentGroup === 'upload'}">
                                <div class="icon">
                                    <img src="/src/assets/pic/customized/customized-img.png" alt="">
                                </div>
                                <span>上傳圖片</span>
                            </div>
                            <div class="item"  @click="showGroup('template')" :class="{'selected': currentGroup === 'template'}">
                                <div class="icon">
                                    <img src="/src/assets/pic/customized/customized-template.png" alt="">
                                </div>
                                <span>範本</span>
                            </div>
                            <div class="item"  @click="showGroup('icon')" :class="{'selected': currentGroup === 'icon'}">
                                <div class="icon">
                                    <img src="/src/assets/pic/customized/customized-i-con.png" alt="">
                                </div>
                                <span>I-Con</span>
                            </div>
                            <div class="item" @click="undo()">
                                <div class="icon">
                                    <img src="/src/assets/pic/customized/customized-back.png" alt="">
                                </div>
                                <span>上一步</span>
                            </div>
                            <div class="item" @click="removeAll()">
                                <div class="icon">
                                    <img src="/src/assets/pic/customized/customized-reset.png" alt="">
                                </div>
                                <span>重置</span>
                            </div>
                        </div>
                        <div class="img-group" v-if="currentGroup === 'upload' || currentGroup === 'template' || currentGroup === 'icon'">
                            <div class="pics">
                                <label for="upload" class="upload" v-if="currentGroup === 'upload'">
                                    點擊上傳
                                    <input type="file" name="upload" id="upload" @change="handleFileUpload">
                                </label>
                                <div class="pic" v-for="(pic, index) in getImageList(currentGroup)" :key="index" @click="selectImage(pic.img)">
                                    <img :src="pic.img">
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <!-- 設計區域 -->
                    <div class="design-back">
                        <div class="design">
                            <div class="design-canvas" ref="designCanvas" @click="deselectAll">
                                <div class="design-item"
                                v-for="(item, index) in designItems"
                                :key="index"
                                :style="{ 
                                    top: item.top + 'px', 
                                    left: item.left + 'px', 
                                    transform: `scale(${item.scale})`,
                                    transformOrigin: 'top left',
                                    zIndex: item.zIndex 
                                }"
                                @mousedown="selectItem(index, $event)"
                                @dblclick="removeItem(index)"
                                >
                                <img :src="item.src" alt="" :style="{ width: item.width + 'px', height: item.height + 'px' }">
                                <div class="resize-handle"
                                    @mousedown.stop="startResize(index, $event)"
                                    v-if="selectedItemIndex === index"
                                ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 隱藏畫布區域 -->
                    <canvas ref="hiddenCanvas" style="display: none;"></canvas>
                    <!-- 預覽區域 -->
                    <div class="preview-item">
                        <div class="preview">
                            <h5>效果預覽</h5>
                            <div class="pic-back">
                                <div class="pic">
                                    <img :src="selectedImage" v-if="designItems.length > 0">
                                    <img src="/src/assets/pic/customized/Preview.png" alt=""  v-else="!designItems">
                                </div>
                            </div>
                        </div>
                        <div class="txt">
                            ( 點擊圖案兩下即可移除 )
                        </div>
                        <div class="arrow">
                            <div class="next-arrow back" @click="currentStep--">
                                <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.897949 0.816406L10.0816 10.0001L1.91836 18.1633" stroke="#B1241A" stroke-linecap="round"/>
                                </svg>
                            </div>
                            <div class="next-arrow" @click="showBox2 = true">
                                <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.897949 0.816406L10.0816 10.0001L1.91836 18.1633" stroke="#B1241A" stroke-linecap="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <!-- 客製化 step 3 -->
        <div class="container-customized-step3"  v-show="currentStep === 4">
            <div class="container-box">
                <div class="title">
                    <div class="circle">
                        <span class="num1">3</span>
                        <span class="num2">3</span>
                    </div>
                    <h3>成功打造專屬於你的油紙傘</h3>
                </div>
                <div class="info">
                    <div class="pics">
                        <div class="smallpics">
                            <div class="pic" v-for="(pic, index) in smallPics" 
                                :key="index" 
                                @click="showBigPic(pic.img)">
                                <img :src="parseIcon(pic.img)" alt="">
                            </div>
                        </div>
                        <div class="bigpic">
                            <img :src="parseIcon(bigPic.img)" alt="">
                        </div>
                    </div>    
                    <div class="txt">
                        <h3>特製手工油紙傘</h3>
                        <span class="tag">獨一無二</span>
                            <span>NT$ {{customizedData.price}}</span>
                            <span>合計$ {{total}}</span>
                        <div class="amount">
                            <span>數量：</span>
                            <button @click="decrement()"><i class="fa-solid fa-minus"></i></button>
                            <span>{{customizedData.amount}}</span>
                            <button @click="increment()"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div class="button">
                                <button class="btn" @click="uploadFinalImg()">
                                        <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M25 2.6061V18.2427C25 18.9594 24.7552 19.5729 24.2656 20.0833C23.776 20.5937 23.1875 20.8488 22.5 20.8488H2.5C1.8125 20.8488 1.22396 20.5937 0.734375 20.0833C0.244792 19.5729 0 18.9594 0 18.2427V2.6061C0 1.88943 0.244792 1.27591 0.734375 0.765543C1.22396 0.255181 1.8125 0 2.5 0H22.5C23.1875 0 23.776 0.255181 24.2656 0.765543C24.7552 1.27591 25 1.88943 25 2.6061ZM2.5 5.21221H22.5V2.6061H2.5V5.21221ZM2.5 10.4244V18.2427H22.5V10.4244H2.5Z" fill="white"/>
                                        </svg>
                                    直接購買
                                </button>
                            <router-link to="/product">
                                <button class="btn">取消</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="box" v-if="showBox" >
            <h4>親，尚未選擇傘面</h4>
            <div class="btn-group">
                <button class="btn" @click="confirm">確定</button>
            </div>
        </div>

        <div class="box" v-if="showBox2" >
            <h4>親，確定後就不能再修改嘍 ~</h4>
            <div class="btn-group">
                <button class="btn" @click="confirm">繼續設計</button>
                <button class="btn" @click="finalDesign">我完成了</button>
            </div>
        </div>

    </section>
</template>

<script>
    import { useCustomizedStore } from '@/stores/customized.js'
    import{mapState,mapActions}from 'pinia'

    export default{
        data() {
            return {
                currentStep : 1,
                // step 1
                pics: [
                    {   
                        img: 'material_pic1.jpg',  
                        title: '棉布' 
                    },
                    { 
                        img: 'material_pic2.jpg', 
                        title: '綢布' 
                    },
                    { 
                        img: 'material_pic3.jpg', 
                        title: '宣紙' }
                    ],
                selectedIndex : null,
                showBox: false,

                // step 2

                showBox2: false,
                operationHistory: [], // 儲存使用者動作
                designItems: [], // 存放圖案位置 { src, top, left, scale, zIndex }
                selectedImage: null,
                currentGroup: null,
                showImg: false,
                isResizing: false,
                isMoving: false,
                selectedItemIndex: null,
                initialMouseX: 0,
                initialMouseY: 0,
                initialItemLeft: 0,
                initialItemTop: 0,
                initialScale: 1,
                picArrays: {
                    upload: [],
                    template: [
                        { img: 'template-1.jpg' },
                        { img: 'template-2.jpg' }
                    ],
                    icon: [
                        { img: 'icon-1.png' },
                        { img: 'icon-2.png' },
                        { img: 'icon-3.png' },
                        { img: 'icon-4.png' },
                        { img: 'icon-5.png' },
                        { img: 'icon-6.png' },
                        { img: 'icon-7.png' },
                        { img: 'icon-8.png' },
                        { img: 'icon-9.png' }
                    ]
                },

                // step 3
                smallPics: [
                    { 
                        img:''
                    },
                    { 
                        img: 'finish2.jpg'
                    }
                ],
                bigPic: { 
                    img: ''
                },
                }
        },
        computed: {
            // 引用data , 總計
            ...mapState(useCustomizedStore,['customizedData','total']),
        },
        methods: {
            parseIcon(file) {
                if(file.indexOf('blob') === -1){
                    // 指到src || ..的意思是“回到上一層”
                    return new URL(`../assets/pic/customized/${file}`, import.meta.url).href
                } else {
                    return file
                }
            
            },

            // step1 沒被選擇的變暗
            selectPic(index) {
                this.selectedIndex = index;
            },

            // 下一步的判斷
            nextStep() {
                if (this.selectedIndex === null ) {
                    this.showBox = true;
                } else {
                    this.currentStep++;
                    this.showBox = false;
                }
            },
            // 點擊按鈕後關閉box
            confirm() {
                this.showBox = false;
                this.showBox2 = false;
            },

            // step 2
            saveToHistory() {
                this.operationHistory.push(JSON.parse(JSON.stringify(this.designItems)));
            },

            finalDesign(){
                this.currentStep++ ;
                this.showBox2 = false;
                this.smallPics[0].img = this.selectedImage
                this.bigPic.img = this.selectedImage
                this.customizedData.amount = 1
            },

            showGroup(group) {
                if (this.currentGroup === group) {
                this.currentGroup = null;
                } else {
                this.currentGroup = group;
                }
            },

            getImageList(group) {
                let arrs = []
                arrs = JSON.parse(JSON.stringify(this.picArrays[group]))
                arrs.forEach(element => {
                    element.img = (group === 'upload' ? element.img : this.parseIcon(element.img))
                });
                return arrs;
            },

            handleFileUpload(event) {
                const file = event.target.files[0];
                // if (file) {
                //     const reader = new FileReader();
                //     reader.onload = (e) => {
                //         this.picArrays.upload.push(e.target.result);
                //     };
                //     reader.readAsDataURL(file);
                // }
                this.picArrays.upload.push({img: (window.URL.createObjectURL(event.target.files[0]))})
                this.saveToHistory();
            },



            selectImage(image) {
                const img = new Image();
                img.onload = () => {
                    const aspectRatio = img.width / img.height;
                    const isBackground = this.currentGroup === 'template';
                    const canvasWidth = this.$refs.designCanvas.offsetWidth;
                    const canvasHeight = this.$refs.designCanvas.offsetHeight;

                    const desiredWidth = isBackground ? this.canvasWidth : 200;  
                    const desiredHeight = isBackground ? canvasWidth / aspectRatio : desiredWidth / aspectRatio;

                    const newItem = {
                    src: image,
                    top: isBackground ? (canvasHeight- desiredHeight)/3 : 100,
                    left: isBackground ? 0 : 100,
                    width: isBackground ? canvasWidth : desiredWidth,
                    height: isBackground ? canvasHeight : desiredHeight,
                    scale: isBackground ? 1.2 : 1,
                    zIndex: isBackground ? 0 : this.designItems.length + 1
                    };
                    if(isBackground) {
                        // 如果是背景圖片，替換掉現有的背景圖片
                        if (this.designItems.length > 0 && this.designItems[0].zIndex === 0) {
                            this.designItems[0] = newItem;
                        } else {
                            this.designItems.unshift(newItem);
                        }
                    } else {
                        this.designItems.push(newItem);
                    }
                    this.updatePreview();
                    this.saveToHistory();
                };
                img.src = image;
            },

            updatePreview() {
                const canvas = this.$refs.hiddenCanvas;
                const designCanvas = this.$refs.designCanvas;

                // 設置 canvas 大小與設計區域相同
                canvas.width = designCanvas.offsetWidth;
                canvas.height = designCanvas.offsetHeight;

                // 創建設計層和最終層 canvas
                const createCanvas = () => {
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = canvas.width;
                    tempCanvas.height = canvas.height;
                    return tempCanvas;
                };

                const designLayer = createCanvas();
                const finalCanvas = createCanvas();
                const designCtx = designLayer.getContext('2d');
                const finalCtx = finalCanvas.getContext('2d');

                // 在 designLayer 上繪製所有設計元素
                const drawPromises = this.designItems
                    .sort((a, b) => a.zIndex - b.zIndex)
                    .map(item => new Promise(resolve => {
                        const img = new Image();
                        img.onload = () => {
                            designCtx.save();
                            designCtx.translate(item.left, item.top);
                            designCtx.scale(item.scale, item.scale);
                            designCtx.drawImage(img, 0, 0, item.width, item.height);
                            designCtx.restore();
                            resolve();
                        };
                        img.src = item.src;
                    }));
                // 加載圖片並返回 Promise
                const loadImage = src => new Promise(resolve => {
                    const img = new Image();
                    img.onload = () => resolve(img);
                    img.src = src;
                });

                // 當所有設計元素都繪製完成後，進行最終的混合
                Promise.all(drawPromises).then(() => {
                    Promise.all([
                        loadImage('/src/assets/pic/customized/Preview.png'), // 替換為實際的背景圖路徑
                        loadImage('/src/assets/pic/customized/Preview.png')  // 替換為實際的遮色片圖路徑
                    ]).then(([backgroundImage, clipImage]) => {
                        // 在 finalCanvas 上繪製背景
                        finalCtx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

                        // 繪製設計層
                        finalCtx.drawImage(designLayer, 0, 0);

                        // 創建遮色片層
                        const maskCanvas = createCanvas();
                        const maskCtx = maskCanvas.getContext('2d');
                        maskCtx.drawImage(clipImage, 0, 0, canvas.width, canvas.height);

                        // 應用遮色片到 finalCanvas
                        finalCtx.globalCompositeOperation = 'destination-in';
                        finalCtx.drawImage(maskCanvas, 0, 0);

                        // 將 finalCanvas 轉換為 Blob
                        finalCanvas.toBlob(blob => {
                            this.imageBlob = blob;
                            this.selectedImage = URL.createObjectURL(blob);
                        });
                    });
                });
            },


            selectItem(index, e) {
                e.preventDefault(); // 阻止默認行為
                if (this.isResizing) return;
                this.isMoving = true;
                this.selectedItemIndex = index;
                const item = this.designItems[index];
                this.initialMouseX = e.clientX;
                this.initialMouseY = e.clientY;
                this.initialItemLeft = item.left;
                this.initialItemTop = item.top;
                if(this.designItems[0]){
                    item.zIndex = 0
                } else {
                    item.zIndex = Math.max(...this.designItems.map(i => i.zIndex)) + 1;
                }
                document.addEventListener('mousemove', this.moveItem);
                document.addEventListener('mouseup', this.stopMoving);
            },
            moveItem(e) {
                e.preventDefault(); // 阻止默認行為
                if (!this.isMoving) return;
                const item = this.designItems[this.selectedItemIndex];
                const deltaX = e.clientX - this.initialMouseX;
                const deltaY = e.clientY - this.initialMouseY;
                item.left = this.initialItemLeft + deltaX;
                item.top = this.initialItemTop + deltaY;
            },
            stopMoving() {
                this.isMoving = false;
                document.removeEventListener('mousemove', this.moveItem);
                document.removeEventListener('mouseup', this.stopMoving);
                this.updatePreview();
                this.saveToHistory();
            },
            startResize(index, e) {
                e.stopPropagation();
                this.isResizing = true;
                this.selectedItemIndex = index;
                const item = this.designItems[index];
                this.initialScale = item.scale;
                this.initialMouseX = e.clientX;
                this.initialMouseY = e.clientY;
                document.addEventListener('mousemove', this.resize);
                document.addEventListener('mouseup', this.stopResize);
            },
            resize(e) {
                if (!this.isResizing) return;
                const item = this.designItems[this.selectedItemIndex];
                const deltaX = e.clientX - this.initialMouseX;
                const scaleFactor = 1 + deltaX / 200; // 調整縮放靈敏度
                item.scale = Math.max(0.1, Math.min(3, this.initialScale * scaleFactor));
            },
            stopResize() {
                this.isResizing = false;
                document.removeEventListener('mousemove', this.resize);
                document.removeEventListener('mouseup', this.stopResize);
                this.updatePreview();
                this.saveToHistory();
            },
            removeItem(index) {
                this.designItems.splice(index, 1);
                this.updatePreview();
                this.saveToHistory();
            },

            deselectAll(e) {
            // 確保點擊的是畫布而不是項目
                if (e.target === this.$refs.designCanvas) {
                    this.selectedItemIndex = null;
                }
            },
            removeAll(){
                this.designItems = [];
                this.updatePreview();
                this.saveToHistory();
            },
            removeItem(index) {
                // 雙擊移除圖案
                this.designItems.splice(index, 1);
                // 移除預覽圖案
                this.selectedImage = null; 
            },

            // 上一步
            undo() {
                if (this.operationHistory.length > 1) {
                    this.operationHistory.pop();
                    const previousState = this.operationHistory[this.operationHistory.length - 1];
                    this.designItems = JSON.parse(JSON.stringify(previousState));
                    this.updatePreview();
                }
            },

            // step3 ----
            // 上傳客製圖至pinia、加減數量
            ...mapActions(useCustomizedStore,['uploadImg','decrement','increment']),
            uploadFinalImg(){
                this.uploadImg(this.selectedImage)
                this.$router.push('/checkout_self-prod')
            },
            // 小圖變大圖
            showBigPic(src) {
                this.bigPic.img = src;
            },

        },
        mounted() {
            
            document.addEventListener('click', this.handleClickOutside);
            document.addEventListener('mousemove', this.resize);
            document.addEventListener('mouseup', this.stopResize);
            this.saveToHistory();
        },
        beforeUnmount() {
            document.removeEventListener('mousemove', this.resize);
            document.removeEventListener('mouseup', this.stopResize);
        }
    }
</script>