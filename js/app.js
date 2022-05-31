/* 
============================
    VARIÁVEIS
============================
*/
/* buttons para selecionar a aba*/
const buttonState = document.querySelectorAll('.button')
const buttonCadastro = document.getElementById('sessao-cadastro')
const buttonListarUsuarios = document.getElementById('sessao-listar-usuarios')

/* button Cadastrar usuário */
const cadastrarUsuarioNoBanco = document.querySelector('#cadastrar-button')
/* button Atualizar usuário */
const atualizarUsuarioNoBanco = document.querySelector('#atualizar-button')
/* sections */
const cadastro = document.querySelector('.cadastro')
const listarDeUsuarios = document.querySelector('.lista-de-usuarios')

/* Inputs, verificação geral  */
const allInputs = document.querySelectorAll('input')

/* inputs especificos do cadastro*/
const seu_email = document.getElementById('seu_email')
const nome = document.getElementById('nome')
const email = document.getElementById('email')
const telefone = document.getElementById('telefone')
const rua = document.getElementById('rua')
const numero = document.getElementById('numero')
const complemento = document.getElementById('complemento')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')
const uf = document.getElementById('uf')
const cep = document.getElementById('cep')



let arrayData = {}



/* 
===================================
    EVENTOS PARA UMA LISTA DE ITENS
===================================
*/

/* 
Manipular cores dos botões cadastro e listar usuarios 
*/
buttonState.forEach( item => item.addEventListener('click', () => {

    buttonState.forEach( item => item.classList.remove('active' ))
        item.classList.toggle('active')
    })
)

/* Se o usuário não preencher após ter selecionado um campo input, exibir mensagem: 'Este campo é obrigatório' */
allInputs.forEach( item => {
    item.addEventListener('blur', () =>{
        const smallElementPhrase = document.querySelector('.' + item.id)

        if(item.value.length == 0 || item.value.length == '') {
            item.style.border = '1px solid red'
            smallElementPhrase.classList.remove('hidden')
        }
        else {
            item.style.border = '1px solid gray'
            smallElementPhrase.classList.add('hidden')
        }
    })
})

/*
    Evento disparado quando clicar em algum botão "Excluir" da tabela
*/
/* botões de excluir */
/* if(document.querySelectorAll('.excluir')){

    const allExcluir = document.querySelectorAll('.excluir')
    
    allExcluir.forEach( item => {
        item.addEventListener('click', () => {
            console.log(item)
        })
    })
}
 */

/* 
=================================
    EVENTOS PARA UM ÚNICO ITEM
=================================
*/

/* 
    Eventos para mostrar ou ocultar a div
*/
buttonCadastro.addEventListener('click', exibirTelaParaCadastrarUsuario)
buttonListarUsuarios.addEventListener('click', exibirListaDeUsuariosCadastrados)

/*
    Eventos disparados quando clicar no botão CADASTRAR ou ATUALIZAR  
*/
cadastrarUsuarioNoBanco.addEventListener('click', verificarValidarDados)
atualizarUsuarioNoBanco.addEventListener('click', verificarValidarDados)




/*
======================================================
    FUNÇÕES 
======================================================
*/

/* 
    Exibir div cadastro e ocultar div lista-de-usuarios 
*/
function exibirTelaParaCadastrarUsuario(){
    cadastro.classList.remove('hidden')
    listarDeUsuarios.classList.add('hidden')
}

/* 
    Exibir div lista-de-usuários e ocultar div cadastro 
*/
function exibirListaDeUsuariosCadastrados(){
    listarDeUsuarios.classList.remove('hidden')
    cadastro.classList.add('hidden')
}


