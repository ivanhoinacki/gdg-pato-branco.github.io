---
layout: post
title: Introdução ao AngularJS
avatar: emalherbi
---

Veja nesse artigo os primeiros passos para utilizar o framework javascript AngularJS da Google e desenvolva um blog com o AngularJS e Firebase.

> Angular JS é um [framework](http://pt.stackoverflow.com/questions/17501/qual-%C3%A9-a-diferen%C3%A7a-de-api-biblioteca-e-framework) javascript, criado pelo time de desenvolvedores da GOOGLE, open-source (código aberto), poderoso por estender o HTML possibilitando a criação de aplicações dinâmicas de forma rápida e objetiva.

Conteúdo
========

-	O que é?
-	Porque usar?
-	O Blog.
-	Estrutura do Projeto.
-	Página Inicial.
-	Módulos.
-	Rotas.
-	Serviços.
-	Controladora.
-	Templates.
-	Diretivas.
-	Conclusão.
-	Referências.

O que é?
========

Em poucas palavras, AngularJS é um framework escrito em JavaScript, client-side [MV\*](https://plus.google.com/+AngularJS/posts/aZNVhj355G2), essencial para [single page applications – SPA](http://en.wikipedia.org/wiki/Single-page_application).

Porque usar?
============

Segundo AngularJS, HTML é ótimo para declarar documentos estáticos mas vacila quando tentamos usá-lo para declarar visualizações dinâmicas em aplicações web. AngularJS permite estender vocabulário HTML para a sua aplicação. O ambiente resultante é extraordinariamente expressivo, legível e rápido para se desenvolver. [(ANGULARJS, 2015)](https://www.angularjs.org/)

O Blog
======

> Nota: O projeto pode ser baixado através do github nesse link aqui: [fireblog](https://github.com/gdg-pato-branco/fireblog/tree/0.1.0).

Pensamos em um projeto fácil de ser desenvolvido que utilize AngularJS, Firebase para apresentar duas das Tecnologias mais atuais da Google. Neste post estarei abordando a tecnologia **AngularJS**, não irei entrar em detalhes muito técnicos pois o foco do post é apresentar o framework **angular** com um exemplo prático.

> Para salvar os posts do blog, foi utilizando o banco de dados **Firebase**.
Está perdido e não sabe o que é o **Firebase**? Leia o post [aqui](http://gdgpatobranco.org/2015/04/21/firebase-introduction/) e descubra.

Estrutura do Projeto
====================

Primeiro vamos definir a estrutura de pasta do nosso blog, conforme Listagem 1.

Essa etapa é muito importante para definir a maneira que iremos trabalhar, para o post foi pensando em uma estrutura simples e com melhor didática, se quiser ir mais a fundo com **angular** recomendo utilizar a estrutura de pastas que o próprio pessoal da AngularJS disponibiliza, [angular-seed](https://github.com/angular/angular-seed).

```
|- css
   |- blog.css
|- js
   |- app.js
   |- controllers.js
   |- directives.js
   |- routes.js
   |- services.js
|- partials
   |- mast-about.html
   |- mast-footer.html
   |- mast-head.html
|- index.html
|- home.html
|- novo.html
```

> Listagem 1 - Estrutura de Pastas do Blog

Para facilitar no desenvolvimento **visual** do nosso projeto Blog, será utilizado o framework front-end **bootstrap**, pois possui uma grande diversidade de temas, é responsivo e fácil de usar. Como o foco do nosso post é sobre angular não vou entrar em detalhes sobre o **bootstrap**, se quiser saber mais do bootstrap consulte: [getbootstrap](http://getbootstrap.com/).

A Estrutura do projeto ficou, pasta **css** contém o tema que encontrei no site do bootstrap ([aqui](http://getbootstrap.com/examples/blog/)), **js** os arquivos javascript que iremos criar em angular, **partials** para os componentes que iremos fazer em html. A **index.html** página principal e demais **.html** que serão nossos templates.

Página Inicial
==============

Assim como qualquer aplicação web, precisamos criar uma página inicial (**index.html**). Nesta página deve ser inserido os arquivos **js** e **css** que iremos utilizar (Listagem 2).

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <link rel="icon" href="favicon.ico">

  <title>GDG Pato Branco</title>

  <!-- Bootstrap core CSS -->
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="css/blog.css" rel="stylesheet">

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <link href='http://fonts.googleapis.com/css?family=Maven+Pro' rel='stylesheet' type='text/css'>
</head>
<body ng-app="app" >

  <mast-head></mast-head>

  <div class="container">
    <div ng-view >
    </div>
  </div>

  <mast-footer></mast-footer>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-route.min.js"></script>
  <script src="https://cdn.firebase.com/js/client/2.2.1/firebase.js"></script>
  <script src="https://cdn.firebase.com/libs/angularfire/1.0.0/angularfire.min.js"></script>

  <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>

  <script src="js/app.js"></script>
  <script src="js/routes.js"></script>
  <script src="js/services.js"></script>
  <script src="js/controllers.js"></script>
  <script src="js/directives.js"></script>
</body>
</html>
```

> Listagem 2 - Página Inicial do Blog

Observa-se na Listagem 2 que algumas tags novas foram inseridas no html, como **ng-app**, **ng-view**.

O atributo **ng-app** na tag body do HTML, informa para o DOM que é um documento AngularJS. Para o AngularJS o atributo **ng-app** é considerado como a raiz da aplicação, por esse motivo que geralmente colocamos o atributo no elemento **body** ou **html**, para dizer que todos os filhos fazem parte da nossa aplicação, porém esse atributo pode ser inserido em qualquer tag do HTML, depende o escopo que sua aplicação irá atingir.

O atributo **ng-view** diz para o AngularJS que é ali que deve ser inserido seus templates html, conforme Listagem 3.

```
|- home.html
|- novo.html
```

> Listagem 3 - Templates do Blog

Módulos (app.js)
================

Após criarmos a página inicial (**index.html**) da nossa aplicação, devemos dizer quais módulos o angular deve importar (Listagem 4).

```js
angular.module("app", [
  'firebase',
  'ngRoute'
]);
```

> Listagem 4 - Módulos

Os módulos que nossa aplicação importará são **firebase** responsável pela comunicação com o banco de dados. E **ngRoute** responsável por criar o roteamento de nossa aplicação.

Rotas (routes.js)
=================

É com o **ngRoute** que dizemos para o AngularJS injetar determinada página na **ng-view** e também qual é o **controller** dessa página (Listagem 5).

```js
angular.module("app").config(function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl : 'home.html',
    controller : 'HomeController',
    resolve: {
      "syncObject" : function(FirebaseService) {
        return FirebaseService.getPosts();
      }
    }
  }).when('/novo', {
    templateUrl : 'novo.html',
    controller : 'NovoController'
  });

});
```

> Listagem 5 - Rotas

A função **when** do **ngRoute** diz quando será injetada essa página na **ng-view**. Por exemplo: Quando a aplicação iniciar será injetado o html **home.html** e será chamado o controller **HomeController**.

**Resolve** é uma propriedade na configuração de roteamento, que significa que pode existir uma dependência de serviço. No blog em questão ao ser injetado o a página **home.html** o AngularJS irá fazer a solicitação para o nossos serviços (**services.js**), buscando os posts do Blog.

Serviços (services.js)
======================

O serviço fornecer acesso aos dados do nosso banco de dados **Firebase** (Listagem 6).

```js
angular.module("app").service("FirebaseService", function($firebaseArray, $firebaseObject) {
  var vm = this;

  vm.ref = new Firebase("https://gdgpb.firebaseio.com/");
  vm.posts = vm.ref.child('posts');
  vm.syncObject = $firebaseObject(vm.ref);

  this.add = function(post) {
    vm.posts.push(post);
  };

  this.getPosts = function() {
    return vm.syncObject;
  };

});
```

> Listagem 6 - Serviços

Quando o **home.html** for chamado pelo **ngRoute** (**routes.js**) a propriedade **resolve** ira chamar a função do **FirebaseService.getPosts()**.

> Observe que para buscar os posts (**getPosts**) e inserir um novo post (**add**) não foi necessário muitas linhas de código, pois as bibliotecas do **Firebase** nos ajudam neste ponto.

Controladora (controllers.js)
=============================

Já criamos nossa página inicial (**app.js**), nossos roteamentos (**routes.js**) e nossos serviços (**service.js**). Agora precisamos dizer para nosso **Controller** o que ele deve fazer com os dados retornados do **FirebaseService.getPosts()** (**service.js**), conforme Listagem 7.

```js
angular.module("app").controller("HomeController", ["$scope", "syncObject", function($scope, syncObject) {
  syncObject.$bindTo($scope, "data");
}]);
```

> Listagem 7 - Controladora

Quando o **home.html** for chamado pelo **ngRoute** (**routes.js**) a propriedade **resolve** que possui o método **syncObject** chama a função do **FirebaseService.getPosts()**, o método **syncObject** é o mesmo que encontra-se no **HomeController** na Listagem 7.

Nesse ponto dizemos para o nossa função **syncObject** vincular o nosso **$scope** (**home.html**) com o retorno de dados do **Firebase**.

Templates (home.html)
=====================

Agora devemos apresentar os nossos dados que foram passados para o **controller.js**, conforme Listagem 8.

```html
<div class="row" >
  <div class="col-sm-8 blog-main">
    <div class="blog-post" ng-repeat="post in data.posts" >
      <h2 class="blog-post-title">{{ "{{ post.title " }}}}</h2>
      {{ "{{ post.body " }}}}
      <p class="blog-post-meta">{{ "{{ post.date " }}}} por <a href="#">{{ "{{ post.author " }}}}</a></p>
    </div>
  </div><!-- /.blog-main -->
  ...
