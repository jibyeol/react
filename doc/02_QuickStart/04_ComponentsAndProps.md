# Components and Props

component를 사용하여 UI를 독립적이고 재사용 가능한 부분으로 분리하고 각 부분을 개별적으로 생각할 수 있다.

개념 상 component는 JavaScript의 함수와 같다. component는 임의의 입력(props)을 받고 무엇이 화면에 나타나야 하는지를 설명하는 React elements를 반환한다.

## Functional and Class Components

component를 정의하는 가장 간단한 방법은 JavaScript function을 작성하는 것이다.

```
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```

이 함수는 하나의 "props"를 받고 React element를 반환해서 유효한 React component이다. ES6 클래스를 사용하여 componenet를 정의할 수도 있다.

```
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```

위 두개는 React 관점에서 동일하다.

## Rendering a Component

```
const element = <Welcome name="sara" />;
```

DOM 태그를 나타내는 React 요소만 있었지만, 사용자 정의 component도 나타낼 수 있다. React가 사용자 정의 component를 나타내는 element를 볼 때 JSX 속성을 이 component에 단일 객체로 전달한다. 이 객체는 "props"이다.

```
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="sara" />;
ReactDOM.render(element, document.getElementById('root'));
```

이 코드는 "Hello, Sara"를 렌더링한다.

1. `ReactDOM.render()`는 `<Welcome name="Sara" />` element를 호출한다.
2. React는 `Welcome` component를 `{name : 'Sara'}` props으로 호출한다.
3. `Welcome` component는 `<h1>Hello, Sara</h1>`결과로 element를 반환한다.
4. React DOM은 효율적으로 일치하도록 DOM을 `<h1>Hello, Sara</h1>`로 업데이트한다.

element의 이름은 항상 대문자로 시작하자. React는 소문자로 시작하는 component를 DOM 태그로 처리한다.

## Composing Components

component는 출력에서 다른 component를 참조할 수 있다.

```
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

function App(){
    return (
        <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```

일반적으로 React 앱에서 맨위에 단일 'App' component가 있다.

## Extracting Components

