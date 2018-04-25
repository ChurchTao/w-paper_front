import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Books from '@/pages/books'
import Repos from '@/pages/repos'
import My from '@/pages/my'
import Write from '@/pages/write'
import Read from '@/pages/read'
import MyEdit from '@/pages/myedit'
import tagManagement from '@/pages/tagManagement'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      alias: '/welcome',
      children:[
        {
          path:'/welcome/:type',
          component:Home
        }
      ]
    },
    {
      path: '/write',
      name: 'Write',
      component: Write
    },
    {
      path: '/read/:id',
      name: 'Read',
      component: Read
    },
    {
      path: '/books',
      name: 'Books',
      component: Books
    },
    {
      path: '/repos',
      name: 'Repos',
      component: Repos
    },
    {
      path: '/my/:city',
      name: 'My',
      component: My
    },
    {
      path: '/myedit',
      name: 'MyEdit',
      component:MyEdit
    },
    {
      path: '/tagManagement',
      name: 'tagManagement',
      component: tagManagement
    }
  ]
})

