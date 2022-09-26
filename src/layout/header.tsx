import type { ToolInfo } from '@/types'
import { RouterLink } from 'vue-router'
import { useAppStore } from '@/stores'

export default defineComponent((props, { slots }) => {
  const router = useRouter()
  const appStore = useAppStore()

  const darkTheme = computed({
    get: () => appStore.getDarkTheme,
    set: value => appStore.setDarkTheme(value)
  })

  const control: ToolInfo[] = [
    {
      click: () => router.back(),
      icon: h(IEpArrowLeft)
    },
    {
      click: () => router.go(1),
      icon: h(IEpArrowRight)
    },
    {
      click: () => router.go(0),
      icon: h(IEpRefresh)
    }
  ]

  const menus: LinkInfo[] = [
    { to: '/play', desc: '音乐' },
    { to: '/video', desc: 'M V' },
    { to: '/radio', desc: '电台' },
    { to: '/anime', desc: '动漫' }
  ]

  const search = ref('')
  const onSearch = (payload: KeyboardEvent) => {
    console.log(payload)
  }

  const tools: ToolInfo[] = [
    {
      click: () => {
        darkTheme.value = !darkTheme.value
        document.documentElement.setAttribute('theme-mode', darkTheme.value ? '' : 'light')
      },
      icon: h(IEpBrushFilled)
    },
    {
      click: () => {
        //
      },
      icon: h(IEpBellFilled)
    }
  ]

  return () => (
    <header className="header">
      <ul>
        {control.map((e, i) => (
          <li key={i} onClick={e.click}>
            {e.icon}
          </li>
        ))}
      </ul>
      <ul>
        {menus.map((e, i) => (
          <li key={i} activeClass="inactive">
            <RouterLink to={e.to}>
              <span>{e.desc}</span>
            </RouterLink>
          </li>
        ))}
      </ul>
      <p>
        <input type="text" placeholder="搜索" v-model={search.value} onKeydown={onSearch} />
      </p>
      <ul>
        {tools.map((e, i) => (
          <li key={i} onClick={e.click}>
            {e.icon}
          </li>
        ))}
        <li>{slots.mine?.()}</li>
      </ul>
      {slots.login?.()}
    </header>
  )
})
