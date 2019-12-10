const db = wx.cloud.database();
Page({
  data: {
    points: [],
    markers: [],
    polyline: [],
    show: false
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  markertap(e){
    this.showPopup()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    //保存系统信息
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          view: {
            Height: res.windowHeight
          }
        })
      },
    });
    //请求测站信息
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.cloud.callFunction({
      name: 'movielist',
    }).then(res => {
      let a = JSON.parse(res.result).result
      //a.length
      for (let i = 0; i < 10; i++) {
        _this.setData({
          markers: _this.data.markers.concat({
            iconPath: "/images/red.png",
            id: i,
            latitude: parseFloat(a[i].lttd),
            longitude: parseFloat(a[i].lgtd),
            width: 12,
            height: 12
          })
        })
      }
      wx.hideLoading();
    }).catch(err => {
      console.error(err);
    });


  }
})