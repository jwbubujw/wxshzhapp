// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var rp = require('request-promise');
// 云函数入口函数
exports.main = async (event, context) => {
  rp('http://www.google.com')
    .then(function (htmlString) {
      return htmlString;
    })
    .catch(function (err) {
      console.error(err);
    });
}