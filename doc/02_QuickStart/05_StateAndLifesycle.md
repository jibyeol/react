# State and Lifecycle

우리는 화면을 update하기 위해서 `ReactDOM.render()`를 호출했었다.

이번에는 `Clock`을 실제로 재사용하고 캡슐화하는 방법을 알아보자. 자체타이머를 설정하고 매초마다 업데이트한다.

`Clock`을 캡슐화해보자.

```
function Clock(props) {
    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {props.date.toLocaleTimeString()}.</h2>
        </div>
    );
}

function tick() {
    ReactDOM.render(
        <Clock date={new Date()} />,
        document.getElementById('root')
    );
}

setInterval(tick, 1000);
```

타이머로 매초마다 UI를 업데이트하지 않고 구현하려면 `Clock` component에 "state"를 추가해야한다.

## Converting a Function to a Class

1. `React.Component`를 확장하는 ES6 클래스를 만든다.
2. 해당 클래스에 빈 메서드 `render()`를 추가한다.
3. 함수 바디를 `render()`에 이동한다.
4. `render()`에 `props`를 `this.props`로 변경한다.
5. 나머지 빈 함수 선언을 삭제한다.

```
class Clock extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
            </div>
        )
    };
}
```

이제 함수가 아닌 클래스로 로컬 상태 및 라이프 사이클 후크와 같은 기능을 사용할 수 있다.

## Adding Local State to a Class

1. `this.props.date`를 `this.state.date`로 바꾼다.

```
class Clock extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        )
    };
}
```

2. 클래스에 생성자를 추가한다.

```
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date : new Date()};
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        )
    };
}
```

클래스 component는 항상 기본 생성자를 호출해야한다.

3. `<Clock />` element에서 `data`는 제거해라

```
ReactDOM.render(
    <Clock />, 
    document.getElementById('root')
);
```

## Adding Lifecycle Methods to a Class

DOM이 처음으로 렌더링 될 때마다 타이머를 설정하려고 한다. 이것을 React에서 "mounting"라고 한다.
DOM이 제거될 때마다 타이머를 지워야하는데, 이것은 React에서 "unmounting"이라고 한다.

```
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date : new Date()};
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        )
    };
}
```

component가 mounts, unmounts을 하기 위해서 특수 메소드를 선언한다. 이런 방법을 "Life cycle"이라고 한다.

`componentDidMount()` 후크는 component가 렌더링된 후에 호출된다. 타이머를 설정하기 좋은 장소이다.

 ```
componentDidMount() {
    this.timerID = setInterval(
        () => this.tick(),
        1000
    );
}
```

`this.props`는 React 자체에 의해 설정되고, `this.state`는 특별한 의미가 있다. 시각적 출력에 사용되지 않는 것을 저장할 때에는 수동으로 필드를 추가할 수 있다.

`render()`에서 사용되지 않는 것은 `this.state`에 추가될 수 없다.

`componentWillUnmount()` 라이프 사이클 후크에서 타이머를 종료한다.

```
componentWillUnmount() {
    clearInterval(this.timerID);
}
```

`tick()` 메서드를 구현하자.

```
tick() {
    this.setState({
        date : new Date()
    });
}
```

`setState()`를 호출하면 React는 상태가 변경된 것을 알고 `render()` 메소드를 다시 호출하여 화면에 무엇이 있어야 하는지 학습한다.

## Using State Correctly

`setState()`에 알아야할점

### Do Not Modify State Directly

```
// wrong
this.state.comment = 'Hello';
```

이렇게 직접 바꾸면 다시 렌더링되지 않는다.

```
// correct
this.setState({comment : 'Hello'});
```

`setState()`를 사용하자. 직접 할당할 수 있는 유일한 곳은 생성자이다.

### State Updates May Be Asynchronous

