import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSongStore = defineStore({
  id: 'song',
  state: () => ({
    songKeyworks: '',
    songCount: '',
    songInfo: [{ name: '', artist: '', url: '', cover: '', lrc: '' }]
  }),
  getters: {},
  actions: {
    setSongKeyworks(keyworks: string) {
      this.songKeyworks = keyworks
    },
    setSongCount(count: string) {
      this.songCount = count
    },
    setSongInfo(songData: {
      amount1: any
      amount2: any
      amount3: any
      amount4: any
      amount5: any
    }) {
      this.songInfo.push({
        name: songData.amount1,
        artist: songData.amount2,
        url: songData.amount3,
        cover: songData.amount4,
        lrc: songData.amount5
      })
    }
  },
  persist: {
    storage: window.sessionStorage
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSongStore, import.meta.hot))
}
