// stores/activity.js
import { defineStore } from 'pinia';

export const useActivityStore = defineStore('activitycheckout', {
  state: () => ({
    participantCount: 0,
    selectedTime: '',
    totalAmount: 0,
    location: '',
    image: '',
  }),
  actions: {
    setActivityDetails(count, time, total, location, image) {
      this.participantCount = count;
      this.selectedTime = time;
      this.totalAmount = total;
      this.location = location;
      this.image = image;
    },
    setSelectedTime(time) {
      this.selectedTime = time;
    },
  },
});