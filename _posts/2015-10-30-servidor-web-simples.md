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

Pronto, esse comando terá o mesmo efeito do que usamos com o `python`. Não esqueça do parâmetro `-g` para instalar globalmente, caso contrário o comando acima não irá funcionar.

Isso tudo é tão útil e evita problemas para configurar um servidor HTTP como Apache para projetos simples e testes.

Se vocês conhecem ou já construíram soluções mais simples, deixe seu comentário.
