<template>
  <div class="user-skill">
    <div class="header">
      <span class="skill"> Skill:</span>
      <select @change="handleChangeSkill" :value="dataSkill.selectedSkill.value ?? null" name="" id="">
        <option value="1">react</option>
        <option value="2">nodejs</option>
        <option value="3">vuejs</option>
      </select>

      <span class="level">Level:</span>
      <select @change="handleChangeLevel" :value="dataSkill.selectedLevel.id ?? null" name="Level" id="Level">
        <option value="0">0%</option>
        <option value="50">50%</option>
        <option value="80">80%</option>
        <option value="100">100%</option>
      </select>
      <button @click="handleAddSkill"> {{ dataSkill.selectedId ? 'Update' : 'Add Skill' }}</button>
      <button @click="clearSelectSkill">clear</button>
    </div>
    <div class="skill-level-box" v-for="(item, index) in activeUser.skills" :key="item.id + '-' + index">
      <span @click="selectSkill(item)">{{ item.name }}</span>
      <span @click="selectSkill(item)" class="skill-level">{{ item.level.name }}</span>
      <span><button @click="removeSkill(item)">X</button></span>
    </div>

  </div>
</template>
<script>
import { userStore } from '../Stores/user';
import { reactive } from 'vue'
export default {
  setup() {
    const _userStore = userStore();
    const dataSkill = reactive({ selectedSkill: {}, selectedLevel: {}, selectedId: null  })
    const skills = [
      { id: 1, value: 1, name: 'react' },
      { id: 2, value: 2,  name: 'nodejs' },
      { id: 3, value: 3, name: 'vuejs' }
    ]

    const levels = [
      { id: 0, name: '0%' },
      { id: 50, name: '50%' },
      { id: 80, name: '80%' },
      { id: 100, name: '100%' },
    ];

    const handleChangeSkill = (event) => {
      dataSkill.selectedSkill = skills.find(item => item.id === parseInt(event.target.value));
    }
    const handleChangeLevel = (event) => {
      dataSkill.selectedLevel = levels.find(item => item.id === parseInt(event.target.value));
    }

    const handleAddSkill = () => {
      const { skills } = _userStore.activeUser
      let id = 0;
      let updateUser = {..._userStore.activeUser};

      if (skills.length) {
        id = Math.max(...skills.map(el => el.id))
      }
      if (dataSkill.selectedId) {
        const updateSkill = skills.map(item => {
          if (item.id === dataSkill.selectedId) {
            return { ...dataSkill.selectedSkill, level: dataSkill.selectedLevel, id: item.id }
          }
          return item
        })

        updateUser = {...updateUser, skills: updateSkill}
      } else {
        updateUser = {
          ...updateUser,
          skills: [..._userStore.activeUser.skills, { ...dataSkill.selectedSkill, id: id + 1, level: dataSkill.selectedLevel }]
        };
      }
      _userStore.updateUser(updateUser)
      _userStore.setActiveUser(updateUser)
      if (!dataSkill.selectedId) {
        dataSkill.selectedSkill = {}
        dataSkill.selectedLevel = {}
      }
    }

    const removeSkill = (dataItem) => {
      const updateUser = {
        ..._userStore.activeUser,
        skills: [..._userStore.activeUser.skills].filter(item => item.id !== dataItem.id)
      };

      _userStore.updateUser(updateUser)
      _userStore.setActiveUser(updateUser)
    }

    const selectSkill = (dataItem) => {
      dataSkill.selectedId = dataItem.id;
      dataSkill.selectedSkill = dataItem
      dataSkill.selectedLevel = dataItem.level
    }
    const clearSelectSkill = () => {
      dataSkill.selectedId = null;
      dataSkill.selectedSkill = {}
      dataSkill.selectedLevel = {}
    }
    return {
      usersGetter: computed(() => _userStore.usersGetter),
      activeUser: computed(() => _userStore.activeUser),
      skills,
      handleChangeSkill,
      handleChangeLevel,
      handleAddSkill,
      selectSkill,
      dataSkill,
      removeSkill,
      clearSelectSkill
    }
  },
}
</script>
<style lang="css">
  .user-skill {
    min-width: 700px;
    min-height: 500px;
    border: 1px solid black;
    padding: 8px;
  }
  .header {
    display: flex;
    flex-direction: row;
    padding: 16px;
    border: 1px solid black;
  }
  .header select {
    margin-left: 40px;
  }
  .header .level,
  .header button {
    margin-left: 40px;
  }
  .skill-level-box {
    margin: 8px 0;
  }
  .skill-level-box button,
  .skill-level-box .skill-level {
    margin-left: 20px;
    cursor: pointer;
  }
</style>