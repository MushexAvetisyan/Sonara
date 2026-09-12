import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import History from '../views/History.vue'
import Favorites from '../views/Favorites.vue'
import Playlists from '../views/Playlists.vue'

const router = createRouter({
    history: createWebHashHistory(),

    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },

        {
            path: '/favorites',
            name: 'favorites',
            component: Favorites
        },

        {
            path: '/playlists',
            name: 'playlists',
            component: Playlists
        },

        {
            path: '/history',
            name: 'history',
            component: History
        },

    ]
})

export default router