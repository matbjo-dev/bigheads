<template>
  <!-- notice dialogRef here -->
  <q-dialog
    ref="dialogRef"
    transition-show="slide-up"
    transition-hide="slide-down"
    :maximized="maximizedToggle2"
    @hide="onDialogHide">
    <q-card class="q-dialog-plugin bg-dark text-white">
      <!--
        ...content
        ... use q-card-section for it?
      -->
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
        <div class="text-h6">Options</div>
      </q-card-section>

      <q-card-section class="q-gutter-y-lg">
        <q-list dark bordered separator>
          <q-item v-ripple clickable @click="$emit('endWorkout')">
            <q-item-section>Finish workout</q-item-section>
          </q-item>
          <q-item v-ripple clickable @click="$emit('recoverWorkout')">
            <q-item-section>Recover workout</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {useDialogPluginComponent} from 'quasar'
import {ref} from 'vue'

export default {
  props: {
    // ...your custom props
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
    'endWorkout',
    'recoverWorkout',
  ],

  setup() {
    // REQUIRED; must be called inside of setup()
    const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} =
      useDialogPluginComponent()
    const maximizedToggle2 = ref(true)
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome

    return {
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,
      maximizedToggle2,

      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick() {
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK()
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,
    }
  },
}
</script>
