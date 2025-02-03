const { createTransport } = require("nodemailer");

const transport = createTransport({
    service: 'gmail',
    auth: {
        user: 'riteshpatdia0723@gmail.com',
        pass: 'cyip mquc ilgz jaox'
    }
})

async function sendMail(to, subject, html) {
    const option = {
        from: 'riteshpatdia0723@gmail.com',
        to: to,
        subject: subject,
        html:html
    }
    await transport.sendMail(option, (error) => {
        if(error){
            console.log(error);
        }else{
            console.log("sendMail");
        }
    })
}

module.exports = sendMail