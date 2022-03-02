<template>
  <q-card class="q-mx-auto q-mt-md m-signup-card">
    <q-card-section>
      <div class="text-h5">Create Account</div>
    </q-card-section>
    <q-card-section>
      <q-separator />
      <Form
        :validation-schema="schema"
        class="q-gutter-y-md q-mt-md"
        autocomplete="on"
        @submit="register()">
        <Field
          v-slot="{errorMessage, value, field}"
          v-model="email"
          name="email">
          <q-input
            ref="emailfield"
            required
            standout="bg-primary white-text"
            :model-value="value"
            label="E-mail"
            autocomplete="email"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage">
            <template #prepend>
              <q-icon name="email" />
            </template>
            <template #hint> E-mail address </template>
          </q-input>
        </Field>

        <Field
          v-slot="{errorMessage, value, field}"
          v-model="fullname"
          name="fullname">
          <q-input
            ref="fullnamefield"
            required
            standout="bg-primary white-text"
            :model-value="value"
            label="Full name"
            autocomplete="full name"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage">
            <template #prepend>
              <q-icon name="person" />
            </template>
            <template #hint> Full name </template>
          </q-input>
        </Field>

        <Field
          v-slot="{errorMessage, value, field}"
          v-model="password"
          name="password">
          <q-input
            ref="passwordfield"
            required
            type="password"
            class="logginn"
            standout="bg-primary"
            :model-value="value"
            label="Password"
            autocomplete="current-password"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage">
            <template #prepend>
              <q-icon name="password" />
            </template>
            <template #hint> Passord </template>
          </q-input>
        </Field>

        <Field
          v-slot="{errorMessage, value, field}"
          v-model="repeatPassword"
          name="confirmPassword">
          <q-input
            ref="passwordfield"
            required
            type="password"
            class="logginn"
            standout="bg-primary"
            :model-value="value"
            label="Confirm Password"
            autocomplete="current-password"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage">
            <template #prepend>
              <q-icon name="password" />
            </template>
            <template #hint> Confirm password </template>
          </q-input>
        </Field>
        <div class="q-my-md m-gray-text">
          Already have an account:
          <router-link to="{name: 'login' }" class="clean-link"
            ><i>login</i></router-link
          >
        </div>
        <q-separator />
        <q-btn label="Sign Up" color="primary" type="submit"></q-btn>
      </Form>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent, ref} from 'vue'
import { authStore } from 'src/pinia/auth.js'
import useNotify from 'src/composables/notify'
import {useRouter, useRoute} from 'vue-router'
import {Field, Form} from 'vee-validate'
import * as yup from 'yup'
import {api} from 'src/services/axios.js'

export default defineComponent({
  name: 'Login',
  components: {
    Field,
    Form,
  },
  setup() {
    const $store = authStore()
    const $router = useRouter()
    const email = ref('')
    const fullname = ref('')
    const password = ref('')
    const repeatPassword = ref('')

    yup.addMethod(yup.string, 'emailExist', function (errorMessage) {
      return this.test(`emailexists`, errorMessage, function (value) {
        const {path, createError} = this

        return checkEmail(value) || createError({path, message: errorMessage})
      })
    })

    const schema = yup.object({
      email: yup
        .string()
        .required()
        .email()
        .min(3)
        .max(100)
        .emailExist()
        .label('Email address'),
      fullname: yup.string().required().min(2).max(100).label('Full name'),
      password: yup.string().required().min(7).max(100).label('Password'),
      confirmPassword: yup
        .string()
        .required()
        .min(7)
        .max(100)
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .label('Confirm password'),
    })

    async function checkEmail(val) {
      try {
        const response = api.post('/check/email', {
          email: val,
        })
        if (response.data.message == 'False') return true
        else return false
      } catch {
        return true
      }
    }

    function done() {
      return $router.push({name: 'index'})
    }
    function register() {
      $store
        .register({
          full_name: fullname.value,
          email: email.value,
          password: password.value,
        })
        .then(() => {
          useNotify('success', 'Success', 'Account created.')
          done()
        })
        .catch(() => useNotify('error', 'Sign up failed', 'Try again.'))
    }

    return {
      email,
      fullname,
      password,
      repeatPassword,
      schema,
      // func
      register,
      done,
    }
  },
})
</script>
<style lang="sass" scoped>
.m-signup-card
  width: 50%
  body.screen--md, body.screen--sm &
    width: 80%
  body.screen--xs &
    width: 95%

@media (max-width: $breakpoint-sm-max)
    .m-signup-card
        width: 100%
        box-shadow: 0 0 0 0

.clean-link
  text-decoration: none !important
  &:hover
    text-decoration: none !important
    color: inherit

  color: inherit

.m-gray-text
  color: rgba(0,0,0,0.6)
  font-weight: 500
</style>