</div><!-- /.row -->
```

> Listagem 8 - Home

No AngularJS a directiva **ngRepeat** representa o for das linguagens de programação (**javascript, php, java**). É no laço do lopp que conseguimos pega o objeto **post** e apresentar o **título** e **corpo** do texto.

Pronto com isso já temos o nosso blog funcionando, buscando os **posts** no banco de dados **Firebase** e passando para nossa controladora, a controladora ligada com o nosso **HTML** e apresentando os dados de forma dinâmica.

Diretivas (directives.js)
=========================

Lembra-se no **index.html** que tinhamos as tags html ```<mast-head></mast-head>``` e ```<mast-footer></mast-footer>```? Quando rodamos nossa aplicação um código **html** é injetado nesse elemento. Como fazemos isso?

Observe como ficou o **directives.js** conforme Listagem 9.

```js
angular.module("app").directive("mastHead", function() {
  return {
    templateUrl: 'partials/mast-head.html'
  };
});
...
```

> Listagem 9 - Diretivas

Segundo AngularJS, as **diretivas** são marcadores em um elemento DOM que informam ao compilador HTML da angularjs para anexar um comportamento especificado para esse elemento DOM [(ANGULARJS, 2015)](https://docs.angularjs.org/guide/directive).

Em outras palavras, para esse exemplo Blog, a nossas diretivas injetam o código html (**mast-head.html**) no elemento criado ```<mast-head></mast-head>``` que encontra-se no **index.html**.

Conclusão
=========

Deixei alguns tópicos de fora, pois, o objetivo aqui era mostrar um pouco do Framework AngularJS com um exemplo básico. No site do AngularJS há uma documentação bem completa, com diversos [tutoriais](https://angularjs.org/).

O código fonte do nosso exemplo encontra-se no [Github](https://github.com/gdg-pato-branco/fireblog/tree/0.1.0) GDG Pato Branco.

Finalizando, já estamos preparando um **post** mais avançado sobre o **AngularJS**.

Dúvidas? Sugestões? Mande um e-mail ou deixe um comentário, só não deixe de me notificar! :)

Abraços e até a próxima.

Referências
===========

- [Diferença de Framework e Biblioteca](http://pt.stackoverflow.com/questions/17501/qual-%C3%A9-a-diferen%C3%A7a-de-api-biblioteca-e-framework)
- [MV\* - MVC vs MVVM vs MVP](https://plus.google.com/+AngularJS/posts/aZNVhj355G2)
- [Single Page Application - SPA](http://en.wikipedia.org/wiki/Single-page_application)
- [AngularJS](https://www.angularjs.org/)
- [Angular-seed](https://github.com/angular/angular-seed)
- [AngularJS Aplicação Lista de Compras](http://tableless.com.br/criando-uma-aplicacao-simples-com-angularjs/)
- [AngularJS melhores praticas parte I](http://cironunes.com/angularjs-melhores-praticas-parte-I-bootstrap/)
- [AngularJS melhores praticas parte II](http://cironunes.com/angularjs-melhores-praticas-parte-II-carregamento/)
- [Ode to Code - Using Resolve In AngularJS Routes](http://odetocode.com/blogs/scott/archive/2014/05/20/using-resolve-in-angularjs-routes.aspx)
- [Firebase - How it Works](https://www.firebase.com/how-it-works.html)
- [Firebase - Introdução](http://gdgpatobranco.org/2015/04/21/firebase-introduction/)
