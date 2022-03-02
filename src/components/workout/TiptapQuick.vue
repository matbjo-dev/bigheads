<template>
  <div
    class="quickedit"
    @click="removePlaceholder()"
    @mouseenter="showSaveBtn = true"
    @mouseleave="
      addPlaceholder()
      removeSaveBtn()
    ">
    <editor-content ref="editor" :editor="editor" />
    <floating-menu v-if="editor" ref="floatmenu" :editor="editor">
      <span @mouseover="removePlaceholder()">
        <q-btn
          flat
          :class="{'is-active': editor.isActive('paragraph')}"
          @click="editor.chain().focus().setParagraph().run()">
          p
        </q-btn>
        <q-btn-dropdown flat outline label="H">
          <q-list>
            <q-item
              clickable
              flat
              :class="{'is-active': editor.isActive('heading', {level: 1})}"
              @click="editor.chain().focus().toggleHeading({level: 1}).run()"
              @mouseover="removePlaceholder()">
              <q-item-section>
                <q-item-label>H1</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              :class="{'is-active': editor.isActive('heading', {level: 2})}"
              @click="editor.chain().focus().toggleHeading({level: 2}).run()"
              @mouseover="removePlaceholder()">
              <q-item-section>
                <q-item-label>H2</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              :class="{'is-active': editor.isActive('heading', {level: 3})}"
              @click="editor.chain().focus().toggleHeading({level: 3}).run()"
              @mouseover="removePlaceholder()">
              <q-item-section>
                <q-item-label>H3</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn
          flat
          icon="format_list_bulleted"
          :class="{'is-active': editor.isActive('bulletList')}"
          @click="editor.chain().focus().toggleBulletList().run()"></q-btn>
        <q-btn
          flat
          icon="format_list_numbered"
          :class="{'is-active': editor.isActive('orderedList')}"
          @click="editor.chain().focus().toggleOrderedList().run()"></q-btn>
        <q-btn
          flat
          icon="format_quote"
          :class="{'is-active': editor.isActive('blockquote')}"
          @click="editor.chain().focus().toggleBlockquote().run()"></q-btn>
      </span>
    </floating-menu>

    <bubble-menu v-if="editor" :editor="editor">
      <q-btn
        class="bg-dark text-white"
        icon="format_bold"
        :class="{'is-active': editor.isActive('bold')}"
        @click="editor.chain().focus().toggleBold().run()">
      </q-btn>
      <q-btn
        class="bg-dark text-white"
        icon="format_italic"
        :class="{'is-active': editor.isActive('italic')}"
        @click="editor.chain().focus().toggleItalic().run()">
      </q-btn>
      <q-btn
        class="bg-dark text-white"
        icon="format_strikethrough"
        :class="{'is-active': editor.isActive('strike')}"
        @click="editor.chain().focus().toggleStrike().run()">
      </q-btn>
      <q-btn
        class="bg-dark text-white"
        icon="format_underline"
        :class="{'is-active': editor.isActive('underline')}"
        @click="editor.commands.toggleUnderline()">
      </q-btn>
    </bubble-menu>
    <q-btn
      v-if="showSaveBtn"
      flat
      class="float-right"
      icon="save"
      label="Save"
      style="color: rgba(0, 0, 0, 0.5)"
      @click="getFormData()" />
  </div>
</template>
<script>
import {Editor, EditorContent, FloatingMenu, BubbleMenu} from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import {api} from 'src/services/axios.js'

import {TodoItem, TodoList, Underline} from 'tiptap-extensions'

export default {
  name: 'TiptapQuick',
  components: {
    EditorContent,
    FloatingMenu,
    BubbleMenu,
  },
  data() {
    return {
      editor: null,
      showFloatMenu: false,
      placeholder: 'Write something...',
      showSaveBtn: false,
      location: '',
      corx: '',
      cory: '',
      date: '',
      today: this.currentDate(),
      weatherDesc: '',
      temp: '',
    }
  },
  created() {
    this.locatorButtonPressed()
    this.date = this.currentDate()
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Underline,
        Placeholder.configure({
          placeholder: this.placeholder,
          emptyEditorClass: 'is-editor-empty',
          emptyNodeClass: 'is-empty',
        }),
      ],
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
  methods: {
    removePlaceholder: function () {
      if (document.querySelector('.is-empty')) {
        document.querySelector('.is-empty').setAttribute('data-placeholder', '')
      }
    },
    addPlaceholder: function () {
      if (document.querySelector('.is-empty')) {
        document
          .querySelector('.is-empty')
          .setAttribute('data-placeholder', this.placeholder)
      }
    },
    removeSaveBtn: function () {
      if (this.editor.isEmpty) {
        this.showSaveBtn = false
      }
    },
    getFormData: function () {
      let postobj = {
        content: this.editor.getJSON(),
        locationx: this.corx,
        locationy: this.cory,
        date: this.date.replace('/', '-').replace('/', '-'),
        weatherdesc: this.weatherDesc,
        weathertemp: this.temp,
        tags: '',
      }
      this.postFormData(postobj)
    },
    postFormData: function (postobj) {
      return new Promise((resolve, reject) => {
        api
          .post('journalapi/journal/', postobj)
          .then((resp) => {
            if (resp.status == '201') {
              this.notifySuccess('Success', 'Posted')
              this.editor.commands.clearContent(true)
            }
            resolve(resp)
          })
          .catch((err) => {
            this.notifySuccess('Failure', 'Not posted')
            reject(err)
          })
      })
    },
    notifySuccess: function (titel, caption) {
      this.$q.notify({
        icon: 'check',
        caption: titel,
        message: caption,
        color: 'secondary',
      })
    },
    notifyFailure: function (titel, caption) {
      this.$q.notify({
        icon: 'error',
        caption: caption,
        message: titel,
        color: 'secondary',
      })
    },
    locatorButtonPressed: function () {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.corx = position.coords.latitude
          this.cory = position.coords.longitude
        },
        (error) => {
          console.log(error.message)
        },
      )
    },
    currentDate() {
      const current = new Date()
      const date = `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()}`
      return date
    },
    currentWeather: function () {
      fetch(`https://goweather.herokuapp.com/weather/` + this.city)
        .then(async (response) => {
          const data = await response.json()

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
          }
          this.temp = data.temperature
          this.weatherDesc = data.description
        })
        .catch((error) => {
          this.errorMessage = error
          console.error('There was an error!', error)
        })
    },
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.ProseMirror[contenteditable]:focus {
  outline: 0px solid transparent;
}
.ProseMirror {
  padding-left: 0.3em;
  > * + * {
    margin-top: 0.75em;
  }
  min-height: 50px;
  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
  p {
    font-size: 20px;
  }
}
/* Placeholder (at the top) */
.ProseMirror:not(:focus) p.is-editor-empty:first-child::before {
  content: attr(data-placeholder) !important;
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
  font-size: 20px;
}
</style>
