<template>
    <q-card class="mx-auto m-card" flat bordered>
        <q-card-section class="row">
            <div v-if="!editing" class="text-h4 col text-weight-bold text-uppercase text-dark q-py-xs">{{ exercise.title }}</div>
            <heading-input v-if="editing" v-model="exercise.title" style="" class="col header-edit-outer " input-class="header-edit text-h4 q-py-xs text-uppercase text-weight-bold text-dark "  @blur.prevent="changeTitle" ></heading-input>
            <div class="col-auto">
                <edit-btn @edit="edit"></edit-btn>
            </div>
        </q-card-section>
        <q-separator />
        <span v-if="!editing">
           <q-card-section >
               <p class=" text-weight-normal m-paragraph">
               {{ exercise.description }}
               </p>
           </q-card-section>
            <q-card-section>
                <div class="m-header-paragraph"> Muscles </div>
                <p class=" text-weight-normal">
                {{ exercise.muscles?.[0].title }}
                </p>
                <div class="m-header-paragraph"> Type </div>
                <p class=" text-weight-normal">
                {{ exercise.group?.[0].title }}
                </p>
           </q-card-section>
           <q-card-section>
                <div class="m-header-paragraph"> Default fields </div>
                 <p class=" text-weight-normal">
               {{ exercise.defaultfields?.title ? exercise.defaultfields?.title : 'Not specified' }}
                </p>
           </q-card-section>
            </span>
        <exercise-edit v-if="editing" ref="editingComp" class=""></exercise-edit>


    </q-card>
</template>

<script setup>
import { ref, reactive, onMounted, toRaw } from 'vue'
import { exerciseStore } from 'src/pinia/exercise'
import { useRoute } from 'vue-router'
import editBtn from './buttons/ExerciseEditBtn'
import ExerciseEdit from './ExerciseEdit'
import HeadingInput from 'components/fields/HeadingInput'
const $store = exerciseStore()
const exerciseById = $store.exerciseById
const $route = useRoute()

const exercise = reactive({})
const editing = ref(true)
const editingComp = ref(null)
onMounted(async () => await getExerciseById($route.params.id))
const getExerciseById = async (id) => {
    await $store.getExercises()
    const exercise_resp = exerciseById(id)
    Object.assign(exercise, exercise_resp)
}

const edit = () => {
    editing.value = !editing.value
}

const changeTitle = () => {
  $store.changeExercise($route.params.id,"title", exercise.title)
}
</script>

<style lang="sass" scoped>
.m-card
    width: 50%
    margin-bottom: 400px

@media (max-width: $breakpoint-md-max)
    .m-card
        width: 100%

</style>
<style lang="sass">

    .header-edit-outer
        padding: 0 !important
        margin: 0 !important

</style>
