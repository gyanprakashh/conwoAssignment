const nodemailer=require('nodemailer');
const axios =require('axios');
const {getTimeInterval}=require('./getTime');
const {sendMailFunc}= require('./mail');


exports.getCalTime=(req,res)=>{
    let {slatlong,dlatlong,email,time}=req.body;
    console.log(email);
    let currTime=new Date();
    let currNow=currTime.getHours()+":"+currTime.getMinutes();
    if(time.includes('pm' || 'PM')){
        time=time.split(" ")[0];
        let time1=time.split(":");
       let time2=parseInt(time1)+12;
       time=time2+":"+time1[1];

    }else{
        time=time.split(" ")[0];
    }
    var distance = require('google-distance-matrix');
 
var origins = [slatlong];
var destinations = [dlatlong];
 
distance.key('AIzaSyAW8v9wOOvEviACg4YbowQEQn0SLplfOJM');
distance.units('imperial');
distance.matrix(origins, destinations, function (err, distances) {
    if (err) {
        return console.log(err);
    }
    if(!distances) {
        return console.log('no distances');
    }
    if (distances.status == 'OK') {
        let requiresdTime=distances.rows[0].elements[0].duration.value;
        const totalTime=getTimeInterval(currNow, time,requiresdTime/60);
        console.log(totalTime+" tottime");
        sendMailFunc(email,totalTime);
        return res.json({
            message:`your remainder has been set`
        })

    }
});
   
   
}