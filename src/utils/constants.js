// Venues dropdown options
export const VENUES = [
  '银泉西（北）足球场',
  '银泉西（南）足球场',
  '紫金港西田径场',
  '紫金港东田径场',
  '玉泉田径场',
  '玉泉新桥门足球场',
  '华家池足球场',
  '西溪足球场',
  '之江足球场',
]

// Match name dropdown options — 男足
export const MATCH_NAMES_MALE = [
  '浙江大学三好杯足球赛',
  '浙江大学CC98杯足球赛',
  '浙江大学新生杯足球赛',
  '浙江大学五人制足球赛',
  '友谊赛',
  '热身赛',
]

// Match name dropdown options — 女足
export const MATCH_NAMES_FEMALE = [
  '浙江大学三好杯女子足球赛',
  '浙江大学CC98杯女子足球赛',
  '浙江大学新生杯女子足球赛',
  '浙江大学五人制女子足球赛',
  '友谊赛',
  '热身赛',
]

// Yellow card foul types (code, short label ≤4 chars, full description)
export const YELLOW_FOULS = [
  { code: 'C1', short: '延误比赛', full: '延误比赛重新开始' },
  { code: 'C2', short: '表示异议', full: '以语言或行动表示异议' },
  { code: 'C3', short: '擅自进出', full: '未得到裁判员允许进入、重新进入或故意离开比赛场地' },
  { code: 'C4', short: '未守距离', full: '未遵守规定的距离' },
  { code: 'C5', short: '持续违规', full: '持续违反规则' },
  { code: 'C6', short: '非体育行为', full: '犯有非体育行为' },
]

// Red card foul types (code, short label ≤4 chars, full description)
export const RED_FOULS = [
  { code: 'S1', short: '故意手球', full: '故意手球犯规来阻止对方的进球或明显的得分机会' },
  { code: 'S2', short: '破坏得分', full: '用可判为任意球的犯规，破坏向对方球门移动着的明显的进球得分机会' },
  { code: 'S3', short: '严重犯规', full: '严重犯规' },
  { code: 'S4', short: '咬人吐水', full: '对任何一人咬人或吐口水' },
  { code: 'S5', short: '暴力行为', full: '暴力行为' },
  { code: 'S6', short: '侮辱言行', full: '使用攻击性的、侮辱的语言或动作' },
  { code: 'S7', short: '二次警告', full: '在同一场比赛中被第二次警告' },
]

// Added time options (1-15), used by TimeInput.vue
export const ADDED_TIME_OPTIONS = Array.from({ length: 15 }, (_, i) => String(i + 1))