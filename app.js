/**
 * Simples simulador de uma lâmpada
 * @author Luiz Fernando
*/
// variavei de apoio logico
let chave = false // o interruptor inicia desligado
let lampada = true // a lâmpada está OK
// Pré carregamento do arquivo de áudi
let som = new Audio("sound/breaking-glass.mp3")

// lanterna (pré carregamento)
let stream, track // variavel de apoio
inicializarLanterna()

function quebrar() {
    if (lampada === true)
        document.getElementById('lamp').src = "img/broken.jpg"
    //reproduzindo um arquivo de áudio no JS
    //Passo 1: copiar o arquivo de áudio para o projeto
    // Passo 2: usar a classe Audio(biblioteca interna do JS)
    // Passo 3: pré carregar o arquivo fr áudio para sincronizar com a troca de imagem (Experência do Usuário)
    
    som.play()
    // apoio a lógica para o JS identificar a lâmpada quebrada
    lampada = false
}
function onoff() {
    if (chave === false) {
        // ligar a chave
        document.getElementById('interruptor').src = "img/swon.png"
        chave = true // O JS agora sabe que a chave está ligada
        //verificar se a lâmpada está intacta antes de acender
        if (lampada === true) {
            document.getElementById('lamp').src = "img/on.jpg"
        }
    } else {
        document.getElementById('interruptor').src = "img/swoff.png"
        chave = false
        //verificar se a lâmpada está intacta antes de apagar
        if (lampada === true) {
            document.getElementById('lamp').src = "img/off.jpg"
        }
    }
}

// Estudo de eventos relacionados a click do mouse (pressionado ou não pressionado) e telas touch
// Passo 1 - capturar os elementos do html (DOM)
const botao = document.getElementById('button')
const lampadaImg = document.getElementById('lamp')


// Passo 2 - manipular o evento mouse pressionado
//addEventListener ("escuta de eventos em tempo real")
//mousedown (mouse pressionado contantemente)
//mouseup (soltar o botao do mouse)

// pressione o botão do mouse e manter
botao.addEventListener('mousedown',(event) => {
    event.preventDefault() // ignorar o comportamento padrão
    //console.log("botão do mouse pressionado")
    //se a lâmpada
    if(lampada ===true && chave === false){
        lampadaImg.src = "img/on.jpg" // trocar a imagem
    }
})
botao.addEventListener('mouseup',(event) => {
    event.preventDefault() // ignorar o comportamento padrão
    //console.log("botão do mouse pressionado")
    //se a lâmpada
    if(lampada ===true && chave === false){
        lampadaImg.src = "img/off.jpg" // trocar a imagem
  }
})
//pressionar a tela touch e manter
botao.addEventListener('touchstart', (event) =>{
    //console.log("tela pressionado")
    if(lampada ===true && chave === false){
        lampadaImg.src = "img/on.jpg" // trocar a imagem
    }
})
// deixar de pressionar a tela touch
botao.addEventListener('touchend', (event) =>{
    //console.log("a tela não está sendo pressionada")
    if(lampada ===true && chave === false){
        lampadaImg.src = "img/off.jpg" // trocar a imagem
  }
})

//lanter (torch)....async (multi processamento) function (variavel)
async function inicializarLanterna(){
    //try-catch (tratamento de exceções)
    try {
        // Solicita acesso à câmera traseira sem exibir o vídeo
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        })
        
        // Obtém o track do vídeo para controlar a lanterna
        track = stream.getVideoTracks()[0]
        
        // Verifica se o dispositivo suporta o uso da lanterna
        const capabilities = track.getCapabilities()
        if (!capabilities.torch) {
            console.log("Lanterna não suportada no dispositivo.")
            return
        }
    } catch (error) {
        console.error(`Erro ao inicializar a lanterna: ${error}`)
    }
}

// Função para ligar a lanterna (torch)
async function ligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: true }] })
        } catch (error) {
            console.error(`Erro ao inicializar a lanterna: ${error}`)
        }
    }

}
 // Função para desligar a lanterna sem parar o stream
async function desligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: false }] })
        } catch (error) {
            console.error(`Erro ao inicializar a lanterna: ${error}`)
        }
    }
}