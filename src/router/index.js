import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import message from '@/components/message/message.vue'
import relation from '@/components/relation/relation.vue'
import myself from '@/components/myself/myself.vue'
import VueTouch from 'vue-touch'

Vue.use(Router)
Vue.use(axios)
Vue.use(VueTouch, {name: 'v-touch'})

export default new Router({
	linkActiveClass: 'router-active',
  routes: [
    {
      path: '/',
      redirect: {name: 'message'}
    },
    {
    	path: '/message',
    	name: 'message',
    	component: message
    },
    {
    	path: '/relation',
    	component: relation
    },
    {
    	path: '/myself',
    	component: myself
    }
  ]
})
