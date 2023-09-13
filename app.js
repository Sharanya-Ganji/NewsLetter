const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const mailchimp=require("@mailchimp/mailchimp_marketing");
const https=require("https");
//const bootstrap=require("bootstrap@5.2.3");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
   //const listId="9ca6ddbfc9";
   const firstName=req.body.fname;
   const lastName=req.body.lname;
   const email=req.body.mail;

   const data={
    members: [
        {
            email_address:email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
           }
        }
    ]
   };

mailchimp.setConfig({
    apiKey: "f4483ff20316e2b42907fffccc6f88a6-us17",
    server: "us17"
});
const run = async() =>{
    try{
    const response = 
    await mailchimp.lists.batchListMembers( "9ca6ddbfc9", data );
    console.log(response);
    res.sendFile(__dirname + "/success.html");
    }
    catch(err){
        console.log(err.status);
        res.sendFile(__dirname+"/failure.html");
    }
    
  };

  run();
});
app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(3000, function(req, res){
    console.log("Server is running on port 3000");
})
//api key
//f4483ff20316e2b42907fffccc6f88a6-us17
//list id
//9ca6ddbfc9
//     const jsonData=JSON.stringify(data);
//    const url="https://us17.api.mailchimp.com/3.0/lists/9ca6ddbfc9";
//    const options= {
//     method: "POST",
//     auth: "Sharanya:f4483ff20316e2b42907fffccc6f88a6-us17"
//    }
//    const request=https.request(url, options, function(response){
//     response.on("data", function(data){
//         console.log(JSON.parse(data));
//     })
//    })
//      request.write(jsonData);
//      request.end();