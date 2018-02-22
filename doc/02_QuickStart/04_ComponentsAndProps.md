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

```
function Comment(props) {
    return (
        <div className="Comment">
            <div className="UserInfo">
                <img className="Avatar"
                    src={props.author.avatarUrl}
                    alt={props.author.name}
                />
                <div className="UserInfo-name">
                    {props.author.name}
                </div>
            </div>
            <div className="Comment-text"> 
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}
```

위 구조는 'author'(객체), 'text'(문자열), 'date'(날짜)를 props로 받고 웹사이트를 설명하고 있다.
이 component는 변경이 힘들고 재사용도 힘들다. 몇가지 component를 추출해보자.

```
function Avatar(props) {
    return (
        <img className="Avatar"
            src={props.user.avatarUrl}
            alt={props.user.name}
        />
    );
}
```

`Avatar`는 `Comment`가 어떻게 렌더링 되는지 알 수 없다. 그래서 `author`에서 `user`로 바꾸었다.

```
function Comment(props) {
    return (
        <div className="Comment">
            <div className="UserInfo">
                <Avatar user="props.author" />
                <div className="UserInfo-name">
                    {props.author.name}
                </div>
            </div>
            <div className="Comment-text"> 
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}
```

`UserInfo`를 추출해보자.

```
function UserInfo(props) {
    return (
        <div className="UserInfo">
            <Avatar user="props.user" />
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}

function Comment(props) {
    return (
        <div className="Comment">
            <UserInfo user={props.author} />
            <div className="Comment-text"> 
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}
```

이제 재사용가능하게 분리되었다.

## Props are Read-Only

component가 함수든 클래스든 props는 수정해서는 안된다.

```
function sum(a,b) {
    return a + b;
}
```

이런 함수는 입력을 변경하지 않고 동일한 입력에 대해 동일한 결과를 반환해서 "pure"라고 한다.

```
function withdraw(account, amount) {
    account.total -= amount;
}
```

이 함수는 순수하지 않다.

**모든 React 구성 요소는 소품과 관련하여 순수한 기능처럼 작동해야한다.**