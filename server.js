'use strict';
const express = require('express');
const electron = require('electron');
const app = express();
// app.use(express.json())
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb', extended: true, parameterLimit: 200000}));

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
let key=crypto.createHash('sha256').update(String('YojayYandersons')).digest('base64').substring(0,32)
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


app.post('/api/hojas/gethoja', async(req, res) => {
    try {
        if (localStorage.getItem('fileName')!=null&&(req.body.token=='adminToken'||req.body.token=='secretariaToken'||req.body.token=='conserjeToken')) {
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

function verificarUsuario(token){
    if (user=='adminToken'||user=='secretariaToken'||user=='conserjeToken') return true
    else return false
}

//subida del servidor
app.post('/file', async(req, res) => {
    try {
        let nombre=req.body.name
        if(nombre.split('.').pop()=='encrypted'){
            localStorage.setItem('fileName', nombre)
            FileSystem.copyFile(req.body.file, `${configDir}/${nombre}`, (err) => {
                if (err) throw err;
            });
            res.send(true)
        }else if(nombre.split('.').pop()=='xlsx'){
            const excel=XLSX.readFile(req.body.file)
            var nombreHoja=excel.SheetNames;
            var hojita=excel.Sheets[nombreHoja[0]]
            // var prueba=XLSX.utils.sheet_to_json(hojita)
            var prueba=XLSX.utils.sheet_to_json(hojita, {defval:""})
            
            for (let i = 2; i < prueba.length+2; i++) {
                
                // console.log(hojita["AA"+i]);
                if(hojita["AD"+i] != null)hojita["AD"+i].v=hojita["AD"+i].w.replace(/\s/g, '').replace(/,/g, '')
                if(hojita["AC"+i] != null)hojita["AC"+i].v=hojita["AC"+i].w.replace(/\s/g, '').replace(/,/g, '')

                if(hojita["W"+i]!=null&&/^-?\d+$/.test(hojita["W"+i].v)){   
                    // console.log(new Date((hojita["W"+i].v-(25567 + 2))* 86400 * 1000 ).toISOString().split('T')[0])
                    hojita["W"+i].v=new Date((hojita["W"+i].v-(25567 + 2))* 86400 * 1000 ).toISOString().split('T')[0]
                }
                // if(hojita["X"+i]!=null&&/^-?\d+$/.test(hojita["X"+i].v)) hojita["X"+i].v=new Date((hojita["X"+i].v-(25567 + 2))* 86400 * 1000 ).toISOString().split('T')[0]   
                if(hojita["Y"+i]!=null&&/^-?\d+$/.test(hojita["Y"+i].v)) hojita["Y"+i].v=new Date((hojita["Y"+i].v-(25567 + 2))* 86400 * 1000 ).toISOString().split('T')[0]   
                // if(hojita["Z"+i]!=null&&/^-?\d+$/.test(hojita["Z"+i].v)) hojita["Z"+i].v=new Date((hojita["Z"+i].v-(25567 + 2))* 86400 * 1000 ).toISOString().split('T')[0]   
                if(hojita["AA"+i]!=null&&/^-?\d+$/.test(hojita["AA"+i].v)) hojita["AA"+i].v=new Date((hojita["AA"+i].v-(25567 + 2))* 86400 * 1000 ).toISOString().split('T')[0]   
                // if(hojita["AB"+i]!=null&&/^-?\d+$/.test(hojita["AB"+i].v)) hojita["AB"+i].v=new Date((hojita["AB"+i].v-(25567 + 2))* 86400 * 1000 ).toISOString().split('T')[0]
            

            }

            let arrayOfArrays=[]
            let datos= XLSX.utils.sheet_to_json(hojita, {defval:""})
            // console.log(datos);
            arrayOfArrays.push(datos)            
            localStorage.setItem('fileName', `${nombre.split('.')[0]}.encrypted`)
            encrypt(JSON.stringify(arrayOfArrays))
            res.send(true)
        }else res.send(false)
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
        if(localStorage.getItem('fileName')!=null)res.send(localStorage.getItem('fileName'));
        else res.send(false)
    } catch (error) {
        console.log(error);
        res.send(false)
    }
})
//descarga del excel
app.post('/download/excel', (req,res)=>{
    try {
        if ((req.body.token=='adminToken'||req.body.token=='secretariaToken'||req.body.token=='conserjeToken')) {
            let servidor=JSON.parse(decrypt())
            const workBook=XLSX.utils.book_new()
            let aux=servidor[0]
            if (req.body.token=='secretariaToken'||req.body.token=='conserjeToken') {
                aux = servidor[0].map(({CUOTAS, CUOTA_LICEO,FORMA_PAGO,JESED,OBSERVACIONES2, ...item}) => item)
            }
            
            
            const workSheet=XLSX.utils.json_to_sheet(aux)
            XLSX.utils.book_append_sheet(workBook,workSheet,hojas[0])
            XLSX.write(workBook,{bookType:'xlsx',type:"buffer"})
            XLSX.write(workBook,{bookType:'xlsx',type:"binary"})
            XLSX.writeFile(workBook,`${configDir}/datos.xlsx`)
            if(archivos.indexOf(`datos.xlsx`) === -1){
                archivos.push(`datos.xlsx`)
            }
            res.download(`${configDir}/datos.xlsx`);
            // res.send(`datos.xlsx`)
        }else{
            res.send(false)
        }
        
    } catch (error) {
        console.log(error);
        res.send(false)
    }
})
//descarga filtrada
app.post('/filter', async(req, res) => {
    try {
        
        if ((req.body[0].token=='adminToken'||req.body[0].token=='secretariaToken'||req.body[0].token=='conserjeToken')) {
            let aux=req.body[1]
            if (req.body[0].token=='secretariaToken'||req.body[0].token=='conserjeToken') {
                aux = req.body[1].map(({CUOTAS, CUOTA_LICEO,FORMA_PAGO,JESED,OBSERVACIONES2, ...item}) => item)
            }
            const workBook=XLSX.utils.book_new()
            const workSheet=XLSX.utils.json_to_sheet(aux)
            XLSX.utils.book_append_sheet(workBook,workSheet,hojas[0])
            XLSX.write(workBook,{bookType:'xlsx',type:"buffer"})
            XLSX.write(workBook,{bookType:'xlsx',type:"binary"})
            XLSX.writeFile(workBook,`${configDir}/filtrado.xlsx`)
            if(archivos.indexOf(`filtrado.xlsx`) === -1){
                archivos.push(`filtrado.xlsx`)
            }
            res.download(`${configDir}/filtrado.xlsx`);
        }else{
            res.send(false)
        }
    } catch (error) {
        console.log(error);
        res.send(false)
    }
});


//confirmacion de los roles
app.post('/login/users', (req,res)=>{
    try {
       
        if (req.body.user.toLowerCase()=='presidente'&&req.body.pass.toLowerCase()=='presidencia123') res.send({user:req.body.user,token:'adminToken',rol:'adminRol'})
        else if(req.body.user.toLowerCase()=='contable'&&req.body.pass.toLowerCase()=='contable123') res.send({user:req.body.user,token:'secretariaToken',rol:'secretariaRol'}) 
        else if(req.body.user.toLowerCase()=='normal'&&req.body.pass.toLowerCase()=='normal123') res.send({user:req.body.user,token:'conserjeToken',rol:'conserjeRol'}) 
        else res.send(false)
        
    }catch (error) {
        console.log(error);
        res.send(false)
    }
})
//ccambio de rol
app.post('/password/admin', (req,res)=>{
    try {
       
        if(req.body.token=='secretariaToken'&&req.body.pass.toLowerCase()=='descifrar')res.send('adminToken') 

        else res.send(false)
        
    }catch (error) {
        console.log(error);
        res.send(false)
    }
})
app.post('/password/secretaria', (req,res)=>{
    try {
        if(req.body.rol=='secretariaRol')res.send('secretariaToken')
        

        else res.send(false)
        
    }catch (error) {
        console.log(error);
        res.send(false)
    }
})
//ver si hay variable conocida
app.post('/validate', (req,res)=>{
    try {
        if(localStorage.getItem('vuelidify')!=null)res.send(true) 
        else res.send(false)
    }catch (error) {
        console.log(error);
        res.send(false)
    }
})
app.post('/validatebee', (req,res)=>{
    try {
        if(req.body.pass.toLowerCase()=='descifrar'){
            localStorage.setItem('vuelidify',0)
            localStorage.setItem('fileName', `archivo.encrypted`)
            let servidor = [[]]
            console.log(servidor[0]);
            encrypt(JSON.stringify(servidor))
            res.send(true) 
        }
        else res.send(false)
    }catch (error) {
        console.log(error);
        res.send(false)
    }
})
/*
server.listen(3000, () => {
    console.log('listening on *:3000');
});
*/

export{
    archivos,
    server
}