import Vue    from 'vue'
import Router from 'vue-router'

import HelloWorld    from '@/components/HelloWorld'
import LaptopView from "@/components/LaptopView.vue";
import LaptopEdit from "@/components/Laptop/LaptopEdit.vue";
import Home    from '@/components/LaptopsList'
import Login from "../login/App";
import TermsAndConditions from "../terms_and_conditions/App";
import AdminTools from '@/components/Admin/AdminTools.vue'
import ApiBackup from '@/components/Admin/ApiBackup.vue'
import SpecificationScore from '@/components/Specifications/SpecificationEdit.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {path: '/helloworld', name:'HelloWorld', component: HelloWorld},
        {path: '/terms_and_conditions', name:'TermsAndConditions', component: TermsAndConditions},
        {path: '/home', name:'Home', component: Home},
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
            }
          ]},
    ],
    linkActiveClass: "active",
    mode: "history"
})