/* 
    Função para verificar se existe algum input vazio
*/
function verificarValidarDados(){

    /* Validar dados dos inputs */
    allInputs.forEach( item => {

        const smallElementPhrase = document.querySelector('.' + item.id)
    
        if(!item.value.length == 0 || !item.value.length == '') {

            if(item.id == 'seu_email' || item.id == 'email'){

                const emailTypeRegEx = /[A-z0-9]+[@][A-z]+[.][a-z]/

                if(emailTypeRegEx.test(item.value)) {
                    arrayData[item.id] = item.value 
                    item.style.border = '1px solid gray'
                    smallElementPhrase.classList.add('hidden')
                }
                else {
                    item.style.border = '1px solid red'
                    smallElementPhrase.innerText = "Verifique se o email foi digitado corretamente."
                    smallElementPhrase.classList.remove('hidden') 
                    return ;
                }
            }

            if(item.id == 'nome' || item.id == 'rua' || item.id == 'complemento' || item.id == 'bairro'){

                const nameTypeRegEx = /[0-9]+/

                if(!nameTypeRegEx.test(item.value)) {
                    arrayData[item.id] = item.value 
                    item.style.border = '1px solid gray'
                    smallElementPhrase.classList.add('hidden') 
                }
                else {
                    item.style.border = '1px solid red'
                    smallElementPhrase.innerText = "Digite somente letras."
                    smallElementPhrase.classList.remove('hidden') 
                    return ;
                }
            }

            if(item.id == 'telefone'){

                const TelefoneTypeRegEx = /[0-9]+/

                if(TelefoneTypeRegEx.test(item.value) && ( item.value.length == 11 || item.value.length == 10)) {
                    
                    const splitCellNumber = (item.value).split('')

                    if(item.value.length == 11 && splitCellNumber[2] == 9){
                        arrayData[item.id] = item.value 
                        item.style.border = '1px solid gray'
                        smallElementPhrase.classList.add('hidden')
                    }
                    else if(item.value.length == 11 && splitCellNumber[2] !== 9) {
                        item.style.border = '1px solid red'
                        smallElementPhrase.innerText = "O terceiro digito deve ser um 9." 
                        smallElementPhrase.classList.remove('hidden')
                    }
                    else {
                        arrayData[item.id] = item.value 
                        item.style.border = '1px solid gray'
                        smallElementPhrase.classList.add('hidden')

                    }
                    
                }
                else {
                    item.style.border = '1px solid red'
                    smallElementPhrase.innerText = "A quantidade de números está incorreta." 
                    smallElementPhrase.classList.remove('hidden')
                    return ; 
                }
            }

            if(item.id == 'numero'){

                const numeroTypeRegEx = /[0-9]+/

                if(numeroTypeRegEx.test(item.value) &&  item.value > 0) {
                    arrayData[item.id] = item.value 
                    item.style.border = '1px solid gray'
                    smallElementPhrase.classList.add('hidden')
                }
                else {
                    item.style.border = '1px solid red'
                    smallElementPhrase.innerText = "Digite apenas números." 
                    smallElementPhrase.classList.remove('hidden') 
                }
            }

            if(item.id == 'cep'){

                const cepTypeRegEx = /[0-9]{5}[-][0-9]{2}/
                
                if(cepTypeRegEx.test(item.value) && item.value.length == 9) {
                    arrayData[item.id] = item.value 
                    item.style.border = '1px solid gray'
                    smallElementPhrase.classList.add('hidden')  
                }
                else {
                    item.style.border = '1px solid red'
                    smallElementPhrase.innerHTML = "Digite nesse formato: 00000-000" 
                    smallElementPhrase.classList.remove('hidden') 
                }
            }

            if(item.id == 'cidade'){

                const cidadeTypeRegEx = /[A-z]+/

                if(cidadeTypeRegEx.test(item.value)) {
                    arrayData[item.id] = item.value 
                    item.style.border = '1px solid gray'
                    smallElementPhrase.classList.add('hidden') 
                }
                else {
                    item.style.border = '1px solid red'
                    smallElementPhrase.innerText = "Digite somente letras."
                    smallElementPhrase.classList.remove('hidden') 
                }
            }

            if(item.id == 'uf'){

                const ufTypeRegEx = /^[a-zA-z]{2}$/
                const arrayStatesBrasil = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

                if(arrayStatesBrasil.includes((item.value).toUpperCase())){

                    if(ufTypeRegEx.test(item.value)) {
                        arrayData[item.id] = item.value 
                        item.style.border = '1px solid gray'
                        smallElementPhrase.classList.add('hidden') 
                    }
                }
                else {
                    item.style.border = '1px solid red'
                    smallElementPhrase.innerText = "UF do estado inválido."
                    smallElementPhrase.classList.remove('hidden') 
                }
            }

            
        }
        else {
            item.style.border = '1px solid red'
            smallElementPhrase.classList.remove('hidden') 
        }
    })

    /* verificar se o arrayData contem todos os dados do formulário e se houver, enviar os dados para a API */
         const countObjectLength = () => {

            let countPosition = 0
            for (let data in  arrayData) {
                countPosition++
            }   
            return countPosition
         }
         const objectLength = countObjectLength()

         if(allInputs.length == objectLength){

            const atualizar = atualizarUsuarioNoBanco.getAttribute('class')
            const cadastrar = cadastrarUsuarioNoBanco.getAttribute('class')

            if(!cadastrar.includes('hidden') && atualizar.includes('hidden')){
                /* Estou em um cadastro, chamar função enviarDadosParaAPI(). método POST */
                enviarDadosParaAPI ()      
            }else {
                /* Estou numa atualização, chamar função atualizarUsuarioNaAPI(). método PUT */
                atualizarUsuarioNaAPI()
            }
         }
}


