<template>
<q-btn-dropdown
          size="12px"
          flat
          dropdown-icon="more_vert"
          class="exerciseBtn"
          text-color="dark">
          <q-list>
            <q-item v-close-popup clickable @click="emit('edit')">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  <q-icon name="settings"></q-icon>
                </q-avatar>
              </q-item-section>
              <q-item-section>
               
                <span>Edit sets</span>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
</template>

<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['edit'])
</script>
<style lang="sass" scoped>

</style>