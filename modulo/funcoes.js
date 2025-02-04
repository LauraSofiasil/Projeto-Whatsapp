/*********************************************************************************************************************************************************************************
 * Objetivo: Criar uma API para o projeto do Whatsapp que a equipe de Front-End ainda irá desenvolver.
 * Data: 28/01/2025
 * Autor: Laura
 * Versão: 1.0
 * ********************************************************************************************************************************************************************************/

const listaContatos = require('./contatos')

const getDadosPessoais = function(number){
    let contatos = listaContatos
    let numero = number
    let dados = {}
    let status = false
    
//    console.log(contatos)

    contatos.contatos['whats-users'].forEach(function(item){
        if(item.number == numero){
            status = true
            dados.id = item.id
            dados.account = item.account
            dados.number = item.number
            dados.created = item['created-since']
        } 
    })
    
    if(status = true){
        return dados
    }else{
        return status
    }
}

const getProfileUsuario = function(number){
    let contato = listaContatos
    let numero = number
    let dados = {}
    let status = false

    contato.contatos['whats-users'].forEach(function(item){
        if(item.number == numero){
            status = true
            dados.name = item.nickname
            dados.image = item['profile-image']
            dados.background = item.background
        }
    })

    if(status = true){
        return dados
    }else{
        return status
    }
}

const getDadosContatos = function(number){
    let numero = number
    let contato = listaContatos
    let array = []
    let status

    contato.contatos['whats-users'].forEach(function(item){
        contato = item.contacts
        if(item.number == numero){
            item.contacts.forEach(function(informacao){
                status = true
                let dados = {}
                dados.usuario = item.account
                dados.contato = informacao.name
                dados.imagem = informacao.image
                dados.descricao = informacao.description

                array.push(dados)
            })
            
        }
    })
    if(status = true){
        return array
    }else{
        return status
    }
}

const getConversas = function(number){
    let numero = number
    let contato = listaContatos
    let array = []
    let json = {}
    let status = false


    contato.contatos['whats-users'].forEach(function(itemC){
        contato = itemC.contacts
        if(itemC.number == numero){
        itemC.contacts.forEach(function(item){
            status = true
            let dados = {}
            dados.usuario = itemC.account
            dados.telefone = itemC.number
            dados.nome = item.name
            dados.descricao = item.description
            dados.image = item.image
            dados.conversa = item.messages

            array.push(dados)
            })
        }

    })

    json = array
    if(status = true){
        return json
    }else{
        return status
    }
}

const getContatoEspecifico = function(numeroUsuario, nomeContato){
    let usuario = Number(numeroUsuario)
    let contatinho = String(nomeContato).toUpperCase()
    let contato = listaContatos
    let array = []
    let itemC
    let status = false

    contato.contatos['whats-users'].forEach(function(itemCt){
        contato = itemCt.contacts
        if(Number(itemCt.number) == usuario){
            itemCt.contacts.forEach(function(item){
                itemC = item.name
                if(String(itemC).toUpperCase() == contatinho){
                    status = true
                    let dados = {}
                    dados.usuario = itemCt.account
                    dados.contato = item.name
                    dados.conversas = item.messages

                    array.push(dados)
                }
            })
        }
    })
    
    if(status = true){
        return array
    }else{
        return status
    }
}

const getPalavraChave = function(numero, nomeContato, palavraChave){
    let contato = listaContatos
    let usuario = Number(numero)
    let contatinho = String(nomeContato).toUpperCase()
    let palavra = String(palavraChave).toUpperCase()
    let itemC
    let itemMensagem
    let array = []
    let status = false

    contato.contatos['whats-users'].forEach(function(itemCt){
        contato = itemCt.contacts
        if(Number(itemCt.number) == usuario){
            itemCt.contacts.forEach(function(item){
                itemC = item.name
                if(String(itemC).toUpperCase() == contatinho){
                    item.messages.forEach(function(dados){
                        itemMensagem = dados.content
                        if(String(itemMensagem).toUpperCase().includes(palavra)){
                            status = true
                            let informacao = {}
                            informacao.usuario = itemCt.account
                            informacao.contato = item.name
                            informacao.conversa = itemMensagem
                           
                            array.push(informacao)
                        }
                    })
                }
            })
        }
    })

    if(status = true){
        return array
    }else{
        return status
    }
}

module.exports = {
    getDadosPessoais,
    getProfileUsuario,
    getDadosContatos,
    getConversas,
    getContatoEspecifico,
    getPalavraChave
}




//getPalavraChave('11987876567', 'Sarah Lee', 'ultimamente')
//getContatoEspecifico('11987876567', 'Sarah Lee')
//getConversas('11966578996') 
//getDadosContatos('11966578996') 
//getProfileUsuario('11966578996') 
//getDadosPessoais('11966578996') 