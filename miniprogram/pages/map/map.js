const db = wx.cloud.database();
Page({
  data: {
    reslut: [],
    markers: [],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 12,
      dottedLine: true
    }]
  },
  // regionchange(e) {
  //   console.log(e.type)
  // },
  // markertap(e) {
  //   console.log(e.markerId)
  // },
  // controltap(e) {
  //   console.log(e.controlId)
  // },
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
    wx.cloud.callFunction({
      name: 'movielist'
    }).then(res => {
      let a = JSON.parse(res.result).result
      for (let i = 0; i < a.length; i++) {
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
    }).catch(err => {
      console.error(err);
    });
    wx.cloud.callFunction({
      name: 'geolist'
    }).then(res => {
      let a = JSON.parse(res.result).result
      for (let i = 0; i < a.length; i++) {
        db.collection('bound').add({
          data: {
            geo: new db.Geo.Point(110, 23)
          }
        })
      }
    }).catch(err => {
      console.error(err);
    });
   
  }
})