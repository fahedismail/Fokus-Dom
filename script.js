
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const descansoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botao = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const pausarComecarBt = document.querySelector('#start-pause span')
const iconPausar = document.querySelector('.app__card-primary-butto-icon')
const tempoTela = document.querySelector('#timer')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const audioTempoFinalizado = new Audio('/sons/beep.mp3')

let tempoDecorridoSegundo = 1500  //tempo de segundo para docorrer
let intervaloId = null        



musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})



// Criar atributo para alterar o fundo do HTML ao clicar o botao
focoBt.addEventListener('click', () => {   //chama o atributo focoBt e coloca o evento(addEvent) por meio de 'click' e associa o arrow funciotn para ocorrer quando clicado
    tempoDecorridoSegundo = 1500
    alterarContexto('foco') // setatribute é para alterar o elemento(data-contexto [no html]) , com a variavel foco
    focoBt.classList.add('active')
    mostrarTempo()
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoSegundo = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
    mostrarTempo()
})

descansoBt.addEventListener('click', () => {
    tempoDecorridoSegundo = 900
    alterarContexto('descanso-longo')
    descansoBt.classList.add('active')
    mostrarTempo()
})

function alterarContexto(contexto){ //cria uma funcao para ser mais limpo e facil 
    html.setAttribute('data-contexto', contexto) // o mesmo procedimento do focobt.addEventListener
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    botao.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    switch(contexto){  // modificar o texto
        case 'descanso-curto': 
        titulo.innerHTML =`Que tal dar uma respirada? <br>
        <strong class="app__title-strong">Faça uma pausa curta!</strong>`
        break;
        case 'descanso-longo': 
        titulo.innerHTML = `Hora de voltar à superfície.<br>                      
        <strong class="app__title-strong">Faça uma pausa longa.</strong>`  // o metodo do innerHTML é para alterar o texto  
                default: // sempre colocar default quando for o ultimo.
                    break;

        }
    }

const contagemRegressiva = () => {                         //funcao de contagem regressiva
    if(tempoDecorridoSegundo <= 1){
        audioTempoFinalizado.play()
        zerar()
    }
     tempoDecorridoSegundo -= 1                            // o tempo decorrido  - 1
     mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){ 
    if(intervaloId){
        audioPause.play()
        zerar()
        return
    }         
    iconPausar.setAttribute('src', '/imagens/pause.png')
    pausarComecarBt.textContent = 'Pausar'
    audioPlay.play()                               // funcao para iniciar ou Pausar automatico.
    intervaloId = setInterval(contagemRegressiva, 1000)      //paramentro intervalo ??
}

function zerar(){   
    iconPausar.setAttribute('src', '/imagens/play_arrow.png')
    pausarComecarBt.textContent = 'Começar'                            //funcao para zerar
    clearInterval(intervaloId)
    intervaloId=null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoSegundo * 1000)
    const tempoFormatado = tempo.toLocaleTimeString ('pt-Br', {minute: '2-digit' , second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`
    
}

mostrarTempo()