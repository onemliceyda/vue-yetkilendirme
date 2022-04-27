import Vue from "vue";
import Vuex from "vuex"
import axios from  "axios"
import { router } from "./router";

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        //state tokenı tutucaz.Kayıt işleminde bu tokenı göndererek kayıt yapıcaz.
        token: "",
        fbAPIKey:"AIzaSyCCSSkAyGAfeVELo4e6xXINVZ9jZPL3JTc",
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        clearToken(state) {
            state.token = ""
        }
    },
    actions: {
        initAuth({commit,dispatch}){
        let token=localStorage.getItem("token")
        if(token){
            commit("setToken",token)
            router.push("/")
        }
        else{
            router.push("/auth")
            return false
        }
        },
        login({commit,dispatch,state},authData) {
            let authLink="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
            if(authData.isUser){
                authLink="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
          }

          return axios.post(authLink+"AIzaSyCCSSkAyGAfeVELo4e6xXINVZ9jZPL3JTc",
          {
           email: authData.email,password:authData.password,returnSecureToken:true
          }).then(response=>{ 
              console.log(response.data)
              commit("setToken",response.data.idToken)})
          
         },
        logout({commit,dispatch,state}) {
            commit("clearToken")

            localStorage.removeItem("token")
         
         },
        
    },
    getters: {
        //çıkış yap butonu sadece giriş yaptığımızda ortaya çıkmalıdır.
        isAuthenticated(state){
            return state.token!==""
        }
    }
})
export default store;