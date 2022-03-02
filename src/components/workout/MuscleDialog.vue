<template>
  <q-dialog
    v-model="show"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down">
    <q-card class="bg-dark text-white">
      <q-bar>
        <q-space />

        <q-btn
          dense
          flat
          icon="minimize"
          :disable="!maximizedToggle"
          @click="maximizedToggle = false">
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
            >Minimize</q-tooltip
          >
        </q-btn>
        <q-btn
          dense
          flat
          icon="crop_square"
          :disable="maximizedToggle"
          @click="maximizedToggle = true">
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
            >Maximize</q-tooltip
          >
        </q-btn>
        <q-btn v-close-popup dense flat icon="close">
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="">
        <div class="text-h6">Muscles</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div v-if="muscleObj" class="q-gutter-y-md">
          <div v-for="(m, index) in muscleObj" :key="'muscle' + index">
            {{ m.title }}
            {{ m.description }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: 'MuscleDialog',
  components: {},
  props: {
    muscleObj: {
      type: Object,
      default: () => {return {}}
    },
  },
  data() {
    return {
      maximizedToggle: true,
      show: false,
    }
  },
  methods: {
    showf: function () {
      this.show = true
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
