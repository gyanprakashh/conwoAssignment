const moment=require('moment');

exports.getTimeInterval=(startTime, endTime, lunchTime)=>{
    var start = moment.utc(startTime, "HH:mm");
    var end = moment.utc(endTime, "HH:mm");
    
    // account for crossing over to midnight the next day
    //if (end.isBefore(start)) end.add(1, 'day');
    
    // calculate the duration
    var d = moment.duration(end.diff(start));
    
    // subtract the lunch break
    d.subtract(lunchTime, 'minutes');
    
    // format a string result
    var s = moment.utc(+d).format('H:mm');
    return s;
}