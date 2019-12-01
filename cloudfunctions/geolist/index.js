// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rp = require('request-promise');
// 云函数入口函数
exports.main = async (event, context) => {
  return rp('http://106.13.62.242/geo.html')
    .then(function (htmlString) {
      return htmlString;
    })
    .catch(function (err) {
      console.error(err);
    });
}