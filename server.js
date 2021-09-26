'use strict';
const express = require('express');
const app = express();
app.use(express.json())
//cors
var cors=require('cors')
app.use(cors())

const http = require('http');
const server = http.createServer(app);
//dependencias
const FileSystem = require("fs");
const fsPromises = FileSystem.promises;

const path = require('path');
const { send } = require('process');
//local storage y lectura de xlsx
const XLSX=require('xlsx')
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage(`${__static}/scratch`);
//lectura de hojas
let hojas=["Hoja1","Personal"]
let archivos=[]
//encriptacion 
const crypto= require('crypto')
const algoritm='aes-256-ctr';
let key=crypto.createHash('sha256').update(String('MySecretKey')).digest('base64').substring(0,32)

const encrypt= (buffer)=>{
    const iv=crypto.randomBytes(16)
    const cipher=crypto.createCipheriv(algoritm,key,iv)
    const result=Buffer.concat([iv,cipher.update(buffer),cipher.final()])
    FileSystem.writeFile(`${__static}/${localStorage.getItem('fileName')}`,result,(err,file)=>{
        if (err) return console.error(err.message)
        if (file) {
            console.log('archivo encriptado');
        }
    })
    return result
}

const decrypt= () =>{
    var file =FileSystem.readFileSync(`${__static}/${localStorage.getItem('fileName')}`)
    // console.log('result read: ' + file);
    const iv= file.slice(0,16)
    file= file.slice(16)
    const deciphter =crypto.createDecipheriv(algoritm,key,iv)
    const result= Buffer.concat([deciphter.update(file),deciphter.final()])
    // console.log(result.toString());
    return result.toString()
}


app.get('/api/hojas/:idHoja', async(req, res) => {
    try {
        if (localStorage.getItem('fileName')!=null) {
            let servidor=JSON.parse(decrypt())
            res.send(servidor[0]) 
        }else{
            res.send([])
        }
    } catch (error) {
        console.log(error);
    }
});

app.post('/api/hojas/:idHoja', (req,res)=>{
    try {
        let servidor=JSON.parse(decrypt())
        servidor[req.params.idHoja]=req.body
        encrypt(JSON.stringify(servidor))
        res.send(true)
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

//subida del servidor
app.post('/file', async(req, res) => {
    try {
        FileSystem.copyFile(req.body.file, `${__static}/${req.body.name}`, (err) => {
            if (err) throw err;
            localStorage.setItem('fileName', req.body.name)
        });
        res.send(true)
    } catch (error) {
        console.log(error);
        res.send(false)
    }
});
//descarga del servidor
app.get('/download', (req,res)=>{
    try {
        console.log(localStorage.getItem('fileName')!=null, FileSystem.existsSync(`${__static}/${localStorage.getItem('fileName')}`))
        if (localStorage.getItem('fileName')!=null && FileSystem.existsSync(`${__static}/${localStorage.getItem('fileName')}`)) {
            res.send(localStorage.getItem('fileName'))
        }else{
            res.send(false)
        }
    } catch (error) {
        console.log(error);
        res.send(false)
    }
})
//descarga del excel
app.get('/download/excel', (req,res)=>{
    try {
        let servidor=JSON.parse(decrypt())
        const workBook=XLSX.utils.book_new()
        for (let i = 0; i < servidor.length; i++) {
            const workSheet=XLSX.utils.json_to_sheet(servidor[i])
            XLSX.utils.book_append_sheet(workBook,workSheet,hojas[i])
        }   
        XLSX.write(workBook,{bookType:'xlsx',type:"buffer"})
        XLSX.write(workBook,{bookType:'xlsx',type:"binary"})
        XLSX.writeFile(workBook,`${__static}/datos.xlsx`)
        console.log(archivos.indexOf(`datos.xlsx`));
        if(archivos.indexOf(`datos.xlsx`) === -1){
            archivos.push(`datos.xlsx`)
        }
        console.log(archivos);
        res.send(`datos.xlsx`)
        
    } catch (error) {
        console.log(error);
        res.send(false)
    }
})
//descarga filtrada
app.post('/filter', async(req, res) => {
    try {
        const workBook=XLSX.utils.book_new()
        const workSheet=XLSX.utils.json_to_sheet(req.body)
        XLSX.utils.book_append_sheet(workBook,workSheet,hojas[0])
        XLSX.write(workBook,{bookType:'xlsx',type:"buffer"})
        XLSX.write(workBook,{bookType:'xlsx',type:"binary"})
        XLSX.writeFile(workBook,`${__static}/datos.xlsx`)
        res.send(`datos.xlsx`)
    } catch (error) {
        console.log(error);
        res.send(false)
    }
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
export{
    archivos
}