import {Notify} from 'quasar'

const notify = function (type, message, caption) {
  let icon = ''
  let color = ''
  if (type == 'success') {
    icon = 'check'
    color = 'primary'
  }
  if (type == 'error') {
    icon = 'error'
    color = 'negative'
  }
  Notify.create({
    icon: icon,
    caption: caption,
    message: message,
    color: color,
  })
}

export default notify
