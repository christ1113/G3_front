import { defineStore } from 'pinia'
import router from '../router'
//
export const useCustomizedStore = defineStore('customized', {
    state: () => ({
        customizedData: {
            img:'',
            price: 999,
            amount:1
        },
    }),
    getters: {
        total() {
            return this.customizedData.price * this.customizedData.amount;
        },
    },
    actions: {
        uploadImg(finalImg){
            this.customizedData.img = finalImg
        },
        // 數量++
        increment() {
            this.customizedData.amount++;
        },
        // 數量--
        decrement() {
            if (this.customizedData.amount > 1) {
                this.customizedData.amount--;
            }
        }
        
    }
})

