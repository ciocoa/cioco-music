import { Header, Aside } from '@/layout'
import { RouterView } from 'vue-router'
import { LoginPanel, MinePanel } from './views/components'

export const App = () => (
  <div className="wrapper">
    <Header v-slots={{ mine: () => <MinePanel />, login: () => <LoginPanel /> }} />
    <main className="main">
      <Aside />
      <RouterView />
    </main>
  </div>
)
