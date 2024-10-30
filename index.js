const express = require("express")
const bodyParser=require("body-parser")
const users=[{
    name:"John",
    kidneys:[{
        healthy:false
    },
    {
        healthy:false
    },
]
}]

const app =express();
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    const userkidney=users[req.query.n].kidneys;
    const kidneylength=userkidney.length;
    let count=0;

    for(let i=0;i<kidneylength;i++){
        if(userkidney[i].healthy==true)count++;
    }

    console.log(kidneylength);
    console.log(userkidney);
    console.log(count);
    res.json({
        name: users[ req.query.n].name,
        healthykidney:count,
        unhealthykidney:kidneylength-count
    })
    // res.send(userkidney);
})
app.post("/",(req,res)=>{
    const userNumber=req.body.number;
    users[userNumber].kidneys.push({
        healthy:true,
    })
    let count=0;
    for(let i=0;i<users[userNumber].kidneys.length;i++){
        if(users[userNumber].kidneys[i].healthy)count++;
    }
    res.json({
        name: users[ userNumber].name,
        healthykidney:count,
        unhealthykidney:users[userNumber].kidneys.length-count
    })

})
app.put('/',(req,res)=>{
    const userNumber=req.body.number;
    for(let i=0;i<users[userNumber].kidneys.length;i++){
        users[userNumber].kidneys[i].healthy=true;
    }
    res.json({
        message:"Done!!",
        user: users[userNumber]
    });
})
app.delete('/',(req,res)=>{
    const userNumber=req.body.number;
    let count=0;
    for(let i=0;i<users[userNumber].kidneys.length;i++){
        if(users[userNumber].kidneys[i].healthy==false){
            users[userNumber].kidneys.splice(i,1);
            count++;
        }
    }
    if(count==0)res.status(422).json({
        message:"you haven't any bad kidney"
    });
    else res.send(users[userNumber])
})
app.listen(3000,()=>{
    console.log("app is listening on port 3000");
})