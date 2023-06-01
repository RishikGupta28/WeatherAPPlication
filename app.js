const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
',.l'
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
   res.sendFile(__dirname + "/index.html");
    
})

app.post("/",(req,res)=>{
    const query = req.body.cityName;
    const apikey = "7fcc2542d33c94bfe86a74cd270fb583";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apikey;
    https.get(url,(response)=>{
        console.log(response.statusCode);
    
        response.on("data",(data)=>{             // will trigger the data on the server
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp; // path from the jason api endpoint
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png" ;
            res.write("<p>The weather is " + weatherDescription+"</p>");
            res.write("<h1>The Temperature in "+query+" is "+temp+" Degree Celsius</h1>");
            res.write("<img src="+imageURL+">");
            res.send();
            
        })
    })

    
    // console.log("Post received");
})







port = 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});