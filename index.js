const express = require("express")
const bodyParser=require("body-parser")
const users=[{
    name:"John",
    kidneys:[{
        healthy:false
    },
    {
        healthy:true
    },
]
}]

const app =express();
app.use(bodyParser.json());


const userVerification=(req,res,next)=>{
    let name=req.headers.name;
    let password=req.headers.password;
    if(name!='aryam'||password!='1234'){
        res.status(400).send("Wrong name or password");
        return ;
    }
    console.log("user is verified");
    next();
}
const inputValidation=(req,res,next)=>{
    if(req.query.n>=users.length){
        res.status(400).send("Invalid User Index");
        return ;
    }
    console.log("input is valid");
    next();
}


app.use(userVerification);
app.use(inputValidation);
// by using this every route execute these function first

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

// this is used to handle occur in a route while execution either by wrong inputs by user..
app.use((err,req,res,next)=>{
    res.json({
        msg:"Some error occur"
    })
})

app.listen(3000,()=>{
    console.log("app is listening on port 3000");
})