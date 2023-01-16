<template>
  <div class="main">
    <userForm/>
    <userSkill/>
  </div>
</template>
<script>
import { ref } from 'vue';
import userForm from './userForm.vue';
import userSkill from './userSkill.vue'
export default {
  components: {
    userForm,
    userSkill
  },
  setup() {
    const count = ref(0)

    return {
      count,
      
    }
  }
}
</script>
<style lang="css">
  .main {
    display: flex;
    flex-direction: row;
  }
</style>