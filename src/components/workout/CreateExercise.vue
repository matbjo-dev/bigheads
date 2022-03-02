<template>
  <q-dialog
    v-model="show"
    persistent
    :maximized="maximizedToggle2"
    transition-show="slide-up"
    transition-hide="slide-down">
    <q-card class="bg-dark text-white">
      <q-bar>
        <q-space />

        <q-btn
          dense
          flat
          icon="minimize"
          :disable="!maximizedToggle2"
          @click="maximizedToggle2 = false">
          <q-tooltip v-if="maximizedToggle2" class="bg-white text-primary"
            >Minimize</q-tooltip
          >
        </q-btn>
        <q-btn
          dense
          flat
          icon="crop_square"
          :disable="maximizedToggle2"
          @click="maximizedToggle2 = true">
          <q-tooltip v-if="!maximizedToggle2" class="bg-white text-primary"
            >Maximize</q-tooltip
          >
        </q-btn>
        <q-btn v-close-popup dense flat icon="close">
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="">
        <div class="text-h6">Create exercise</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-lg">
        <q-input
          v-model="createExercise.title"
          outlined
          color="primary"
          label-color="white"
          class="text-white"
          label="Name">
        </q-input>
        <q-input
          v-model="createExercise.description"
          class="bg-white q-pl-md"
          label="Description">
        </q-input>
        <q-select
          v-model="createExercise.muscles"
          :options="muscleOpt"
          class="bg-white q-pl-md"
          label="Muscles">
        </q-select>
        <q-input
          v-model="createExercise.group"
          class="bg-white q-pl-md"
          label="Type">
        </q-input>
        <q-input
          v-model="createExercise.image"
          class="bg-white q-pl-md"
          label="Image">
        </q-input>
        <q-input
          v-model="createExercise.tags"
          class="bg-white q-pl-md"
          label="Tags">
        </q-input>

        <q-btn
          label="create"
          class="bg-white text-primary q-my-lg"
          @click="postExercise"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import {api} from 'src/services/axios.js'
export default {
  name: 'CreateExercise',
  components: {},
  props: {
    muscleObj: {},
    createTitle: {
      type: String, 
      default: 'Exercise',
    }
  },
  data() {
    return {
      maximizedToggle2: true,
      show: false,
      muscleresp: {},
      muscleOpt: [],
      createExercise: {
        title: '',
        description: '',
        muscles: [],
        type: [],
        image: '',
        tags: '',
      },
    }
  },
  methods: {
    showf: function () {
      this.getMuscles()
      this.show = true
    },
    setTitle: function (title) {
      this.createExercise.title = title
    },
    getMuscles: function () {
      return new Promise((resolve, reject) => {
        api
          .get('workout/muscles/')
          .then((resp) => {
            if (this.muscleresp != resp.data) {
              this.muscleresp = resp.data

              this.appendToOptionsMuscle(resp.data)
            }
            resolve(resp)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    postExercise: function () {
      return new Promise((resolve, reject) => {
        api
          .post('workout/exercise/', this.createExercise)
          .then((resp) => {
            this.notifySuccess('Success', 'Created')
            this.getExercises()
            this.show = false

            resolve(resp)
          })
          .catch((err) => {
            this.notifySuccess('Failure', 'Not created')
            reject(err)
          })
      })
    },
    appendToOptionsMuscle: function (inputVar) {
      for (let x of inputVar) {
        this.muscleOpt.push({
          value: x.id,
          label: x.title,
        })
      }
      this.muscleOpt = [...new Set(this.muscleOpt)]
    },
    notifySuccess: function (titel, caption) {
      this.$q.notify({
        icon: 'check',
        caption: titel,
        message: caption,
        color: 'secondary',
      })
    },
    getExercises: function () {
      this.$emit('getExercises')
    },
    notifyFailue: function (titel, caption) {
      this.$q.notify({
        icon: 'error',
        caption: titel,
        message: caption,
        color: 'negative',
      })
    },
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (max-width: $breakpoint-md-max) {
}
@media (max-width: $breakpoint-sm-max) {
}
</style>
