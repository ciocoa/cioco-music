import { defineComponent } from 'vue'
import style from '@/assets/style/bg.module.scss'

export default defineComponent({
  setup() {
    return () => (
      <div class={style.background}>
        <video src="https://assets.codepen.io/3364143/7btrrd.mp4">
          Sorry! Your browser does not support the video tag.
        </video>
      </div>
    )
  }
})
