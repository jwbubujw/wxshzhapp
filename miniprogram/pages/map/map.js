const db = wx.cloud.database();
Page({
  data: {
    points: [],
    markers: [],
    polyline: []
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
  onLoad: function () {
    //保存系统信息
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          view: {
            Height: res.windowHeight
          }
        })
      },
    });

    var total = 0;
    db.collection('bound').count({
      success: function (res) {
        total = res.total;
        const batchTimes = Math.ceil(total / 20);
        for (let i = 0; i < batchTimes; i++) {
          db.collection('bound').orderBy('id', 'asc').skip(i * 20).get().then(res => {
            for (let j = 0; j < res.data.length; j++) {
              console.log(res.data[j].smx)
              _this.setData({
                points: _this.data.points.concat({
                  longitude: parseFloat(res.data[j].smx),
                  latitude: parseFloat(res.data[j].smy)
                })
              })
              if (i == batchTimes - 1) {
                _this.setData({
                  polyline: [{
                    points: _this.data.points,
                    color: "#FF0000DD",
                    width: 1,
                    dottedLine: false
                  }]
                })
              }
            }
          }
          ).catch(err => {

          });
        }
      }
    })




    //请求测站信息
    // wx.showLoading({
    //   title: '正在加载数据',
    // })
    // wx.cloud.callFunction({
    //   name: 'movielist',
    // }).then(res => {
    //   wx.hideLoading();
    //   let a = JSON.parse(res.result).result
    //   for (let i = 0; i < a.length; i++) {
    //     _this.setData({
    //       markers: _this.data.markers.concat({
    //         iconPath: "/images/red.png",
    //         id: i,
    //         latitude: parseFloat(a[i].lttd),
    //         longitude: parseFloat(a[i].lgtd),
    //         width: 12,
    //         height: 12
    //       })
    //     })
    //   }
    // }).catch(err => {
    //   console.error(err);
    // });

  }
})