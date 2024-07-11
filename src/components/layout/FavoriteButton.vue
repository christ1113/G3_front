<template>
    <button type="button" @click.prevent="toggleFav()">
        <i :class="['fa-heart', isFavorite ? 'fa-solid' : 'fa-regular']"></i>
        {{ isFavorite ? '取消收藏' : '加入收藏' }}
    </button>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useFavStore } from '@/stores/fav'

export default {
    name: 'FavoriteButton',
    props: {
        item: {
            type: [Object, String, Number],
            required: true
        }
    },
    computed: {
        ...mapState(useFavStore, ['favorites']),
        isFavorite() {
            const itemId = typeof this.item === 'object' ? this.item.prod_id : this.item;
            return this.favorites.some(fav => fav.prod_id === itemId);
        }
    },
    methods: {
        ...mapActions(useFavStore, ['toggleFavorite']),
        toggleFav() {
            this.toggleFavorite(this.item);
            console.log(this.item)
        }
    }
}
</script>

<style scoped>
button {
    background-color: #fff;
    border: #B1241A 1px solid;
    border-radius: 20px;
    width: 100%;
    padding: 5px;
    font-family: noto serif hk;
    font-size: 20px;
    color: #B1241A;
    transition: 0.1s;
    cursor: pointer;
}

button:hover {
    background-color: #B1241A;
    color: #fff;
}

button:hover .fa-heart {
    color: #fff;
}

.fa-heart {
    font-size: 24px;
    color: #B1241A;
    vertical-align: middle;
}
</style>