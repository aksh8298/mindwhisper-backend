const nodemailer = require("nodemailer")

exports.sendEmail = (req,res) => {
   try {
    const transport = nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        port:465,
        auth:{
            user:"akankshasingh0035@gmail.com",
            pass:"vuef rnvh mlbg fhia"
        }
    })
    const data = {
        from:"akankshasingh0035@gmail.com",
        to:req.body.email,
        subject:req.subject,
        text:req.text
    }
    transport.sendMail(data,(error,info)=>{
        if(error){
            console.log(error);
            res.status(400).json({message:"Email Delivery Error"})
        }else{
            console.log(info);
            res.status(201).json({message:"Success"})
        }
    })
    
   } catch (error) {
        res.status(400).json({message:"Error Occured"})
   }
      
   

}