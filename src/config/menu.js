export default [
  { text: 'Home', icon: 'mdi-home', link: '/' },
  {
    title: 'Partner 관리',
    icon: 'mdi-account-group',
    child: [{ text: 'About', link: '/about' }]
  },
  {
    title: 'Admin 관리',
    icon: 'mdi-account-cog',
    child: [{ text: 'About', link: '/about' }]
  },
  {
    title: '환전 관리',
    icon: 'mdi-coin-outline',
    child: [
      {
        text: '환전 내역',
        link: '/exchange-list'
      },
      {
        text: 'List Demo',
        link: '/list-demo'
      }
    ]
  }
]
