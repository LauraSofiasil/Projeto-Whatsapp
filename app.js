/*********************************************************************************************************************************************************************************
 * Objetivo: API para retornar dados de um Whatsapp
 * Data: 04/02/2025
 * Autor: Laura
 * Versão: 1.0
 * ********************************************************************************************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const whatsapp = require('./modulo/funcoes.js')

app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET')

    app.use(cors())

    next()
})

//EndPoint para retornar os dados pessoais do usuário
app.get('/v1/whatsapp/pessoais/:number', cors(), async function(request, response){

    let telefone = request.params.number

    let dados = whatsapp.getDadosPessoais(telefone)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um usuário'})
    }
})

//EndPoint para retornar os dados profile do usuário
app.get('/v1/whatsapp/dadosprofile/:number', cors(), async function(request, response){

    let telefone = request.params.number

    let dados = whatsapp.getProfileUsuario(telefone)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado um usuário'})
    }
})

//EndPoint para retornar os dados dos contatos do usuário
app.get('/v1/whatsapp/contatos/:number', cors(), async function(request, response){

    let telefone = request.params.number

    let dados = whatsapp.getDadosContatos(telefone)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado nenhum contato para este usuário'})
    }
})

//EndPoint para retornar as conversas de todos os contatos do usuário
app.get('/v1/whatsapp/coversas/:number', cors(), async function(request, response){

    let telefone = request.params.number

    let dados = whatsapp.getConversas(telefone)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado nenhum contato para este usuário'})
    }
})

//EndPoint para retornar as conversas de um contato específico do usuário
app.get('/v1/whatsapp/contatoespecifico/filtro', cors(), async function(request, response){

    let telefone = request.query.number

    let nome = request.query.name

    let dados = whatsapp.getContatoEspecifico(telefone, nome)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado nenhuma conversa com esse contato'})
    }
})

//EndPoint para retornar umas conversa específica de um contato específico do usuário
app.get('/v1/whatsapp/palavrachave/filtro', cors(), async function(request, response){

    let telefone = request.query.number
    let contato = request.query.name
    let palavra = request.query.message

    let dados = whatsapp.getPalavraChave(telefone, contato, palavra)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi encontrado nenhuma conversa com essa palavra'})
    }
})




app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')
})