/* 
    Função para CADASTRAR os usuários no banco de dados  
*/
 async function  enviarDadosParaAPI () {

    const nomeUsuario = document.getElementById('nome').value

    const usuarioFoiCadastrado = document.querySelector('.usuario-foi-cadastrado')
    
    const allModalCadastradoSucesso = document.querySelectorAll('.modal-cadastrado-sucesso')
    usuarioFoiCadastrado.innerHTML = `<b>${nomeUsuario}</b>`


    try {
        fetch("https://estagio.eficazmarketing.com/api/user",
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(arrayData)
        })
        .then(response =>  exibirAllModalCadastradoSucesso() )
    } catch (error) {
        console.log(error)
    }

    function exibirAllModalCadastradoSucesso(){
        allModalCadastradoSucesso.forEach( item => item.classList.remove('hidden'))

        setTimeout(()=> {
            allModalCadastradoSucesso.forEach( item => item.classList.remove('hidden'))
            location.reload()
        }, 3000)
    }

}


/* 
    Função para ATUALIZAR um único usuário no banco de dados  
*/
 async function  atualizarUsuarioNaAPI () {

    
    const id = verificarIdNaUrl()
    const nomeUsuario = document.getElementById('nome').value

    const usuarioFoiAtualizado = document.querySelector('.usuario-foi-atualizado')
    
    
    const allModalAtualizadoSucesso = document.querySelectorAll('.modal-atualizado-sucesso')

    usuarioFoiAtualizado.innerHTML = `<b>${nomeUsuario}</b>`
    

    try {
        fetch(`https://estagio.eficazmarketing.com/api/user/${id}`,
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }, 
            method: "PUT",
            body: JSON.stringify(arrayData)
        })
        .then(response =>  exibirAllModalDeleteSucesso() )
    } catch (error) {
        console.log(error)
    } 

   

    function exibirAllModalDeleteSucesso(){
        allModalAtualizadoSucesso.forEach( item => item.classList.remove('hidden'))

        setTimeout(()=> {
            allModalAtualizadoSucesso.forEach( item => item.classList.remove('hidden'))
            location.reload()
        }, 3000)
    }

}




/* 
    Função para pegar os usuários da API e inserir na tabela 
*/
 async function  busqueUsuariosNaAPI () {

    try {
        const response =  await fetch("https://estagio.eficazmarketing.com/api/user")
        const responseJson = await response.json()

        const tabelaDeUsuarios = document.querySelector('.tabela-de-usuários')



        tabelaDeUsuarios.innerHTML = 
        `<thead>
            <tr class="tabela-de-usuários-header">
                <th>Nome</th>
                <th>E-mail</th>
                <th>Endereço<br>completo</th>
                <th>Telefone</th>
                <th>Ação</th>
            </tr>
        </thead>
        `
        responseJson.forEach ( data => {
       
            tabelaDeUsuarios.innerHTML +=
            `<tbody>
            <tr class="tabela-de-usuários-body">
                <td>${data.nome}</td>
                <td>${data.email}</td>
                <td>
                    <span><span>${data.rua}</span> , <span>${data.numero}</span><br> <span>${data.complemento}</span></span><br>
                    <span>${data.cep}</span> <br>
                    <span> ${data.cidade}</span>- <span>${(data.uf).toUpperCase()}</span> 
                </td>
                <td>11922223333</td>
                <td class="tabela-de-usuários-body-action">
                    <a href="#http://127.0.0.1:5500/index.html/${data.id}" class="alterar" target="_blank">Alterar</a>
                    <a href="#" class="excluir" data-nome="${data.nome}" id="${data.id}" onclick="deletarUsuario(${data.id})">Excluir</a>
                </td>
            </tr>
            </tbody>
            `
        })
        
        
    } catch (error) {
        console.log(error)
    }

}



