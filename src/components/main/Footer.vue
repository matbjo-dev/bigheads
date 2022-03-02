<template>
    <!-- Footer -->
    <q-footer bordered class="text-footer q-px-lg bg-dark" style="height: 300px">
      <q-toolbar>
        <q-toolbar-title class="footer-header">
          <router-link to="/" class="linknostyle mx-auto">
            {{ props.title }}
          </router-link>
        </q-toolbar-title>
      </q-toolbar>
      <div class="row items-start q-pa-xl footer-content justify-between"></div>
      <div class="contact">
        <a :href="props.contactEmail" class="linknostyle">{{ props.contactEmailText }} </a>
      </div>
    </q-footer>


</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    contactEmail: String, 
    contactEmailText: String,
    title: String,
})

</script>
<style lang="sass" scoped>
.footer-header
    width: 150px
    text-align: center 
a
  text-decoration: none !important
  color: $drawerIconColor
  &:hover
    color: $drawerIconHoverColor
    text-decoration: none

.contact
  font-size: 1rem 
  margin-top: 120px 
  width: 100% 
  height: 30px 
  margin-left: auto 
  margin-right: auto 
  text-align: center 
  
</style>