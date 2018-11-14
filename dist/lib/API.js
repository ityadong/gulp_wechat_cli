'use strict';

/**
 * 小程序api配置文件
 */

var host = 'http://192.168.1.195:440';

var config = {

    service: {
        host: host,
        // 登录(post)
        loginUrl: host + '/webapp/user/login',
        // 用户信息(post)
        userInfo: host + '/webapp/user/userInfo'
    }
};

module.exports = config;
//# sourceMappingURL=API.js.map
