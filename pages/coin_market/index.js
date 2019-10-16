var app = getApp();
var common = require("../config.js");
var serverUrl = common.getserverUrl();
var pageNo=1;
var pageSize = 10;
Page({
    data: {
        
    },
    onLoad: function(options) {
      //设置第一次数据
      wx.startPullDownRefresh;
      var that = this;
      getMsgList(that);
    },
    bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    },
  /**
* 页面相关事件处理函数--监听用户下拉动作
*/
  onPullDownRefresh: function () {
    console.log("监听用户下拉动作");
    var that = this;
    pageNo =1;
    that.setData({
      msgList: [],
    })
    getMsgList(that);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("监听用户上拉拉动作");
    var that = this;
    getMsgList(that);
  },
    foo: function () {
      var that = this;
      //留言内容不是空值
      var userInfo = app.globalData.userInfo;
      if (userInfo == null || userInfo == undefined) {
        wx.showModal({
          title: '提示',
          content: '未登录',
          showCancel: false
        })
      }
      var name = userInfo.nickName;
      var face = userInfo.avatarUrl;
      var words = that.data.inputValue;
      if (words==null||words==undefined)
      {
        wx.showModal({
          title: '提示',
          content: '您还没有填写内容',
          showCancel: false
        })
      }
      wx.request({
        url: serverUrl + '/msg/save',
        method: 'POST',
        data: {
          'nickname': name,
          'photourl': face,
          'content': words,
          'openId': app.globalData.openId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          if (200 == res.statusCode) {
            console.log(res.data)
            pageNo = 1;
            that.setData({
              msgList: [],
            })
            getMsgList(that);
            wx.showModal({
              title: '提示',
              content: res.data.message,
              showCancel: false
            })
          }
        }
      })
    that.setData({
      inputValue: '' //将data的inputValue清空
    });
    return;
  }
});

//获取留言列表
var getMsgList = function (that) {
  wx.request({
    url: serverUrl + '/msg/getList',
    method: 'POST',
    data: { "pageNo": pageNo, "pageSize": pageSize },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      that.setData({
        msgList: res.data.data.list
      });
    }
  })
}