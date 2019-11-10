import Vue    from 'vue'
import Router from 'vue-router'

import LaptopView from "@/components/LaptopView.vue";
import LaptopEdit from "@/components/Laptop/LaptopEdit.vue";
import Home    from '@/components/LaptopsList'
import Login from "@/components/Login";
import AdminTools from '@/components/Admin/AdminTools.vue'
import ApiBackup from '@/components/Admin/ApiBackup.vue'
import SpecificationScore from '@/components/Specifications/SpecificationEdit.vue'
import CreateLaptop from '@/components/Laptop/CreateLaptop.vue'
import Register from '@/components/Register/Register.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {path: '/home', name:'Home', component: Home},
        {path: '/register', name:'Register', component: Register},
        { path: '/LaptopView/:laptopId',name:'LaptopView', component: LaptopView },
        { path: '/LaptopEdit/:laptopId',name:'LaptopEdit', component: LaptopEdit },
        { path: '/login.html', name:'Login', component: Login },
        { path: '/redirect', redirect:{name: 'Login'}},
        { path: '/', redirect:{name: 'Home'}},
        { path: '/admintools',  component:AdminTools,
          children:[
              {
                  path:'apibackup',
                  component:ApiBackup,
                  name:'AdminTools.api',
              },
              {
                path:'specifications',
                component:SpecificationScore,
                name:'AdminTools.scores',
            }, {
                path: 'CreateLaptop',
                component:CreateLaptop,
                name: 'AdminTools.create',
            }
          ]},
    ],
    linkActiveClass: "active",
    mode: "history"
})