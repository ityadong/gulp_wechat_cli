//app.js
App({
  onLaunch: function () {
    //本地存储
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  },
  globalData: {
    userInfo: null
  }
})