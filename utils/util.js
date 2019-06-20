const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//得到时间格式2018-10-02
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')

}
//todate默认参数是当前日期，可以传入对应时间 todate格式为2018-10-05
function getDates(days, todate) {
  var dateArry = [];
  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry;
}
function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
  let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.time = yearDate + '-' + month + '-' + dayFormate;
  dateObj.week = show_day[day];
  return dateObj;
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatTime2 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
const formatTime3 = date => {
  const year = date.getFullYear() + 1
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
//日期的加减
const addDay = data => {
  //下面的不是时间戳，是时间戳*1000
  var timestamp = Date.parse(new Date());
  var newTimestamp = timestamp + data * 24 * 60 * 60 * 1000;
  var date = new Date(newTimestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join('-');
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  getDates: getDates,
	formatTime2: formatTime2,
	formatTime3: formatTime3,
	addDay: addDay
}


