---
layout: post
title: Servidor web simples
avatar: leandro
---

Sempre que você precisa configurar um servidor Web em seu computador bate aquele desânimo. Tudo isso torna criar um ambiente de desenvolvimento uma verdadeira dor de cabeça. As configurações variam de acordo com o sistema operacional. Provavelmente você vai acabar esbarrando em uma e outra configuração sinistra.


![Gatinho ^^](https://media.giphy.com/media/XwnOjVqPIlXGM/giphy.gif)


Muitos desenvolvedores não conhecem ou nunca ouviram falar de soluções mais simples, tais como opções no Python ou Node.js.


Python
--

Existe a classe SimpleHTTPServer, que já vem com o Python instalado, e serve arquivos do diretório atual, mapeando toda a estrutura de diretório para que seja visível ao navegador web (Google Chrome, Firefox etc). Através da linha de comando, podemos rodar esse simples servidor web. Abra o prompt de comando do DOS (cmd) ou o terminal do Linux, dentro do diretório que você quer servir os arquivos, digite:

`python -m SimpleHTTPServer 8080`

Por exemplo, se você estiver no diretório `C:\projetos\web` ou `/home/eu/projetos/web` e digitar o comando acima, os arquivos desta pasta podem ser acessados digitando: http://localhost:8080 - no seu navegador.

Node.js
--

Em Node.js não temos um servidor web simples por padrão, mas existe um pacote chamado http-server. Você pode instalar:

`npm install -g http-server`

Após instalado, para poder rodar, a forma básica de usar o comando é:

`http-server`

Pronto, esse comando terá o mesmo efeito do que usamos com o `python`.

Isso tudo é tão útil e evita problemas para configurar um servidor HTTP como Apache para projetos simples e testes.




--x--

Se você conhece ou já construíu uma solução mais simples, deixe seu comentário abaixo. Estamos ansiosos para ouvir de todos vocês.



[1] https://docs.python.org/2/library/simplehttpserver.html
















Como vimos no [post anterior](/2015/10/05/calculadora-em-javascript/), as funções são objetos em JavaScript. O operador `typeof` é definido pela [ECMAScript](https://pt.wikipedia.org/wiki/ECMAScript) para retornar uma string indicando o tipo de um operando.

![Confuso.](/assets/typeof_function_calc.png)

Para alguns desenvolvedores, geralmente, a linguagem JavaScript é usada de forma estruturada. Mas também, JavaScript suporta programação orientada a objetos.

Ao longo da sua jornada de aprendizado e trabalho, você vai acabar criando seus próprios objetos em JavaScript com bastante frequência. Tenha em mente que os objetos em JavaScript são dinâmicos, isso quer dizer que eles podem mudar em tempo de execução no código. Ao contrário de linguagens fortemente tipadas que restringem os objetos em um tipo bem definido.

Nada foi citado sobre classes até o momento, mesmo porque, JavaScript não possui classes. Ou melhor, não existia como criar classes. Antigamente os contrutores e protótipos foram os principais responsáveis pela "criação" de classes.

> O que você disse? Não consigo entender de forma alguma como o paradigma de orientação a objetos funciona no Javascript.

![Confuso.](/assets/shocked_pug.gif)

Inicializadores de objetos ou objetos literais

======


Você já precisou fazer operações matemáticas? Como adição, subtração etc? Então, vamos ver para que servem e como usar os operadores aritméticos em JavaScript.

> Este documento é voltado para iniciantes, vamos ter uma visão geral sobre os operadores matemáticos, e ao final criar uma simples calculadora com JavaScript.

Pressione F12 para abrir o Chrome DevTools, encontre a aba Console e digite os comandos de operação aritmética como adição, multiplicação, subtração e divisão. E em seguida, pressione a tecla Enter para visualizar o resultado de cada operação.

![Operadores matemáticos com String.](/assets/operdores_matematicos_com_string.png)

A maneira mais simples de se fazer operações matemáticas em JavaScript é usar os operadores:

- *+* (adição ou soma)
- *-* (subtração ou diminuição)
- * (multiplicação)
- */* (divisão)

 Qual a diferença entre ```1 + 2``` e ```"4" + 4  ```?
--

Mas, espere! O quê está acontecendo? Por quê o resultado dessas duas operações é diferente?

A resposta para isso é porque os tipos de cada dado é diferente. Como assim? Vejamos:

- 4 é do tipo número. Números são usados para cálculos e matemática.
- "4" é do tipo string. String são usadas para representar dados baseados em texto. Como nomes e endereços.

Como você percebeu, as aspas duplas ("") são usadas na operação. Usando o operador + em strings ou números temos efeitos diferente. Em números, é feito a adição entre ambos. Mas em strings cada um é colocado lado a lado, juntos, como uma cola entre eles. Em programação isso é chamado de concatenação.

Fique ligado! Se nós usarmos o operador + com uma string e um número, então ambos string e número serão tratados como string e no final o resultado é uma string.

Dando início a criação da nossa calculadora
--

Vamos criar funções auxiliares para representar cada operação aritmética, com o seu devido nome.

```javascript
function somar(um, outro) {
  return um + outro;
}

function diminuir(um, outro) {
  return um - outro;
}

function multiplicar(um, outro) {
  return um * outro;
}

function dividir(um, outro) {
  return um / outro;
}
```

Uma função em JavaScript é um bloco de código designado para descrever uma determinada tarefa. A função é executada quando "alguém" o invoca (chama isso).


Após declarar cada funçao dessas através do DevTools, você pode copiar e colar cada função ou, se preferir, digitar uma a uma. Então, agora que temos as funções disponíveis para uso, podemos chamar dessa forma:

![Funções representando os operadores matemáticos .](/assets/operadores_funcoes.png)

Pronto! Viu como é fácil escrever operações matemáticas em JavaScript? Esse é um exemplo de uma simples calculadora. Até agora nós conseguimos fazer operações de somar, diminuir, multiplicar e dividir. Além de ter criado funções para nos auxiliar em tarefas repetitivas.

Bom, por enquanto é isso, mas fique ligado no nosso próximo post sobre como criar a nossa calculadora usando o conceito de classes e orientação a objetos em JavaScript. Até a próxima!
