https://reactjs.org/tutorial/tutorial.html

# 설치

https://reactjs.org/docs/add-react-to-a-new-app.html

```
npm install -g create-react-app
create-react-app my-app

cd my-app
npm start
```
npm 5.2.0이상 설치되어있으면, npx를 대신 사용할 수 있다.
```
npx create-react-app my-app

cd my-app
npm start
```

1. `Node.js` 설치
2. 프로젝트 생성 (create-react-app)
3. src 폴더 삭제
4. `index.css` 파일을 src 폴더에 추가함
5. `index.js` 파일을 src 폴더에 추가함
6. `index.js` 파일에 다음 내용을 추가
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
```
7. `npm start` 명령어 날림

# Overview

## What is React?
React는 사용자 인터페이스를 구축하기위한 선언적이고 효율적이며 유연한 JavaScript 라이브러리이다.

React.Component
```
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// Example usage: <ShoppingList name="Mark" />
```
XML과 유사한 태그. 렌더링하는 것을 응답한다. React는 데이터가 변경될 떄 영향이 있는 구성요소만 효율적으로 렌더링해준다.

여기서 ShppingList는 React 구성요소 클래스 또는 React 구성 요소 유형이다. 구성요소는 `props`라는 매개 변수를 사용하고 `render()` 메서드를 통해 표시할 뷰 계층 구조를 반환한다.

React 개발자는 JSX라는 특수 구문을 사용하여 이러한 구조를 더 쉽게 작성할 수 있다. `<div/>` 구문은 빌드시 `React.createElement('div')`로 변환된다.

```
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```

JSX 내부의 중괄호 안에 JavaScript 표현식을 넣을 수 있다. 각 React 요소는 변수에 저장하거나 프로그램을 전달할 수 있는 실제 JavaScript 객체이다.
`ShoppingList` 구성 요소는 기본 제공 DOM 구성 요소만 렌더링하지만 `<ShoppingList/>`를 작성하여 사용자 정의 React 구성 요소를 쉽게 구성할 수 있다. 각 구성요소는 캡슐화되어 독립적으로 작동할 수 있으므로 간단한 구성요소로 복잡한 UI를 작성할 수 있다.

## Getting Start

* Square
* Board
* Game

세가지 컴포넌트가 있다. Square 컴포넌트는 하나의 `<button>`을 렌더링하고, Board는 9개의 Square를 렌더링하며, Game 컴포넌트는 칠할 자리 표시자를 Board에 렌더링한다.

## Passing Data Through Props

```
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
```
prop를 통해서 데이터를 전달한다.
```
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
```