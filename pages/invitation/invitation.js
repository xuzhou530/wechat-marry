var app = getApp();
var common = require("../config.js");
var serverUrl = common.getserverUrl();
Page({
  onLoad: function(options) {
    var that = this;
    getInvitation(that);
  },

});
//获取邀请函
function getInvitation(that) {
  var postUrl = serverUrl + 'invit/getInvitation';
  wx.request({
    url: postUrl,
    method: 'POST',
    data: { 

    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      var code = res.data.code;
      var data = res.data.data;
      if (code != 200) {
        return false;
      }
      that.setData({
        invitation: data
      })
    }
  })
};