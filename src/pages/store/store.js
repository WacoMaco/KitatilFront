import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const store = new Vuex.Store({
    state:{
        token: null,
        userType: null,

    },
    mutations:{
        SetToken(state,userData){
            state.token = userdata.token
        },
        SetUserType(state,userData){
            state.userType = userdata.userType
        },
    },
    actions:{

    }
    })