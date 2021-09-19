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
const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;
const FileSystem = require("fs");
const path = require('path');
const { send } = require('process');

var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage(`${__static}/scratch`);

app.get('/api/usuarios', async(req, res) => {
    try {
        console.log(localStorage.getItem('direccion'))
        direccion=localStorage.getItem('direccion')
        archivo=localStorage.getItem('file')
        if (direccion!=null) {
            if (FileSystem.existsSync(direccion)) {
                CSVToJSON().fromFile(direccion).then(source => {  
                    res.send(source) 
                });
            }else{
                res.send([])
            }
        }else{
            res.send([])
        }
    } catch (error) {
        console.log(error);
    }
});

app.post('/api/usuarios', (req,res)=>{
    try {
        console.log(direccion,archivo);
        var csv = JSONToCSV(req.body, { fields: ["Id", "Nombre", "Apellido", "TipoCliente","Direccion" ]});
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
            res.send(true)
            if (localStorage.getItem('direccion')!=null) {
                if (FileSystem.existsSync(localStorage.getItem('direccion'))) {
                    FileSystem.unlink(path.join(__static, localStorage.getItem('file')), err => {
                        if (err) throw err;
                    }); 
                }
            }
            localStorage.setItem('direccion', direccion)
            localStorage.setItem('file', archivo)
            // localStorage.setItem('myFirstKey', 'myFirstValue')
            
        });
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }
});
//borrado del archivo

server.listen(3000, () => {
  console.log('listening on *:3000');
});
export{
    // archivos
}