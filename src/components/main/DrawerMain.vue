<template>
  <q-scroll-area class="fit bg-dark">
    <q-list padding>
      <q-item v-if="isLoggedIn" v-ripple :to="{name: 'user'}" clickable>
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>

        <q-item-section style="text-transform: capitalize">
          {{ fullname || 'User' }}
        </q-item-section>
      </q-item>
      <q-item v-if="!isLoggedIn" v-ripple clickable :to="{name: 'login'}">
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>

        <q-item-section>
          <span v-if="isLoggedIn" class="" @click="logout"> Log out </span>
          <span v-else>
            <router-link class="routerlink" :to="{name: 'login'}"
              >Login
            </router-link></span
          >
        </q-item-section>
      </q-item>
      <q-item v-if="!isLoggedIn" v-ripple clickable :to="{name: 'signup'}">
        <q-item-section avatar>
          <q-icon name="add" />
        </q-item-section>

        <q-item-section>
          <span> Sign up </span>
        </q-item-section>
      </q-item>
      <q-item v-if="isLoggedIn" v-ripple clickable @click="logout">
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>

        <q-item-section>
          <span class=""> Logg ut </span>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-expansion-item
        expand-separator
        icon="fas fa-dumbbell"
        label="Workout"
      >
      <q-list>
        <q-item v-ripple clickable :to="{name: 'workout'}">
          New
        </q-item>
          <q-item v-ripple clickable :to="{name: 'sessions'}">
          Sessions
        </q-item>
        <q-item v-ripple clickable :to="{name: 'exercise_list'}">
          Exercises
        </q-item>
      </q-list>
      </q-expansion-item>


    </q-list>
  </q-scroll-area>
</template>
<script>
import {ref, computed} from 'vue'
import { authStore } from 'src/pinia/auth.js'
import {useRouter, useRoute} from 'vue-router'
export default {
  name: 'DrawerMain',
  setup() {
    const $store = authStore()
    const $router = useRouter()
    const isLoggedIn = computed(() => {
      return $store.isLoggedIn ?? 'User'
    })
    const fullname = computed(() => {
      return $store.full_name
    })
    function logout() {
      $store.logout()
      $router.push({name: 'login'})
    }
    return {
      isLoggedIn,
      fullname,
      logout,
    }
  },
}
</script>
<style lang="sass" scoped>
$drawerIconColor: white
$drawerIconHoverColor: $primary
a
  text-decoration: none !important
  color: $drawerIconColor
  &:hover
    color: $drawerIconHoverColor
    text-decoration: none
</style>
