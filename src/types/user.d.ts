export type User = {
  account: Account
  bindings: Binding[]
  cookie?: string
  loginType?: number
  profile: Profile
  token: string
}

export type Account = {
  anonimousUser: boolean
  ban: number
  baoyueVersion: number
  createTime: number
  donateVersion: number
  id: number
  salt: string
  status: number
  tokenVersion: number
  type: number
  uninitialized: boolean
  userName: string
  vipType: number
  viptypeVersion: number
  whitelistAuthority: number
}

export type Binding = {
  bindingTime: number
  expired: boolean
  expiresIn: number
  id: number
  refreshTime: number
  tokenJsonStr: string
  type: number
  url: string
  userId: number
}

export type Profile = {
  accountStatus: number
  authStatus: number
  authority: number
  avatarDetail: string
  avatarImgId: number
  avatarImgIdStr: string
  avatarImgId_str: string
  avatarUrl: string
  backgroundImgId: number
  backgroundImgIdStr: string
  backgroundUrl: string
  birthday: number
  city: number
  defaultAvatar: boolean
  description: string
  detailDescription: string
  djStatus: number
  eventCount: number
  expertTags: string
  experts: string
  followed: boolean
  followeds: number
  follows: number
  gender: number
  mutual: boolean
  nickname: string
  playlistBeSubscribedCount: number
  playlistCount: number
  province: number
  remarkName: string
  signature: string
  userId: number
  userType: number
  vipType: number
}
