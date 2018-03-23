const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const APIV3 = '/api/v3'

module.exports = {
  name: 'Qoros Web',
  prefix: 'Qoros',
  footerText: 'Qoros Web  © 2018 CMIOT',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  APIV3,
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/qoros/msgBox/getAllRecord`,

    //线上调用接口
    //users: `${APIV3}/msgBox/getAllRecord`,
    //userLogin: `${APIV3}/user/login`,
    //userLogout: `${APIV3}/user/logout`,
    //user: `${APIV3}/user/:id`,

    //消息盒子
    msgboxList:`${APIV1}/msgbox/lists`,
    // msgboxAdd:`${APIV1}/msgbox`,
    // msgboxDelete:`${APIV1}/msgbox/:id`,
    // msgboxUpdate:`${APIV1}/msgbox`,
    // msgboxSelect:`${APIV1}/msgbox`,
    msgbox:`${APIV1}/msgbox/:id`,
  },
}
