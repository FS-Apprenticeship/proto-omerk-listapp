import { defineStore } from "pinia";
import router from "@/router";
import { supa } from "@/services/auth";

export const useAuthStore = defineStore('user', {
    state: () => ({
        client: supa,
        user: null,
        loggedIn: false
    }),

    getters: {
      getClient: (state) => state.client,
      getUser: (state) => state.user,
      isLoggedIn: (state) => state.loggedIn
    },

    actions: {
        async login(supa, email, password) {
          const { data, error } = await supa.auth.signInWithPassword({
            email, password,
          })
          if (error) throw error
          this.user = data.user
          this.loggedIn = true
          router.push('/lists')
        },

        async logout(supa) {
          const { error } = await supa.auth.signOut()
          if (error) throw error
          console.log("pinia logout")
          this.user = null
          this.loggedIn = false
          router.push('/')
        }
    }
});
