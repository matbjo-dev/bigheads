<template>
        <q-card class="m-main-card">
            <q-card-section>
                <div class="text-h5">Log in</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <Form :validation-schema="schema" class="q-gutter-y-md" autocomplete="on" @submit="login">
                    <Field v-slot="{errorMessage, value, field}" v-model="email" name="email">
                        <q-input ref="emailfield" required standout="bg-primary white-text" class="logginn" :model-value="value" label="E-mail" autocomplete="email" v-bind="field" :error-message="errorMessage" :error="!!errorMessage">
                            <template #prepend>
                            <q-icon name="email" />
</template>

<template #hint>
     E-mail address
</template>
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

<template #hint>
     Password
</template>
            </q-input>
          </Field>
          <q-separator />
          <span class="flex q-mt-md q-gutter-y-md q-gutter-x-md row">
          <q-btn color="primary" type="submit" icon="face" class="auth-btn" label="Log in" />
          <q-btn
            color="accent"
            icon="add"
            label="Sign up"
            class="auth-btn"
            to="/register"></q-btn>
          <q-btn
            color="accent"
            icon="restore"
            label="Recover"
            class="auth-btn"
            to="/passord/glemt"></q-btn>
            </span>
        </Form>
      </q-card-section>
    </q-card>

</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { defineComponent, ref } from 'vue'
import { authStore } from 'src/pinia/auth.js'
import useNotify from 'src/composables/notify'
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
        const password = ref('')

        const schema = yup.object({
            email: yup.string().required().email().label('Email address'),
            password: yup.string().required().label('Password'),
        })

        const login = () => {
            $store.login({
                    email: email.value,
                    password: password.value,
                })
                .then((resp) => {
                    if (resp.status == 200) {
                        useNotify('success', 'Success', 'Logged in.')
                        if (window.PasswordCredential) {
                            // eslint-disable-next-line
                            const passwordCredential = new PasswordCredential({
                                id: email,
                                password: password,
                            })
                            navigator.credentials.store(passwordCredential)
                        }
                        $router.push('/')
                    } else {
                        useNotify('error', 'Could not login', 'Try again.')
                    }
                })
        }

        return {
            // data
            email,
            password,
            login,
            schema,
        }
    },
})
</script>

<style lang="sass" scoped>
.m-main-card
    width: 50%
    max-height: 650px
    margin-top: 15px
    margin-left: auto
    margin-right: auto
    height: 450px

@media (max-width: $breakpoint-md-max)
    .m-main-card
        width: 100%
        box-shadow: 0 0 0 0
@media (max-width: $breakpoint-xs-max)
    .auth-btn
        width: 45%
</style>
