// stores/activity.js
import { defineStore } from 'pinia';

export const useActivityStore = defineStore({
  id: 'activitycheckout',
  state: () => ({
    count: 0,
    selectedTime: '',
    totalAmount: 0,
    location: '',
    imageUrl: '',
  }),
  actions: {
    setActivityDetails(count, selectedTime, totalAmount, location, imageUrl) {
      this.count = count;
      this.selectedTime = selectedTime;
      this.totalAmount = totalAmount;
      this.location = location;
      this.imageUrl = imageUrl;
    },
    setSelectedTime(time) {
      this.selectedTime = time;
    },
  },
});