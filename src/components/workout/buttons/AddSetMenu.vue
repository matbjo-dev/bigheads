<template>
<div class="nav">
  <input type="checkbox" @click="checked">
    <span></span>
    <span></span>
    <div class="menu">
    <q-item v-ripple clickable> <q-icon name="fas fa-fire-alt" class=" m-warmup" size="35px" @click="toggleWarmUp()"><q-tooltip>Warm up</q-tooltip></q-icon></q-item>
    <q-item v-ripple clickable> <q-icon name="fas fa-fist-raised" class="m-super" size="35px" @click="toggleSuper"><q-tooltip>Super set</q-tooltip></q-icon></q-item>
    <q-item v-ripple clickable> <q-icon name="fas fa-dice-one" class="m-icon" size="35px" @click="addSet(1)"><q-tooltip>Single field</q-tooltip></q-icon></q-item>
    <q-item v-ripple clickable> <q-icon name="fas fa-dice-two" class="m-icon" size="35px" @click="addSet(2)"><q-tooltip>Double field</q-tooltip></q-icon></q-item>
    </div>
</div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue'

const emit = defineEmits(['addSet'])

const isChecked = ref(false)
const background = computed(()=>  isChecked.value ? '#e6e6e682' : 'none')
const warmUpIcon = computed(()=>  warmup.value ? '#eb7514' : '#9e9e9e')
const superIcon = computed(()=>  superIconVal.value ? '#44C0FE' : '#9e9e9e')
const warmup = ref(false)
const superIconVal = ref(false)
const checked = () => {
    isChecked.value = !isChecked.value
}
const toggleWarmUp = () => {
    warmup.value = !warmup.value
}
const toggleSuper = () => {
    superIconVal.value = !superIconVal.value
}
const addSet = (amount) => {
    emit('addSet',{ fieldAmount: amount, fieldType: getFieldType()})
}
const getFieldType = () => {
   if (warmup.value && superIconVal.value) return 3
  if (warmup.value) return 1
  if (superIconVal.value) return 2
  else return 0
}
</script>
<style lang="sass" scoped>
.m-icon
    color: #9E9E9E
.m-warmup
    color: v-bind(warmUpIcon)
.m-super
    color: v-bind(superIcon)
.nav, .menu
  display: flex
  justify-content: center
  align-items: center

.nav
  position: relative
 
  transition: 0.5s
  padding-left: 25px
  border-radius: 50px
  overflow: hidden
  background-color: v-bind(background)
  

  

.menu
  margin: 0
  padding: 0
  width: 0
  overflow: hidden
  transition: 0.5s

.nav input:checked ~ .menu
    width: 350px

.menu li
  list-style: none
  margin: 0 10px

  a
    text-decoration: none
    color: #9e9e9e
    text-transform: uppercase
    font-weight: 600
    transition: 0.5s

    &:hover
      color: #9e9e9e

.nav
  input
    width: 40px
    height: 40px
    cursor: pointer
    opacity: 0

  span
    position: absolute
    left: 20px
    width: 25px
    height: 4px
    top: 18px
    border-radius: 50px
    background-color: #9e9e9e
    pointer-events: none
    transition: 0.5s

  input:checked ~ span
    background-color: #9e9e9e
          
 

  span:nth-child(2)
    transform: rotate(90deg) translateX(7.5px)

  input:checked ~ span:nth-child(2)
    transform: translateY(5px) rotate(-45deg)

  span:nth-child(3)
    transform: translateY(8px)

  input:checked ~ span:nth-child(3)
    transform: translateY(5px) rotate(45deg) 
</style>