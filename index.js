const express = require('express')
require('dotenv').config()

let app = express()
app.use(express.json())

app.get('/Hello',(req,res)=>{
    res.redirect('/check')
})

app.get('/name',(req,res)=>{
    res.send('<h1>Hii Hells<h1>')
})

app.get('/check',(req,res)=>{
    res.send('Check Hiii Check')
})

let arr = []
let id = 0
let isDeleted = false
app.post('/createProd',(req,res)=>{
    // console.log(req.body)
    let obj = req.body
    obj.isDeleted = false
    id++
    obj.id = id
    
    if(obj.name && obj.cost && obj.cat)
    {
        if(arr.find((val)=>{
            return val.name == obj.name
        })){
            res.send({issuccessful : false, message : 'Already Exist'})
        }
        arr.push(obj)
        res.send({issuccessful : true, product : obj})
    }else{
        res.send({issuccessful : false, message : 'Invalid'})
    }
})

app.put('/updatePro',(req,res)=>{
    let id = req.query.id;
    let idx = arr.findIndex((val)=>(val.id == id));
    if(idx>=0){
        let obj = arr[idx]
        obj = {
            ...obj,
            ...req.body
        }
        arr[idx] = obj
        res.send({issuccessful:true, updateVal : obj})
    }else{
        res.send({issuccessful:false, msg : "pro not found"})
    }
})

app.delete('/deletePro', (req, res) => {
    let id = req.query.id;
    let idx = arr.findIndex((val) => (val.id == id));

    if (idx >= 0) { 
        let deletedObj = arr[idx]; 

        arr.splice(idx, 1);

        res.send({ issuccessful: true, msg: "pro Deletedd" }); 
    } else {
        res.send({ issuccessful: false, msg: "pro not found" }); 
    }
});

app.delete('/softDelete', (req, res) => {
    let id = req.query.id;
    let idx = arr.findIndex((val) => (val.id == id));

    if (idx >= 0 || isDeleted == false) { 
        arr[idx].isDeleted = true

        res.send({ issuccessful: true, deletedVal: arr[idx] }); 
    } else {
        res.send({ issuccessful: false, msg: "pro not found" }); 
    }
});

app.post('/errorHandling',()=>{
    {
        try {
            app.post('/createProd',(req,res)=>{
                // console.log(req.body)
                let obj = req.body
                obj.isDeleted = false
                id++
                obj.id = id
                
                if(obj.name && obj.cost && obj.cat)
                {
                    if(arr.find((val)=>{
                        return val.name == obj.name
                    })){
                        res.send({issuccessful : false, message : 'Already Exist'})
                    }
                    arr.push(obj)
                    res.send({issuccessful : true, product : obj})
                }else{
                    res.send({issuccessful : false, message : 'Invalid'})
                }
            })
                        
        } catch (err) {
            res.status(500).send({ issuccessful: false, msg: err });
        }
    }
})

app.get('/all',(req,res)=>{

    let ans = arr.filter((val)=>{
        return val.isDeleted==false
    })
    // res.send({product:arr})
    res.send({ans})
})

app.listen(process.env.PORT,()=>{
    console.log('Port started on 8000')
})