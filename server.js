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
const path = require('path');
const { send } = require('process');
//local storage y lectura de xlsx
const XLSX=require('xlsx')
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage(`${__static}/scratch`);
//lectura de hojas
let hojas=["Clientes","Personal"]
let archivo=null
app.get('/api/hojas/:idHoja', async(req, res) => {
    try {
        if (localStorage.getItem('servidor')!=null) {
            let usuarios=JSON.parse(localStorage.getItem('servidor'))[req.params.idHoja]
            res.send(usuarios) 
        }else{
            res.send([])
        }
    } catch (error) {
        console.log(error);
    }
});

app.post('/api/hojas/:idHoja', (req,res)=>{
    try {
        let servidor=JSON.parse(localStorage.getItem('servidor'))
        servidor[req.params.idHoja]=req.body
        localStorage.setItem('servidor', JSON.stringify(servidor))
        console.log(JSON.parse(localStorage.getItem('servidor')));
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

//subida del excel
app.post('/file', async(req, res) => {
    try {
        const excel=XLSX.readFile(req.body.file)
        var nombreHoja=excel.SheetNames;
        let arrayOfArrays=[]
        for (let i = 0; i < nombreHoja.length; i++) {
            let datos= XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[i]])
            arrayOfArrays.push(datos)            
        }
        localStorage.setItem('servidor', JSON.stringify(arrayOfArrays))
        localStorage.setItem('fileName', req.body.name)
        res.send(true)
    } catch (error) {
        console.log(error);
        res.send(false)
    }
});
//descarga del excel
app.get('/download', (req,res)=>{
    try {
        let servidor=JSON.parse(localStorage.getItem('servidor'))
        const workBook=XLSX.utils.book_new()
        for (let i = 0; i < servidor.length; i++) {
            const workSheet=XLSX.utils.json_to_sheet(servidor[i])
            XLSX.utils.book_append_sheet(workBook,workSheet,hojas[i])

        }   
        XLSX.write(workBook,{bookType:'xlsx',type:"buffer"})
        XLSX.write(workBook,{bookType:'xlsx',type:"binary"})
        if (localStorage.getItem('fileName')!=null) {
            XLSX.writeFile(workBook,`${__static}/${localStorage.getItem('fileName')}`)
            res.send(localStorage.getItem('fileName'))
        }else{
            XLSX.writeFile(workBook,`${__static}/datos.xlsx`)
            res.send(`datos.xlsx`)
        }
        
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
    // archivos
}