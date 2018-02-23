# Handling Events

React element를 사용하여 이벤트를 처리하는 것은 DOM 요소에서 이벤트를 처리하는 것과 유사하다.

* React 이벤트는 소문자가 아닌 camelCase를 사용하여 이름을 짓는다.
* JSX에서 문자열이 아닌 이벤트 처리기로 함수를 전달한다.

HTML

```
<button onClick="activeLasers()">
    ActiveLasers
</button>
```

React

```
<button onClick={activeLasers}>
    ActiveLasers
</button>
```

또 다른 차이점은 React에서 기본 동작을 방지하기 위해 `false`를 반환할 수 없다. `preventDefault()`를 명시적으로 호출해주어야 한다.

HTML

```
<a href="#" onClick="console.log('The link was clicked.); return false;">
    Click Me
</a>
```

React

```
function ActionLink(){
    function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked');
    }

    return (
        <a href="#" onClick={handleClick}>
            Click Me
        </a>
    )
}
```

여기서 `e`는 합성 이벤트이다.(Synthetic Event)

React를 사용할 때 일반적으로 `addEventListener`를 호출하여 리스너에 등록해줄 필요가 없다. 대신 element가 처음 렌더링될 때 리스너를 제공해주어야한다.

ES6 클래스를 사용하는 component를 정의할때 공동 패턴은 이벤트 핸들러가 클래스 메소드가 되게 하는 것이다. 

```
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn : true};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn : !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
);
```

JSX에서 `this`의 의미를 잘 알아야한다. JavaScript에서 class methods는 default로 bind되지 않는다. `this.handleClick`을 바인딩하는 것을 잊어버리고 `onClick`에 전달하면 실제로 함수를 호출할 때 `this`는 `undefined`가 될 것이다.

이건 React와 관련된 행동이 아니고 JavaScript와 관련된 것이다. 일반적으로 `onClick={this.handleClick}`처럼 호출하지 않고 메소드를 참조하면 메소드를 바이딩해주어야한다.

`bind`를 호출하는 것이 귀찮은 경우 public lass fields syntax을 사용할 때 클래스 필드를 사용하여 콜백을 올바르게 바인딩할 수 있다.

바인드 설명!

```
this.x = 9;    // this refers to global "window" object here in the browser
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();   
// returns 9 - The function gets invoked at the global scope

// Create a new function with 'this' bound to module
// New programmers might confuse the
// global var x with module's property x
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```

```
class LoggingButton extends React.Component {
    // This syntax ensures `this` is bound within handleClick
    // Warning : this is experimental syntax
    handleClick = () => {
        console.log('this is : ', this);
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Click Me
            </button>
        )
    }
}
```