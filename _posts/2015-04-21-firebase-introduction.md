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

[https://gdg-street-fighter.firebaseio.com/.json](https://gdg-street-fighter.firebaseio.com/.json)

**Objeto lutadores**

[https://gdg-street-fighter.firebaseio.com/lutadores.json](https://gdg-street-fighter.firebaseio.com/lutadores.json)

**Objeto Blanka**

[https://gdg-street-fighter.firebaseio.com/lutadores/blanka.json](https://gdg-street-fighter.firebaseio.com/lutadores/blanka.json)

**Valor da propriedade magia do objeto Blanka**

[https://gdg-street-fighter.firebaseio.com/lutadores/blanka/magia.json](https://gdg-street-fighter.firebaseio.com/lutadores/blanka/magia.json)

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

Crie um banco de dados informando o nome do aplicativo. Por padrão, o nome do banco e da aplicação é o mesmo. Para dar outro nome ao banco de dados, altere o campo APP URL.

**3º Passo**

Crie um documento html e adicione a biblioteca do firebase:

``` HTML
<html>
	<head>
	    <script src="https://cdn.firebase.com/js/client/2.2.1/firebase.js"></script>
	</head>
	<body>
	</body>
</html>
```

**4º Passo**

Crie uma referência para a raiz do seu banco Firebase. Substitua **[meu banco]** pelo nome do banco que você criou no segundo passo:

``` HTML
<script>	
	var firebaseRef = new Firebase("https://[meu banco].firebaseio.com/");
</script>
```
    
**5º Passo**

O método **set()** é responsável criar ou substituir os dados do banco. Então criaremos um método para criar ou recriar o nosso objeto JSON utilizando o método **set()**:

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

Iremos atualizar o campo **"magia"** do lutador Blanka. Para isso, utilizaremos o método **update()**. Mas primeiramente iremos apontar a referência para o objeto que será atualizado, utlizando o método **child()**:

``` HTML
<script>
	function atualizarMagiaBlanka() {
		var refBlanka = firebaseRef.child("lutadores/blanka");
		refBlanka.update({
			"magia": "Rolling Attack"
		});
	}
</script>
```

**7º Passo**

Por último, é necessário adicionar um evento para "escutar" as modificações que serão feitas no banco de dados. O evento **"value"** é aquele que desempenha este papel.
O método **val()** retorna o objeto JSON atualizado.

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
		<script src="https://cdn.firebase.com/js/client/2.2.1/firebase.js"></script>
	</head>
	<body>
		<input type="button" onclick="criarJson()" value="Criar JSON" />
		<input type="button" onclick="atualizarMagiaBlanka()" value="Atualizar Magia Blanka" />
		<div id="jsonOut"></div>
	
		<script>
			var firebaseRef = new Firebase("https://[meu banco].firebaseio.com/");
			
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
	</body>
</html>
 ```

### Console
 
 O Firebase possui um console que possibilita ao usuário visualizar e manipular os dados do banco. Você pode acessar o console através da página inicial, onde é exibida uma lista com todas as aplicações, ou digitar diretamente o endereço da aplicação https://nomedobanco.firebaseio.com.
 
### Listas / Arrays

Aqueles que estão mais familiarizados com a sintaxe do JSON devem ter percebido o seguinte:

A lista de lutadores foi criada assim:

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

Mas normalmente ela seria criada como um array:

``` JSON
"lutadores": {
	[
		{
			"nome":"Blanka",
			"magia":"Electric Thunder"
		},
		{
			"nome":"Ryu",
			"magia":"Hadouken"
		},
		{
			"nome":"Sagat",
			"magia":"Tiger Uppercut"
		}
	]
}
```

O motivo para isso é que cada elemento do objeto JSON no Firebase é tratado como uma child. A child nada mais é do que uma propriedade do objeto JSON e cada propriedade deve ter um nome de identificação.

Mas obviamente é impossível criar identificações manualmente para cada elemento do objeto (como eu fiz nos exemplos).

**Método push()**

O método **push()** é responsável por incluir uma **child** no objeto JSON e atribuir um identificador aleatório para esse item.

Vamos ver como ficaria o exemplo modificado para utilizar o push:

``` HTML
<html>
	<head>
		<script src="https://cdn.firebase.com/js/client/2.2.1/firebase.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	</head>
	<body>
		<input type="text" id="nome" placeholder="Nome">
		<input type="text" id="magia" placeholder="Magia">
		<input type="button" id="btn" value="Criar Lutador">
		<div id="jsonOut"></div>
		
		<script>
			var firebaseRef = new Firebase("https://[meu banco].firebaseio.com/");
			
			firebaseRef.on("value", function(snapshot) {
				mostrarJson(snapshot.val());
			});
			
			function mostrarJson(json) {
				document.getElementById("jsonOut").innerHTML = JSON.stringify(json);
			}
			
			function adicionarLutador(paramNome, paramMagia) {
				var childRef = firebaseRef.child("lutadores");
				childRef.push({nome:paramNome, magia:paramMagia});
			}
			
			$( "#btn" ).click(function() {
				var nome = $('#nome').val();
				var magia = $('#magia').val();
				adicionarLutador(nome, magia);
			});
		</script>
	</body>
</html>
```

Observe que se o objeto **"lutadores"** não existir, ele será criado. Ná próxima vez que for feito o **push**, o objeto simplesmente será anexado ao objeto **"lutadores"** já existente.

### O que faltou?

Não cobrimos neste tutorial a parte de [segurança](https://www.firebase.com/docs/security/) e [hosting](https://www.firebase.com/docs/hosting/) do Firebase.

### Na sequência

Alguns links interessantes:

**Documentação do Firebase**

[https://www.firebase.com/docs](https://www.firebase.com/docs)

**Open Data Sets**

O Firebase disponibiliza bancos, que podem ser utilizados pela sua aplicação, que são atualizados em tempo real com informações sobre trânsito, tempo de espera em aéroportos, previsão do tempo, terremotos e estacionamento.

[https://www.firebase.com/docs/open-data](https://www.firebase.com/docs/open-data)

**Exemplo de aplicações com o código fonte**

[https://www.firebase.com/docs/web/examples.html](https://www.firebase.com/docs/web/examples.html)

### Referências

[https://www.firebase.com/docs](https://www.firebase.com/docs)

[http://en.wikipedia.org/wiki/Firebase](http://en.wikipedia.org/wiki/Firebase)

[http://en.wikipedia.org/wiki/Mobile_Backend_as_a_service](http://en.wikipedia.org/wiki/Mobile_Backend_as_a_service)
