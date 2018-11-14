'use strict';

var _API = require('../../lib/API');

var _API2 = _interopRequireDefault(_API);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    /*      wx.request({
              url : API.service.userInfo,
              data : {},
              method:'POST',
              success:res=>{
                  console.log('接口调用成功');
                  console.log(res);
              }
          })*/
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function onShareAppMessage() {}
});
//# sourceMappingURL=index.js.map
