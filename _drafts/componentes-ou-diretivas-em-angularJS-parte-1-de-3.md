---
layout: post
title: Componentes ou diretivas em AngularJS
avatar: leandro
---

# Componentes ou diretivas em AngularJS (Parte 1 de 3)

> Este documento é voltado para desenvolvedores já familiarizados com o básico do AngularJS.

Toda manipulação do DOM deve ser feito dentro de uma diretiva. Diretivas devem ser mantidos pequenos e utilizar composição. Arquivos que definem diretivas devem fornecer uma função estática que retorna o objeto de definição da diretiva ([Directive Object Definition](https://docs.angularjs.org/api/ng/service/$compile#directive-definition-object)).

### O quê são diretivas?

Diretivas são extensões da sintaxe HTML, escrito de forma declarativa. Por exemplo, se você precisar alinhar um texto à direita na coluna de uma `<table>`.
Simplesmente basta adicionar o atributo `align="right"` ao elemento `<th>` da tabela. Exemplo:

```html
<table>
  <thead>
    <tr>
      <th align="right">Coluna 1</th>
      <th>Coluna 2</th>
      <th>Coluna 3</th>
    </tr>
  </thead>
</table>
```

Esse é o poder de expressão em linguagens declarativas, o conceito se aplica ao HTML, como a maioria das linguagens de marcação.

As diretivas estão presentes em um elemento DOM, em geral, como um elemento ou atributo. Elas informam ao compilador ([$compile](https://docs.angularjs.org/api/ng/service/$compile)) do AngularJS para anexar um comportamento específico a esse elemento DOM.

```html
<ul>
  <li ng-repeat="numero in [1, 2, 3]">Item {{ numero }}</li>
</ul>
```

No código anterior, o atributo `ng-repeat` repete o elemento `<li>` por 3 vezes, alterando o DOM desse elemento.

### Componentes reutilizáveis

Através das diretivas, é possível criar componentes reutilizáveis que são específicos para o seu aplicativo e fazer quase qualquer coisa que você possa imaginar no seu template. Estes componentes (extensões) se tornam uma linguagem  específica de domínio, em inglês domain-specific language (DSL), focada para construção de sua aplicação.

[Web Components](http://www.w3.org/TR/components-intro/), [Polymer](https://www.polymer-project.org/) e [diretivas](https://docs.angularjs.org/guide/directive) do AngularJS são muito semelhantes. Podemos dizer que o Polymer e as diretivas do AngularJS são iguais? Não. Podemos criar componentes personalizados, reutilizáveis, utilizando diretivas. A desvantagem dessa abordagem, é que não há um verdadeiro isolamento de marcação e estilo. Já o Polymer é um "polyfill" que facilita a criação de Web Components.

### Encontrando Diretivas

Quando o AngularJS inicializa a aplicação, ele atravessa toda a árvore [DOM](https://pt.wikipedia.org/wiki/Modelo_de_Objeto_de_Documentos) procurando por diretivas correspondentes. O que isso significa? Para o AngularJS, isso significa, adicionar escutadores ao código HTML.

Antes de criar nossa própria diretiva, precisamos saber como o AngularJS descobre quando usar uma determinada diretiva.

No elemento `<input>`, encontramos uma diretiva que corresponde à `ngModel`.

```javascript
<input ng-model="usuario">
```

O código seguinte faz o mesmo:

```javascript
<input data-ng-model="usuario">
```

Nós geralmente nos referimos as diretivas pelo seu caso sensitivo [camelCase](https://pt.wikipedia.org/wiki/CamelCase) (`ngModel`, por exemplo). No entanto, uma vez que HTML é caso insensitivo, nos referimos a diretivas no DOM por formas minúsculas (por exemplo, `ng-model`).

As seguintes formas de declaração são todos equivalentes a diretiva `ngBind`:

*index.html*

```html
<div ng-controller="Controller">
  Olá <input ng-model="nome">
  <hr/>
  <span ng-bind="nome"></span> <br/>
  <span ng:bind="nome"></span> <br/>
  <span ng_bind="nome"></span> <br/>
  <span data-ng-bind="nome"></span> <br/>
  <span x-ng-bind="nome"></span> <br/>
</div>
```

*script.js*

```javascript
angular.module('exemploBind', [])
.controller('Controller', ['$scope', function($scope) {
  $scope.name = 'Syd Barret';
}]);
```

A sintaxe anterior para declarar a diretiva `ngBind` são todos equivalentes, escolha a sua forma preferida. Na dúvida, use a sintaxe `ng-bind` ou `data-ng-bind`. Use `data-ng-*` quando você for validar seus documentos HTML, como o [Markup Validation Service](https://validator.w3.org/) do [W3C](http://www.w3c.br/).

### Esqueleto de uma diretiva

Levando em consideração as boas práticas, esse é o esqueleto para o código inicial de uma diretiva:

```javascript

(function () {
  'use strict';

  angular.module('seuModulo')
  .directive('minhaDiretiva', minhaDiretiva);

  function minhaDiretiva() {
    var directiveDefinitionObject = {
      restrict: string,
      priority: number,
      template: string,
      templateUrl: string,
      replace: bool,
      transclude: bool,
      scope: bool or object,
      controller: function controllerConstructor($scope, $element, $attrs, $transclude) {
        // ...
      },
      require: string,
      link: function postLink(scope, iElement, iAttrs) {
        //...
      },
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {
            // ...
          },
          post: function postLink(scope, iElement, iAttrs, controller) {
            //...
          }
        }
      }
    };

    return directiveDefinitionObject;
  };

}());
```

Algumas das opções são exclusivas, a maioria deles são opcionais, e todos eles tem detalhes que valem a pena explicar.

No próximo post, a parte 2 desta sequência, iremos nos focar  nos detalhes da anatomia de uma diretiva.
