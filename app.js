const express = require("express");
const https = require("https");
const ejs = require('ejs');
const bodyParser = require("body-parser");
const port = 2000;



const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("static"));

let url1 = "https://api.adviceslip.com/advice";   
let info = '';
let advice = '';

app.get("/", function(req, res){
    res.render('advice',{advice: advice});

})

app.post("/", function(req,res){
    if (req.body.action === "btn1") {
        https.get(url1, function(response){
            response.on("data", function(data){
                info = JSON.parse(data);
                advice = info.slip.advice;
                console.log(advice);
                res.redirect("/");
                
                
    
        })
    
    })  
    }
    else if (req.body.action === "btn2") {
        let query = req.body.customAdvice;
        let url2 = "https://api.adviceslip.com/advice/search/"+query; 
        https.get(url2, function(response){
            //console.log(response.statusCode);
            //console.log(response.statusMessage);
            //console.log(response.headers);

            response.on("data", function(data){
                info = JSON.parse(data);
                if(info){
                advice = info.slips[0].advice
                }
                else{
                    advice = "no advice found";
                }
                console.log(advice);    
                
                res.redirect("/");
                
                
    
        })
    
    })  

    }
 
       
        
   

})


app.listen(port, function(){
    console.log(`http://localhost:${port}`);
})