import { defineStore } from 'pinia'

export const userStore = defineStore({
  id: 'user-store',
  state: () => {
    return {
      users: [
        { id: 0, name: 'tom', skills: [{ id: 1, value: 1, name: 'react', level: { id: 0, name: '0%' } }] },
        { id: 1, name: 'lukas', skills: [{ id: 1,value: 2, name: 'node', level: { id: 50, name: '50%' } }] },
        { id: 2, name: 'densis', skills: [{ id: 1, value: 3, name: 'vue', level: { id: 80, name: '80%' } }] }
      ],
      activeUser: { id: 0, name: 'tom', skills: [{ id: 1, value: 1, name: 'react', level: { id: 0, name: '0%' } }] }
    }
  },
  actions: {
    setActiveUser(payload) {
      console.log('payload:', payload)
      this.activeUser = payload
    },
    addUser(newUser) {
      this.users.push(newUser)
    },
    updateUser(payload) {
      console.log('payload:', payload)
      this.users = this.users.map(item => {
        if (item.id === payload.id) return payload;
        return item
      })
    },
    removeUser(id) {
      this.users = this.users.filter(item => item.id !== id)
    }
  },
  getters: {
    activeUserGetter: state => state.activeUser,
    usersGetter: state => state.users
  },
})