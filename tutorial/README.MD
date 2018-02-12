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

## An Interactive Component

클릭하면 Square 컴포넌트가 'X'로 채워지게 해보자.

```
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>
    );
  }
}
```

클릭하면 alert창이 뜰 것이다. `onClick` 프로퍼티로 함수를 전달하고 있다.

React에서 `this.state`를 설정해서 상태를 갖을 수 있다.

```
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>
    );
  }
}
```

JavaScript의 classes에서 constructor를 정의할 때, `super();`를 꼭 명시해주어야 한다.

이제 클릭시 현재 상태의 값을 보여주기 위해서 `render()` 메서드를 수정해보자.
* `<button>` 태그 안에 `this.props.value`를 `this.state.value`로 바꿔준다.
* `onClick`의 이벤트 핸들러를 `() => alert()`를 `() => this.setState({value : 'X'})`로 바꿔준다.

```
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    );
  }
}
```

`this.setState`가 호출될 때마다 컴포넌트의 업데이트가 예정되어있으므로 state의 값이 변경되면서 컴포넌트와 그의 하위 컴포넌트들까지 다시 렌더링된다. `this.state.value`의 값이 `'X'`가 되면서 화면에 X가 보이게 될 것이다.

## Developer Tools

![React component tree](https://reactjs.org/static/devtools-878d91461c78d8f238e116477dfe0b46-6ca3b.png)

# Lifting State Up

여러 자식간의 데이터를 집계하거나 통신을 위해서 state를 상위 컴포넌트로 이동시킨다. 여기서는 9개의 null 배열을 갖도록한다.

```
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

나중에는 배열이 다음과 같이 될 것이다.

```
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

Board의 `renderSquare` 메소드는 다음처럼 바꿔준다.

```
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

이제 Square를 클릭할 때 일어날 일을 바꿔야 한다. Square에서 직접 Board의 state를 바꿀 수 없다. Square를 클릭할 때 함수를 Board에서 Square로 전달해준다.

```
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
```

* Square의 `render`에 `this.state.value`를 `this.props.value`로 바꾼다.
* Square의 `render`에 `this.setState()`를 `this.props.onClick()`로 바꾼다.

```
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
```

1. `<button>` 컴포넌트의 `onClick` 프로퍼티는 React에게 이벤트 리스너를 설정하도록 지시한다.
2. button이 클릭 될 때, React는 상위 `render()` 메소드에 정의되어 있는 `onClick` 이벤트 핸들러를 호출할 것이다.
3. 이 이벤트 핸들러는 `this.props.onClick()`을 호출한다. Square의 프로퍼티는 Board에 의해 정의된다.
4. Board는 `onClick={() => this.handleClick(i)}`를 Square에 전달하고 `this.handleClick(i)`를 호출한다.
5. `handleClick()`를 구현하자.

React에서 DOM `<button` 요소의 `onClick` attribute는 특별한 의미가 있지만, Square의 `onClick` 프로퍼티나 Board의 `handleClick()`을 다른 이름으로 사용할 수 있다. 하지만 React앱에서 attribute로 `on*`의 이름을 사용하고, 핸들러 메소드에서 `handle*`의 이름을 사용하는 것이 일반적이다.

```
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

`.slice()`를 호출하여 `squares` 배열을 있는 것을 사용하는 것 대신 복사를 한다.

이제 Square대신 Board에 상태가 저장되어있다. Board의 상태가 변경되면, Square의 컴포넌트가 언제 어떻게 다시 렌더링될지 고민해보자.

Square는 더이상 자신의 상태를 갖고있지 않다. 부모인 Board로부터 상태를 받고, 이것이 클릭될 때, 부모에게 알려준다.

## Why Immutability Is Important

`.slice()`를 이용해서 변경하기 전에 배열을 복사하고 기존 배열은 변경되지 않게 하는 것이 중요하다.

일반적으로 데이터를 변경하는데 두가지 방법이 있다. (mutate) 첫번째로 직접 값을 변경하는 방법이 있다. (immutate) 두번째로 값을 복사하여 변경 후에 데이터를 대채하는 방법이 있다.

### Data change with mutation
```
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Now player is {score: 2, name: 'Jeff'}
```

### Data change without mutation
```
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// Or if you are using object spread syntax proposal, you can write:
// var newPlayer = {...player, score: 2};
```

결과는 똑같다. 하지만 두번째 방법이 성능을 향상시키는데 도움을 주는 이점이 있다.

* Undo/Redo