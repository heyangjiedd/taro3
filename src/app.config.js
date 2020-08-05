export default {
  'pages': [
    'pages/index/index',
    'pages/login/index',
    'pages/my/index'
  ],
  'tabBar':{'list':[
    {'pagePath':'pages/index/index', 'text':'首页', 'iconPath':'assets/icons/home.png', 'selectedIconPath':'assets/icons/home-selected.png'},
    {'pagePath':'pages/login/index', 'text':'购物车', 'iconPath':'assets/icons/cart.png', 'selectedIconPath':'assets/icons/cart-selected.png'},
    {'pagePath':'pages/my/index', 'text':'我的', 'iconPath':'assets/icons/me.png', 'selectedIconPath':'assets/icons/me-selected.png'}
  ]},
  'window': {
    'backgroundTextStyle': 'light',
    'navigationBarBackgroundColor': '#fff',
    'navigationBarTitleText': 'WeChat',
    'navigationBarTextStyle': 'black'
  }
};
