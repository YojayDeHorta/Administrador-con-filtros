'use strict';
const express = require('express');
const app = express();
app.use(express.json())

var cors=require('cors')
app.use(cors())

const http = require('http');
const server = http.createServer(app);

let direccion = null;
let archivo=null
let archivos=[]
const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;
const FileSystem = require("fs");
const { send } = require('process');

app.get('/api/usuarios', async(req, res) => {
    try {
        if (direccion!==null) {
            CSVToJSON().fromFile(direccion).then(source => {  
                res.send(source) 
            });
            
        }else{
            res.send([])
        }
    } catch (error) {
        console.log(error);
    }
});

app.post('/api/usuarios', (req,res)=>{
    try {
        console.log(req.body);
        var csv = JSONToCSV(req.body, { fields: ["Id", "Nombre", "Apellido", "Fecha" ]});
        FileSystem.writeFileSync(direccion, csv);
        res.send(archivo)
    } catch (error) {
        console.log(error);
        res.send(false)
    }
})

//confirmacion del admin
app.post('/api/admin', (req,res)=>{
    try {
        if (req.body.user=='admin'&&req.body.pass=='admin') {
            res.send(true)
        }else{
            res.send(false)
        }

    } catch (error) {
        console.log(error);
        res.send(false)
    }
})

//subida del archivo
app.post('/file', async(req, res) => {
    try {
        console.log(req.body);
        FileSystem.copyFile(req.body.file,`${__static}/${req.body.name}`, (err) => {
            if (err) throw err;
            direccion=`${__static}/${req.body.name}`
            archivo=req.body.name
            archivos.push(archivo)
            console.log(archivos);
            res.send(true)
        });
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }
});
server.listen(3000, () => {
  console.log('listening on *:3000');
});
export{
    archivos
}