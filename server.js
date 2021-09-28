'use strict';
const express = require('express');
const electron = require('electron');
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


//lectura de hojas
let hojas=["Hoja1","Personal"]
let archivos=[]
//encriptacion 
const crypto= require('crypto')
const algoritm='aes-256-ctr';
let key=crypto.createHash('sha256').update(String('MySecretKey')).digest('base64').substring(0,32)
const configDir =  (electron.app || electron.remote.app).getPath('userData');
//local storage y lectura de xlsx
const XLSX=require('xlsx')
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage(`${configDir}/scratch`);

const encrypt= (buffer)=>{
    const iv=crypto.randomBytes(16)
    const cipher=crypto.createCipheriv(algoritm,key,iv)
    const result=Buffer.concat([iv,cipher.update(buffer),cipher.final()])
    FileSystem.writeFile(`${configDir}/${localStorage.getItem('fileName')}`,result,(err,file)=>{
        if (err) return console.error(err.message)
        if (file) {
            console.log('archivo encriptado');
        }
    })
    return result
}

const decrypt= () =>{
    var file =FileSystem.readFileSync(`${configDir}/${localStorage.getItem('fileName')}`)
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
        localStorage.setItem('fileName', req.body.name)
        FileSystem.copyFile(req.body.file, `${configDir}/${req.body.name}`, (err) => {
            if (err) throw err;
        });
        res.send(true)
    } catch (error) {
        console.log(error);
        res.send(false)
    }
});
//subida del excel
app.post('/files', async(req, res) => {
    try {
        const excel=XLSX.readFile(req.body.file)
        var nombreHoja=excel.SheetNames;
        let arrayOfArrays=[]
        for (let i = 0; i < nombreHoja.length; i++) {
            let datos= XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[i]])
            arrayOfArrays.push(datos)            
        }
        encrypt(JSON.stringify(arrayOfArrays))
        res.send(true)
    } catch (error) {
        console.log(error);
        res.send(false)
    }
});
//descarga del servidor
app.get('/download', (req,res)=>{
    try {
        if (localStorage.getItem('fileName')!=null && FileSystem.existsSync(`${configDir}/${localStorage.getItem('fileName')}`)) {
            res.download(`${configDir}/${localStorage.getItem('fileName')}`);
        }else{
            res.send(false)
        }
    } catch (error) {
        console.log(error);
        res.send(false)
    }
})
app.get('/download/name', (req,res)=>{
    try {
        res.send(localStorage.getItem('fileName'));
    } catch (error) {
        console.log(error);
        res.send('server.encrypted')
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
        XLSX.writeFile(workBook,`${configDir}/datos.xlsx`)
        if(archivos.indexOf(`datos.xlsx`) === -1){
            archivos.push(`datos.xlsx`)
        }
        res.download(`${configDir}/datos.xlsx`);
        // res.send(`datos.xlsx`)
        
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
        XLSX.writeFile(workBook,`${configDir}/filtrado.xlsx`)
        if(archivos.indexOf(`filtrado.xlsx`) === -1){
            archivos.push(`filtrado.xlsx`)
        }
        res.download(`${configDir}/filtrado.xlsx`);
    } catch (error) {
        console.log(error);
        res.send(false)
    }
});

if (true){
    console.log("prendido");
}
else{
    server.listen(3000, () => {
        console.log('listening on *:3000');
    });
}



export{
    archivos,
    server
}