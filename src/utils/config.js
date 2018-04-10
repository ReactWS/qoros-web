const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
//const APIV3 = '/api/v3'

const APIV3 = '/api'

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
    //userLogin: `${APIV1}/user/login`,
    //userLogout: `${APIV1}/user/logout`,
    //userInfo: `${APIV1}/userInfo`,
    //users: `${APIV1}/users`,
    //posts: `${APIV1}/posts`,
    //user: `${APIV1}/user/:id`,
    //dashboard: `${APIV1}/dashboard`,
    //menus: `${APIV1}/menus`,
    //weather: `${APIV1}/weather`,
    //v1test: `${APIV1}/test`,
    //v2test: `${APIV2}/qoros/msgBox/getAllRecord`,

    //线上调用接口
    //users: `${APIV3}/msgBox/getAllRecord`,
    //userLogin: `${APIV3}/user/login`,
    //userLogout: `${APIV3}/user/logout`,
    //user: `${APIV3}/user/:id`,

    //消息盒子
    //msgboxList:`${APIV1}/msgbox/lists`,

    //msgbox:`${APIV1}/msgbox/:id`,
    //用户管理
    userLogin: `${APIV3}/user/login`,
    userLogout: `${APIV3}/user/logout`,
    user: `${APIV3}/user/author`,
    userSelect: `${APIV3}/user/select`,
    userAdd: `${APIV3}/user/insert`,
    userUpdate: `${APIV3}/user/update`,
    menus: `${APIV3}/menu/menus`,
    users: `${APIV3}/user/getAllUsers`,
    //消息盒子正式环境
    msgboxList:`${APIV3}/msgBox/getAllRecord`,
    msgboxAdd:`${APIV3}/msgBox/insert`,
    msgboxDelete:`${APIV3}/msgBox/delete`,
    msgboxUpdate:`${APIV3}/msgBox/update`,
    msgboxSelect:`${APIV3}/msgBox/select`,
    msgboxUser2Vin:`${APIV3}/msgBox/user2vin`,
    //静默安装
    apkList:`${APIV3}/apkPackage/listAllInfo`,
    apkAdd:`${APIV3}/apkPackage/uploadApk`,
    apkDelete:`${APIV3}/apkPackage/delete`,
    apkUpdate:`${APIV3}/apkPackage/autoInsatll`,
    //apkSelect:`${APIV3}/`,
  },
}
