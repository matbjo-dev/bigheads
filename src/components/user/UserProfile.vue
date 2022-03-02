<template>
  <q-card class="m-main-card">
    <q-card-section>
      <div class="text-h5">Edit Account</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <Form
        :validation-schema="schema"
        class="q-gutter-y-md q-mt-md"
        autocomplete="on"
        @submit="changeUser">
        <q-input-val
          v-model="fullname"
          name="name"
          label="Name"
          standout="bg-primary text-white"
          hint-val="Name"
          pre-icon="person">
        </q-input-val>
        <q-input-val
          v-model="username"
          name="username"
          label="Username"
          autofocus
          standout="bg-primary text-white"
          hint-val="Username"
          pre-icon="chat">
        </q-input-val>
        <q-input-val
          v-model="email"
          name="email"
          label="Email"
          standout="bg-primary text-white"
          hint-val="Email cannot be changed."
          pre-icon="chat"
          disable>
        </q-input-val>
        <q-input-val
          v-model="password"
          name="password"
          label="Current password"
          standout="bg-primary text-white"
          hint-val="Current password"
          pre-icon="password"
          type="password">
        </q-input-val>
        <q-input-val
          v-model="newPassword"
          name="newPassword"
          label="New password"
          standout="bg-primary text-white"
          pre-icon="password"
          type="password">
        </q-input-val>
        <q-separator />
        <q-btn
          color="primary"
          icon="published_with_changes"
          type="submit"
          class="buttongreen"
          label="Edit"
          @click="changeUser" />
        <q-btn
          color="secondary"
          icon="cancel"
          label="Cancel"
          class="q-ml-sm buttonorange"
          @click="dontedit()" />
      </Form>
    </q-card-section>
  </q-card>
</template>
<script>
import {defineComponent, ref, onMounted} from 'vue'
import { userStore, authStore } from 'src/pinia/auth.js'
import useNotify from 'src/composables/notify'
import {useRouter, useRoute} from 'vue-router'
import {Field, Form} from 'vee-validate'
import * as yup from 'yup'
import {getCurrentUserInfo} from 'src/services/requests.js'
import QInputVal from 'components/fields/QInputVal'
import QPassword from 'components/fields/QPassword'

export default defineComponent({
  name: 'UserProfile',
  components: {
    //  Field,
    Form,
    QInputVal,
    // QPassword,
  },
  setup() {
    const $userStore = userStore()
    const $authStore = authStore()
    const $router = useRouter()
    const email = ref('')
    const fullname = ref('')
    const username = ref('')
    const password = ref('')
    const newPassword = ref('')
    const originalName = ref('')
    const originalUsername = ref('')
    const passwordStrength = ref('0.5')

    yup.addMethod(yup.string, 'uniqueUsername', function (errorMessage) {
      return this.test(`Unique Username`, errorMessage, function (value) {
        const {path, createError} = this

        return (
          uniqueUsername(value) || createError({path, message: errorMessage})
        )
      })
    })

    const schema = yup.object({
      name: yup.string().min(2).max(100).label('Full name'),
      password: yup.string().min(7).max(100).label('Password'),
      username: yup.string().min(3).max(100).uniqueUsername().label('Username'),
      newPassword: yup.string().min(7).max(100).label('New password'),
    })

    const currentUserInfo = async () => {
      try {
        getCurrentUserInfo().then((response) => {
          originalName.value = response.data.full_name
          fullname.value = originalName.value
          originalUsername.value = response.data.nickname
          username.value = originalUsername.value
          email.value = response.data.email
        })
      } catch {
        useNotify('error', 'Could not retrive user information', 'Try again.')
      }
    }

    function uniqueUsername(value) {
      if ($userStore.usernameExists(value)) return true
      else return false
    }

    function changeUser() {
      if (password.value) changePassword()
      if (originalName.value != fullname.value) changeName()
      if (originalUsername.value != username.value) changeUsername()
    }
    function changePassword() {
      $authStore
        .changePassword( {
          originalpassword: password.value,
          password: newPassword.value,
        })
        .then((response) => {
          if (response.status == 200)
            return useNotify('success', 'Password changed.')
          else
            return useNotify('error', 'Could not change password', 'Try again.')
        })
        .catch((error) =>
          useNotify('error', 'Could not change password', 'Try again.'),
        )
    }
    function changeName() {
      $userStore
        .updateName(fullname.value)
        .then((response) => {
          if (response.status == 200)
            return useNotify('success', 'Name changed')
          else return useNotify('error', 'Could not change name', 'Try again.')
        })
        .catch((error) =>
          useNotify('error', 'Could not change name', 'Try again.'),
        )
    }
    function changeUsername() {
      $userStore
        .updateUsername(username.value)
        .then((response) => {
          if (response.status == 200)
            return useNotify('success', 'Username changed')
          else
            return useNotify('error', 'Could not change username', 'Try again.')
        })
        .catch((error) =>
          useNotify('error', 'Could not change username', 'Try again.'),
        )
    }

    onMounted(() => {
      currentUserInfo()
    })

    return {
      fullname,
      schema,
      email,
      newPassword,
      password,
      username,
      changeUser,
      passwordStrength,
    }
  },
})
</script>
<style lang="sass" scoped>
.m-main-card
  width: 50%
  max-height: 650px
  margin-top: 15px
  body.screen--md, body.screen--sm &
    width: 80%
  body.screen--xs &
    width: 100%
    box-shadow: 0 0 0 0

</style>
