const nodemailer = require("nodemailer");
var cron = require('node-cron');
var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2b9594a958bec8",
      pass: "0131ba0836804e"
    }
  });

  exports.sendMailFunc=(email,time)=>{
    //   let email="kk@gmail.com"
    let d=new Date();
      let time1=time.split(":");
      let hrs=parseInt(time1[0]);
      let mins=parseInt(time1[1]);
      let min1=parseInt(d.getMinutes());
      let hr1=parseInt(d.getHours());
      let totmin=(mins+min1)%60;
      let carry=Math.floor(totmin/60);
      let tothr=(hr1+hrs+carry)%24;
     // let tot=Math.ceil(hrs+mins);
        console.log(tothr+":"+totmin);
       let task= cron.schedule(`0 ${totmin} ${tothr} * * * `, () => {
           console.log(`hii`);
        const emailData = {
            to: [
              {
                address: email,
              },
            ],
            from: {
              address: process.env.EMAIL_FROM,
            },
            subject: `Leave notification`,
            html: `
                  <div>
                    <h1>It's time to leave</h1>
          
                  </div>
                `,
          };
          transport.sendMail(emailData,(err,info)=>{
              if(err){
                //   return res.json({
                //       error:`Something went wrong`
                //   })
                console.log(err);
                return `something went wrong`;
              }
            //   return res.json({ 
            //       message:`your remainder has been set`
            //   });
            console.log(`mail has been sent`);
            return `mail has been sent`
          });
         });
    //   task.stop();
   
  }