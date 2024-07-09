import { defineStore } from 'pinia'

export const useFavStore = defineStore('fav', {
  state: () => ({
    favorites: []
  }),
  getters: {
    getFavorites: (state) => state.favorites,
    isFavorite: (state) => (item) => state.favorites.some(fav => fav.prod_id === item.prod_id)
  },
  actions: {
    addToFavorites(item) {
      if (!this.isFavorite(item)) {
        this.favorites.push(item)
        this.saveFavorites()
      }
    },
    removeFromFavorites(item) {
      const index = this.favorites.findIndex(fav => fav.prod_id === item.prod_id)
      if (index !== -1) {
        this.favorites.splice(index, 1)
        this.saveFavorites()
      }
    },
    toggleFavorite(item) {
      if (this.isFavorite(item)) {
        this.removeFromFavorites(item)
      } else {
        this.addToFavorites(item)
      }
    },
    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    loadFavorites() {
      const savedFavorites = localStorage.getItem('favorites')
      if (savedFavorites) {
        this.favorites = JSON.parse(savedFavorites)
      }
    }
  }
})