
//usando o search é possível extrair apenas o valor passa domo parâmetro no href
var nivel = window.location.search
nivel = nivel.replace('?', '')

var criacao = setInterval(function () {
    posicaoRamdom()
}, nivel*1000)


//para poder usar as variaveis de altura e largura no escopo global elas não podem ser declaradas dentro de funções 
var altura = 0
var largura = 0

function tamanhoDaTela() {
    //o inner devolve as medidas da tela não em seu total mais sim, as medidas atuais
    altura = window.innerHeight
    largura = window.innerWidth
}

tamanhoDaTela()

//cronometro criado
var tempo = 10
document.getElementById('contador').innerHTML = tempo
var cronometro = setInterval(function(){
    tempo--

    //setando para quando o tempo for menor que 0 o usuário ser levado a tela de vitoria  
    if (tempo < 0) {
      clearInterval(cronometro)
      clearInterval(criacao)
      window.location.href='game_win.html?'+nivel
    }
    else{
    document.getElementById('contador').innerHTML = tempo
    }

},1000)
//o innerHTML é o valor contido entra as tags
 


//a variável que indica o coração no Id tem de estar fora da função para não sofre um constante reajuste sendo iniciada
var numcoracao = 3
function posicaoRamdom() {

    //remover mosquito anterior (caso exista)
    //usando o getElement é possivel verificar se ele existe, se ele existir a condicional recebera true
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()
        
        document.getElementById('v' + numcoracao).src = 'imagens/coracao_vazio.png'
        --numcoracao
        
        if (numcoracao === 0) {
            window.location.href='game_over.html?'+nivel
        }
        
    }


    var positionX = Math.floor(Math.random() * largura) - 90
    var positionY = Math.floor(Math.random() * altura) - 90

    positionX = positionX < 0 ? 0 : positionX
    positionY = positionY < 0 ? 0 : positionY

    //criar elementos HTML
    var mosquitoIMG = document.createElement('img')

    //utilizando o '.' para acessar os atributos de um elemento é possível altera-los claro cada tag possui atributos próprios como o src em 'img' 
    mosquitoIMG.src = 'imagens/mosca.png'

    //usando o '.' é possível acessar a propriedade de style, usando o valor gerado nas variaveis position e concatenando elas com a strings 'px' de pixels é possível indicar o posicionamento de um objeto, que está na posição absoluta
    mosquitoIMG.style.position = 'absolute'
    mosquitoIMG.style.left = positionX + 'px'
    mosquitoIMG.style.top = positionY + 'px'

    //ao acessar a propriedade onclick é possível passar um função diretamente como parâmetro 
    mosquitoIMG.onclick = function () {
        //o this nesse contexto faz referencia ao objeto que chamou a função neste caso 'mosquito'
        this.remove()
    }

    //função para retornar o valor de 1 a 3 para definição da classe, e de 1 e 2 para identificar o lado
    var lado = ladoAleatório()
    var tamanho = tamanhoAleatório()
    mosquitoIMG.classList = 'mosquito' + tamanho + ' lado' + lado

    mosquitoIMG.id = 'mosquito'

    //adicionar um filho a um elemento utilizando DOM
    document.body.appendChild(mosquitoIMG)



}

function tamanhoAleatório() {
    var classe = Math.floor(Math.random() * 3) + 1
    return classe
}

function ladoAleatório() {
    var classe = Math.floor(Math.random() * 2) + 1
    return classe
}