---
layout: post
title: Calculadora em JavaScript com operações matemáticas
avatar: leandro
---

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
