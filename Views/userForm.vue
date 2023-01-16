<template>
  <div class="user-form">
    <div>
      <input v-model="dataInput.text" type="text" @keyup.enter="handleKeyDown">
    </div>
    <div @click="handleSetActiveStudent(item)" class="user-item" :class="{ 'active': activeUser.id === item.id }" v-for="item in usersGetter" :key="item.id + item.name">
      {{ item.name }}
    </div>
  </div>
</template>
<script>
import { reactive, computed } from 'vue';
import { userStore } from '../Stores/user';

export default {
  setup() {
    const _userStore = userStore()
    const dataInput = reactive({ text: '' });

    const handleKeyDown = (event) => {
      dataInput.text = ref('');
      const id = _userStore.usersGetter.map(item => item.id);
      const newUser = { id: Math.max(...id) + 1, name: event.target.value, skills: [] }
      _userStore.addUser(newUser)
      _userStore.setActiveUser(newUser)
    }
    const handleSetActiveStudent = (value) => {
      _userStore.setActiveUser(value)
    }
    return {
      dataInput,
      handleKeyDown,
      usersGetter: computed(() => _userStore.usersGetter),
      activeUser: computed(() => _userStore.activeUser),
      handleSetActiveStudent
    }
  }
}
</script>
<style lang="css">
  .user-form {
    min-width: 300px;
    min-height: 500px;
    border: 1px solid black;
    padding: 8px;
  }
  .user-item {
    margin: 8px 0;
    font-size: 16px;
    cursor: pointer;
  }
  .active {
    text-decoration: underline;
    font-weight: bold;
  }
</style>