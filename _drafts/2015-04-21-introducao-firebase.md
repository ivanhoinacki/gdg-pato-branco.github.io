---
layout: post
title: Introdução ao Firebase
---

### A Empresa
A empresa Firebase foi fundada em 2011 por Andrew Lee e James Tamplin. Ela está localizada na cidade de São Francisco na Califórnia. Em outubro de 2014, a empresa foi comprada pelo Google.

### O que é?
O Firebase é um [BaaS](http://en.wikipedia.org/wiki/Mobile_Backend_as_a_service) (backend as a service) que oferece diversos serviços para facilitar o desenvolvimento de aplicações  no lado do servidor. Com integração a várias plataformas como Angular, Java Script, Node.js, Android e IOS, o Firebase ajuda desenvolvedores a focar no desenvolvimento frontend mobile e web.

O coração do Firebase é um banco de dados NoSQL real time que armazena os dados na nuvem. A manipulação dos dados do banco é feita através de uma API REST, mas todas as chamadas podem ser feitas através das bibliotecas específicas de cada linguagem, o que facilita bastante a utilização. 

### Porque usar?
- Reduz a complexidade ou até elimina a necessidade de desenvolver uma aplicação server side específica.
- Tempo de resposta baixíssimo, o que torna o Firebase ideal para aplicações real time como chats e jogos multiplayers.
- Crescimento progressivo da aplicação. A partir do plano Candle (o plano free não escolona), a sua aplicação poderá receber a quantidade de tráfego de dados e de usuários que for necessária. Independente dos limites do plano, a sua aplicação irá escalonar para atender a demanda . Será cobrado um valor extra é claro, mas pelo menos a sua aplicação poderá crescer forever ;).

### Como Funciona?
A raiz do Firebase nada mais é que um objeto JSON. A partir desse objeto, é possível criar campos numéricos, alfanuméricos, ou objetos que podem conter outros objetos.

Agora imagine o seguinte objeto JSON inserido no banco:

``` JSON
"lutadores": {
	"blanka": {
		"magia":"Electric Thunder"
	},
	"ryu": {
		"magia":"Hadouken"
	},
	"sagat": {
		"magia":"Tiger Uppercut"
	}
}
```
O Firebase transforma automaticamente cada propriedade do objeto JSON em um "resource" que poderá ser acessível através da API REST. Na prática, para cada propriedade será criada uma nova URL. O JSON acima foi criado no endereço https://gdg-street-fighter.firebaseio.com. Então, acesse as seguintes URLs no seu navegador e veja os resultados:

**Objeto JSON raiz**

https://gdg-street-fighter.firebaseio.com/.json

**Objeto lutadores**

https://gdg-street-fighter.firebaseio.com/lutadores.json

**Objeto Blanka**

https://gdg-street-fighter.firebaseio.com/lutadores/blanka.json

**Valor da propriedade magia do objeto Blanka**

https://gdg-street-fighter.firebaseio.com/lutadores/blanka/magia.json

...

Para aqueles que utilizam o Linux, também é possível acessar os dados através do curl:
``` 
curl https://gdg-street-fighter.firebaseio.com/lutadores/blanka/magia.json
```

### Na prática

Para esse exemplo, utilizaremos a biblioteca para JavaScript.

**1º Passo**

Crie uma conta no [Firebase](https://www.firebase.com/).


**2º Passo**

Crie um banco de dados informando o nome do aplicativo (qualquer nome). Por padrão o nome da aplicação será o mesmo nome dado para o banco. Para dar outro nome ao banco de dados, altere o campo APP URL.

**3º Passo**

Crie um documento html e adicione a biblioteca do firebase:
``` HTML
<html>
	<head>
	    <script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
	</head>
	<body>
	</body>
</html>
```

**4º Passo**

Crie uma referência para a raiz do seu banco Firebase. Substitua [meu banco] pelo nome do banco que você criou no segundo passo.
``` HTML
<script>	
	var firebaseRef = new Firebase('https://[meu banco].firebaseio-demo.com/');
</script>
```
    
**5º Passo**

O método set() é responsável criar ou substituir os dados do banco. Então criaremos um método para criar ou recriar o nosso objeto JSON utilizando o método set()

``` HTML
	<script>
		function criarJson() {
			firebaseRef.set(
				{
					"lutadores": {
						"blanka": {
							"magia":"Electric Thunder"
						},
						"ryu": {
							"magia":"Hadouken"
						},
						"sagat": {
							"magia":"Tiger Uppercut"
						}
					}
				}
			);
		}
	</script>
```

**6º Passo**

Iremos atualizar o campo "magia" do lutador Blanka. Para isso, utilizaremos o método update(). Mas primeiramente iremos apontar a referência para o campo que será atualizado, utlizando o método child().
``` HTML
    <script>
        function atualizarMagiaBlanka() {
          var refBlanka = firebaseRef.child("lutadores/blanka");
          hopperRef.update({
            "magia": "Rolling Attack"
          });
        }
    </script>
```
**7º Passo**

Por último, é necessário adicionar um evento para "escutar" as modificações que serão feitas no banco de dados. O evento "value" é aquele que desempenha este papel.
O método val() retorna o objeto JSON atualizado.

``` HTML
<script>
	firebaseRef.on("value", function(snapshot) {
	    mostrarJson(snapshot.val());
	});
	
	function mostrarJson(json) {
	    document.getElementById("jsonOut").innerHTML = JSON.stringify(json);
	}
</script>
```
        
E finalmente o código completo:

``` HTML
<html>
	<head>
	<script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
	</head>
	<body>
		<script>
			var firebaseRef = new Firebase('https://[meu banco].firebaseio.com/');
			
			firebaseRef.on("value", function(snapshot) {
				mostrarJson(snapshot.val());
			});
			
			function mostrarJson(json) {
				document.getElementById("jsonOut").innerHTML = JSON.stringify(json);
			}
			
			function criarJson() {
				firebaseRef.set(
					{
						"lutadores": {
							"blanka": {
								"magia":"Electric Thunder"
							},
							"ryu": {
								"magia":"Hadouken"
							},
							"sagat": {
								"magia":"Tiger Uppercut"
							}
						}
					}
				);
			}
			
			function atualizarMagiaBlanka() {
				var refBlanka = firebaseRef.child("lutadores/blanka");
				refBlanka.update({
					"magia": "Rolling Attack"
				});
			}
		</script>
		
		<input type="button" onclick="criarJson()" value="Criar JSON" />
		
		<input type="button" onclick="atualizarMagiaBlanka()" value="Atualizar Magia Blanka" />
		
		<div id="jsonOut"></div>
	</body>
</html>
 ```
