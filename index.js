const express= require ("express");
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')


const app= express();

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(morgan("dev"))
const port= 8000;

app.use(express.json());


// app.get("/data",(req,res)=>{
//    // console.log(req.params.id);
//     console.log(req.query.name)
//     res.send("hello "+req.query.name+" from data")
// })

// const students=[{
//     name:"Masoom",
//     age:23,
//     marks:100,
//     subjects:["maths","science","english"]
// },
// {
//     name:"Ali",
//     age:22,
//     marks:90,
//     subjects:["maths","science","english"]
// },
// {
//     name:"Usman",
//     age:21,
//     marks:80,
//     subjects:["maths","science","english"]
// },
// {
//     name:"Ahmad",
//     age:20,
//     marks:70,
//     subjects:["maths","science","english"]
// }
// ]

// // console.log(JSON.stringify(students.subjects))

// // app.post("/submit",(req,res)=>{
// // console.log(req.body)
// // });

// // app.get("/submit",(req,res)=>{
// //     console.log(req.body.name)
// // })

// const validate =(req,res,next)=>{
//     if(req.body.age<=0){
//         res.status(401).send("age should be greater than 0")
    
//     }else{
//         next();
//     }
//     }


// app.post("/students",validate,(req,res)=>{
//     const age=req.body.age;

//     if(age<20){
//         res.status(400).send("age should be greater than 20")
//     }
//     else{
//         let result=students.filter((elem)=>
//         elem.age===age)
//         res.send(result);
//     }
    

// });


const auth=require("./routes/auth")

app.use("/auth",auth)

const orders=require("./routes/orders")

app.use("/orders",orders)


app.listen(port,(e)=>{
if(e){
    console.log("server error ",{e});
}
else{
    console.log("server is running on port",{port})}
})