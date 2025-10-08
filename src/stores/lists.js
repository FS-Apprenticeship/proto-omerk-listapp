import { defineStore } from 'pinia'
import { supa } from '@/services/auth'
import { createList, deleteList, getAllLists } from '@/services/listData'

export const useListStore = defineStore('list', {
  state: () => ({
    currLists: [],
    newLists: [],
    synced: false
  }),

  getters: {
    getLocalLists: (state) => state.currLists,
    isSynced: (state) => state.synced
  },

  actions: {
    async getCurrentLists() {
      this.currLists = await getAllLists(supa)
      return this.currLists
    },

    async createRemoteList(list_name) {
      const { error } = await createList(supa, list_name)
      if (error) throw error
      await this.getCurrentLists()
    },

    async removeRemoteList(list_id) {
      const { error } = await deleteList(supa, list_id)
      if (error) throw error
      await this.getCurrentLists()
    },

    createLocalLists(user_id, list_name) {
      console.log('pre creating local list: ', this.currLists)
      this.newLists[this.newLists.length + 1] = { user_id: user_id, list_name: list_name }
      this.currLists[this.currLists.length + 1] = { user_id: user_id, list_name: list_name }
      console.log('post creatiing local list: ', this.currLists)
      return this.currLists
    },
  },
})
