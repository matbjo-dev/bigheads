<template>
 <q-btn-dropdown
          size="12px"
          flat
          dropdown-icon="more_vert"
          class="exerciseBtn"
          text-color="dark">
          <q-list>
            <q-item v-close-popup clickable @click="edit()">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  <q-icon name="settings"></q-icon>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <span v-if="editing">Close edit</span>
                <span v-else>Edit</span>
              </q-item-section>
            </q-item>

            <q-item v-close-popup clickable @click="deleteExercise()">
              <q-item-section avatar>
                <q-avatar icon="delete" color="accent" text-color="white" />
              </q-item-section>
              <q-item-section>Delete</q-item-section>
            </q-item>
          </q-list>
</q-btn-dropdown>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
const editing = ref(false)

const $emit = defineEmits(['edit','deleteExercise'])
const edit = () => $emit('edit')

const deleteExercise = () => $emit('deleteExercise')
</script>
<style lang="sass" scoped>

</style>