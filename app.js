

const express=require("express");
const BodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(BodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
   res.sendFile(__dirname+ "/signup.html");
});

app.post("/",function(req,res){     //to send data to server
const firstname=req.body.fName;
  const lastname=req.body.lName;
  const email=req.body.email;

const data={  //data is object
  members:[
    {  //providing all the key value pair with keys that mailchimp is going to recognize.
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname
  }
}
  ]
};

const jsonData=JSON.stringify(data);
const url="https://us20.api.mailchimp.com/3.0/lists/b752862f9d";
const options={
  method:"POST",
  auth:YOUR-API-KEY
};
const request=https.request(url,options,function(response){
  //to get response from server

  if(response.statusCode ===200){
    res.sendFile(__dirname +"/success.html");
  }
  else{
    res.sendFile(__dirname + "/failure.html");
  }
response.on("data",function(data){
  console.log(JSON.parse(data));
});
});
request.write(jsonData);
request.end();

});
 app.post("/failure",function(req,res){
   res.redirect("/");
 });


 app.listen(process.env.PORT|| 3000,function(){
   console.log("Server is running on port 3000!");
 });
//api key
//ef761ac4a1f24c701c4e365e196ccaa2-us20

//list_id
// b752862f9d
