import { RouterLink } from 'vue-router'

export default defineComponent(() => {
  const reco: LinkInfo[] = [
    {
      to: { path: '/' },
      desc: '猜你喜欢',
      icon: h(IEpCoffeeCup)
    },
    {
      to: { path: '/search', query: { keywords: '' } },
      desc: '歌曲搜索',
      icon: h(IEpSearch)
    }
  ]

  const mine: LinkInfo[] = [
    {
      to: { path: '/' },
      desc: '我的收藏',
      icon: h(IEpStar)
    },
    {
      to: { path: '/' },
      desc: '我的电台',
      icon: h(IEpHeadset)
    },
    {
      to: { path: '/' },
      desc: '音乐云盘',
      icon: h(IEpCloudy)
    },
    {
      to: { path: '/' },
      desc: '最近播放',
      icon: h(IEpClock)
    },
    {
      to: { path: '/default' },
      desc: '默认列表',
      icon: h(IEpHistogram)
    }
  ]

  const song: LinkInfo[] = [
    {
      to: { path: '/default' },
      desc: '默认列表',
      img: ''
    }
  ]

  const side = [
    {
      title: '推荐',
      isImg: false,
      content: reco
    },
    {
      title: '我的',
      isImg: false,
      content: mine
    },
    {
      title: '歌单',
      isImg: true,
      content: song
    }
  ]
  return () => (
    <aside>
      {side.map((v, i) => (
        <div key={i}>
          <h4>{v.title}</h4>
          <ul>
            {v.content.map((e, i) => (
              <li key={i}>
                <RouterLink to={e.to}>
                  {v.isImg ? <img src={e.img} alt="" width="30px" height="30px" /> : e.icon}
                  <span>{e.desc}</span>
                </RouterLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  )
})
