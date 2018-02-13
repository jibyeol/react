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

* 쉬운 Undo/Redo 및 시간이동
Immutability는 복잡한 기능을 쉽게 만든다. 예를 들어 이 예제에서 게임의 각 다른 스테이지를 시간 이동을 가능하게 구현할때 이전 데이터의 참조를 유지함으로써 쉽게 구현할 수 있다.

* 변경사항 추적
mutated 객체가 변경되었는지 확인하려면 모든 변수를 다 확인해야하므로 매우 복잡하다. 이것은 점차 복잡해 질 것이고, immutable 객체는 참조되는 객체가 이전과 달라지면 바뀐 것이므로 매우 쉽다.

* React에서 언제 렌더링되는지 결정
React에서 immutability의 가장 큰 장점은 간단한 순수 컴포넌트를 빌드할 때이다. immutable 데이터가 변화를 더 쉽게 감지해서 다시 랜더링을 요구할 때 쉽게 결정할 수 있다.

## Functional Components

생성자를 지웠다. 사실 React는 Square처럼 오직 `render` 함수만 갖고있는 컴포넌트를 위한 *functional components*라고 불리는 간단한 문법을 제공한다. `React.Component`를 extends하는 대신, props를 취하고 무엇을 렌더링하는지를 반환하는 함수를 적성해라.

```
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

`this.props`를 `props`로 바꿔야한다. 다른 것들도 functional components로 바꿀 수 있다. functional components는 작성하기 쉽고 나중에 더 많이 최적화될 것이다. 
코드를 정리하면서 `onClick={()=>props.onClick()}`을 `onClick={props.onClick}`로 바꾸었다. `onClick={props.onClick()}`은 전달되지 않고 즉시 `props.onClick`가 바로 호출되기 때문에 작동되지 않는다.

## Taking Turns

'X'를 기본 상태로 지정하고 다음 턴도 적용해보자.

```
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
```

이동할 때마다 `xIsNext`를 토글한다.

```
 handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

다음 차례가 누군지 보여준다.

```
 render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // the rest has not changed
```

## Declaring a Winner

helper function

```
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

누군가 승리하면 결과를 보여준다. Board의 `render` 코드를 다음과 같이 바꿔준다.

```
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      // the rest has not changed
```

Board의 `handleClick`을 수정하여 누군가 이기거나 이미 채워진 곳이라면 무시하도록 합니다.

```
handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

tic-tac-toc 게임 완성!

# Storing a History

board의 이전상태로 돌아갈 수 있도록 해보자! 이동이 있을 때마다 새로운 `squares`를 만들었으므로 쉽게 만들 수 있다.

state에 이런식의 데이터를 저장할 것이다.

```
history = [
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // ...
]
```

최상위 Game 컴포넌트에 움직임의 list를 갖고 있어야한다. Square에서 Board의 state를 가져온 것처럼 Board에서 Game으로 정보를 상위로 옮겨야한다.

```
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
```

그러고 Board를 수정하자. `squares`는 props를 통해서 가져오고, `onClick`도 Game으로 부터 가져온다. click handler로 각 square의 위치를 알 수 있다.

1. `constructor` 삭제
2. Board의 `renderSquare`에서 `this.state.squares[i]`를 `this.props.squares[i]`로 변경
3. Board의 `renderSquare`에서 `this.handleClick(i)`를 `this.props.onClick(i)`로 변경

```
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
```

Game의 `render`는 최근 history객체를 보아야하고 게임의 상태를 계산할 수 있어야한다.

```
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />

        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
```

그리고 Board의 `render` 함수에서 `<div className="status">{status}</div>`는 삭제해야한다.

```
  render() {
    return (
      <div>
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
```

Board의 `handleClick`함수는 Game으로 옮겨야한다.

```
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
```

## Showing the Moves

Game의 render를 다음과 같이 바꾸자

```
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
```

history의 각 stepdms `<li>`아이템 리스트의 `<button>`으로 만들었다. 이 코드를 사용하면 다음과 같이 경고 메세지를 볼 수 있다.

```
Warning: Each child in an array or iterator should have a unique "key" prop.

Check the render method of `Game`. See https://fb.me/react-warning-keys for more information.
    in li (at index.js:80)
    in Game (at index.js:111)
```

## Keys

list의 아이템을 렌더링할때, React는 항상 리스트의 각 아이템에 대한 정보를 저장한다. state를 갖는 컴포넌트가 렌더링할때 state는 저장되어야한다. 구현 방법과 관계없이 React는 참조를 기본 뷰에 저장한다. 이 리스트를 변경하면 React는 변경된 사항을 결정해야한다.

아래 데이터에서 

```
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

아래처럼 변경되는 것을 상상해보자.

```
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```

인간의 눈에는 Alexa와 Ben의 위치가 바뀌었고 Claudia가 추가된 것처럼 보일 수 있다. 그러나 React는 알 수 없어서 목록의 각 요소에 대해 키 속성을 지정하도록 요구하고있다. 이 경우 alexa, ben, claudia는 키가 될 수 있다. 항목이 데이터베이스의 개체에 해당하는 경우 일반적으로 데이터베이스 ID라고 생각하면 된다.

```
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

`key`는 React에 의해 예약된 특별한 프로퍼티이다. 키값을 `this.props.key`로 바로 참조할 수 없다. React는 key를 자동으로 사용하여 업데이트할 자식을 결정한다. 컴포넌트가 key에 대해 질의할 방법은 없다.

list가 다시 렌더링될 때, React는 새로운 버전의 리스트와 이전 버전의 리스트의 key가 매칭되는지 찾는다. key가 추가된다면 컴포넌트가 생성되고, key가 삭제될경우 컴포넌트가 삭제된다. 키는 React에서 각 컴포넌트의 신원을 알려서 다시 랜더링될때 전체에서 상태를 유지할 수 있도록 해준다. 구성요소의 키를 변경하면 삭제되었다가 새로 추가된다.

*동적으로 list를 작성할 때마다 적절한 key를 할당하는 것이 좋다.* 적절한 키가 없으면 데이터를 재구성해라.

키를 지정하지 않으면 React에서 경고를 하고, 배열 인덱스를 키로 사용할 것이다. 리스트를 재정리하거나 항목의 맨 아래에있는 항목을 추가 / 제거하는 경우 올바른 선택이 아니다. `key={i}`로 명시하면 같은 문제가 발생하여 추천하지 않는다.
키는 전역적으로 고유할 필요는 없고 리스트와 관련하여 고유해야한다.