/* função para verificar se existe um id no fim url */
function verificarIdNaUrl() {
    const urlAddress = window.location.href
    
    const idTypeRegex = /[0-9]+$/
    let id 
    if(idTypeRegex.test(urlAddress)){
        cadastrarUsuarioNoBanco.classList.add('hidden')
        atualizarUsuarioNoBanco.classList.remove('hidden')

        const buttonListarUsuarios = document.getElementById('sessao-listar-usuarios')
        buttonListarUsuarios.style.display = 'none'
        const cadastroFrase = document.querySelector('.cadastro-frase')
        cadastroFrase.innerHTML = 'Atualizar'
        id = pegueUsuarioPassadoNaUrl(urlAddress)
        
    }

    return id
}

function pegueUsuarioPassadoNaUrl(url){

    const splitURL = url.split('/')
    const id = splitURL[splitURL.length - 1]
    
    fetchAPI(id)
    return id
}

async function fetchAPI(userId) {
    try {
        const response =  await fetch(`https://estagio.eficazmarketing.com/api/user/${userId}`)
        const responseJson = await response.json()

        allInputs.forEach( item => {
            if(document.querySelector('#' + item.id)) {
                document.querySelector('#' + item.id).value = responseJson[item.id]
            }
        })

    } catch (error) {
        
    }
}


function deletarUsuario(id) {

    const elementoSelect = document.getElementById(`${id}`)
    const nomeUsuario = elementoSelect.getAttribute('data-nome')

    
    const allModalConfirmarDelete = document.querySelectorAll('.modal-confirmar-delete')
    const allModalDeleteSucesso = document.querySelectorAll('.modal-deletado-sucesso')

    const naoExcluirUsuario = document.querySelector('.nao-excluir-usuario')
    const excluirUsuario = document.querySelector('.excluir-usuario')
    const usuarioAserRemovido = document.querySelector('.usuario-a-ser-removido')
    const usuarioFoiRemovido = document.querySelector('.usuario-foi-removido')
    
    usuarioAserRemovido.innerHTML = `<b>${nomeUsuario}</b>`
    usuarioFoiRemovido.innerHTML = `<b>${nomeUsuario}</b>`


    allModalConfirmarDelete.forEach( item => item.classList.remove('hidden'))



    naoExcluirUsuario.addEventListener('click', esconderAllModalConfirmarDelete)


     excluirUsuario.addEventListener('click', () => {
        
            try {
                fetch(`https://estagio.eficazmarketing.com/api/user/${id}`,
                {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    }, 
                    method: "DELETE",
                })
                .then(response =>  {
                    esconderAllModalConfirmarDelete()
                    exibirAllModalDeleteSucesso()
                })
            } catch (error) {
                alert('Não conseguimos remover este usuário, tente novamente.')
            } 
         
    }) 

    function esconderAllModalConfirmarDelete(){
        allModalConfirmarDelete.forEach( item => item.classList.add('hidden'))
    }

    function exibirAllModalDeleteSucesso(){
        allModalDeleteSucesso.forEach( item => item.classList.remove('hidden'))

        setTimeout(()=> {
            allModalDeleteSucesso.forEach( item => item.classList.remove('hidden'))
            location.reload()
        }, 3000)
    }
    
}


verificarIdNaUrl()
busqueUsuariosNaAPI()








