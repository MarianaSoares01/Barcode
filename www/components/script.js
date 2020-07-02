// JAVASCRIPT //

$(document).on("click", "#codigo", function(){
  cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("Temos um código de barras\n\n" +
                "Valor do produto: " + parseFloat(result.text) + "\n" +
                "Formato do código: " + result.format + "\n" +
                "Cancelado: " + result.cancelled);
    
          var lista = document.getElementById('lista_compras'); // lista onde irá aparecer os valores de cada produto adicionado  
          var valor = parseFloat(result.text); // valor do produto adicionado (qr_code ou code_39 somente com o valor do produto)
          var ol = document.createElement('ol'); // variável para criar lista ordenada
          var p = document.createElement('p'); // variável para criar tag p "<p>"
                  
          p.innerHTML = parseFloat(valor); // adiciona o valor do código de barras na tag p

          ol.setAttribute('onclick', 'remove(this)'); // atribui uma função onclick de nome "remove" para cada valor (ao clicar, remove o valor)
          ol.setAttribute('value', parseFloat(valor)); // atribui um value com o valor do produto para ser capturado quando clicado
                  
          ol.appendChild(p); // cria a tag p dentro da lista ordenada 
          lista.appendChild(ol); // coloca a lista ordenada dentro da div de id "lista_compras"
                
          var p1 = document.getElementsByTagName('p')[1]; // retorna o segundo elemento "p" existente

          if(p1 == null){ // se o segundo elemento "p" não existir, faça: 
            var total =  parseFloat(document.getElementsByTagName('p')[0].innerHTML); // atribua o valor do primeiro elemento "p" à variável "total"
            document.getElementById('valor_total').innerHTML =  parseFloat(total); // atribua e mostre o valor de total na div de id "valor_total"
          } else if(p1 != null){ // senão, se o segundo elemento "p" existir, faça: 
            var pdt = document.getElementById('valor_total').innerHTML; // atribua o valor da div de id "valor_total" na variável "pdt"
            var pdtTotal = parseFloat(pdt); // converta esse valor em um valor do tipo Float
            var total = pdtTotal + valor; // some o valor do valor_total com o valor recém-adicionado
            document.getElementById('valor_total').innerHTML =  parseFloat(total.toFixed(2)); // mostre, então, esse novo valor na div de id "valor_total"
          }
      },
      function (error) {
          alert("Falha na verificação: " + error);
      },
      {
          preferFrontCamera : false, // preferência da câmera frontal (falso)
          showFlipCameraButton : true, // botão para mudar a câmera frontal/traseira (verdadeiro)
          showTorchButton : true, // botão para ligar a lanterna/flash (verdadeiro)
          torchOn: false, // lanterna/flash liga automaticamente (falso)
          saveHistory: true, // salvar no histórico (verdadeiro)
          prompt : "Coloque o código de barras dentro da área de scan", // exibe a mensagem enquanto o usuário estiver na tela de scan
          resultDisplayDuration: 500, // tempo que o resultado do código aparecerá na tela
          formats : "QR_CODE,CODE_39", // formatos de leitura de códigos suportados (QR_CODE e CODE_39)
          orientation : "landscape", // orientação do smartphone para realizar a leitura do código (panorama)
          disableAnimations : true, // desabilitar animações (verdadeiro)
          disableSuccessBeep: false // desabilitar "beep" após a leitura do código (verdadeiro)
      }
   )
});

function remove(produto){ // função para remover o valor
  var valor = produto.getAttribute('value'); // pegue o "value" do valor clicado
  var pdt = document.getElementById('valor_total').innerHTML; // pegue o conteúdo da div de id "valor_total"
  var pdtTotal = parseFloat(pdt); // converta esse valor em um valor do tipo Float
  var total = pdtTotal - valor; // subtraia o valor do valor_total com o valor recém-clicado
  document.getElementById('valor_total').innerHTML = parseFloat(total.toFixed(2)); // mostre, então, esse novo valor na div de id "valor_total"

  produto.remove(); // remova o valor clicado
}