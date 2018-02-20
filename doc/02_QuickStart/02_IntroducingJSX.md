# Introducing JSX

```
const element = <h1>Hello, world!</h1>;
```

위 태그구문은 string도 HTML도 아니다.

이건 JSX라고 불리고 JavaScript의 구문 확장이다. JSX는 JavaScript의 모든 기능을 제공한다. JSX는 React의 "elements"를 생성한다.

## Why JSX?

React의 렌더링 로직에는 UI로직과 본질적으로 결합되어있다. 즉, 이벤트 처리, 시간 경과에 따른 상태 변경, 데이터 표시 준비방법을 포함한다.
React는 마크업과 로직을 포함하는 "components"라고 불리는 느슨하게 연결된 유닛과 관심사를 분리한다.
React에서 JSX를 사용할 필요는 없지만 대부분 JavaScript 내부의 UI로 작업할 때 시작적으로 도움된다고 생각한다. 또한 React가 유용한 오류 및 경고를 표시할 수 있다.

## Embedding Expressions in JSX

JavaScript 표현식을 중괄호로 묶어 JSX에 삽입할 수 있다.

```
function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName : 'Harper',
    lastName : 'Perez'
};

const element = (
    <h1>
        Hello, {formatName(user)}
    </h1>
);

ReactDOM.render(
    element,
    document.getElementById('root')
);
```

JSX는 () 괄호로 묶어주는 것이 좋다.

## JSX is an Expression Too

컴파일이 끝나면 JSX식이 정규 JavaScript 함수 호출이되고 JavaScript 객체로 포현된다. 즉, JSX를 `if`와 `for`루프 안에서 사용할 수 있고, 변수에 할당하고, 인수로 받아 들여 함수에서 반환할 수 있다.

```
function getGreeting(user) {
    if(user) {
        return <h1>Hello, {format(user)}!</h1>
    }
    return <h1>Hello, Stranger!</h1>
}
```

## Specifying Attributes with JSX

따옴표를 사용하여 문자열 리터럴을 속성으로 지정할 수 있다.

```
const element = <div tabIndex="0"></div>;
```

중괄호를 사용하여 속성에 JavaScript 표현식을 포함시킬 수도 있다.

```
const element = <img src={user.avatarUrl}></img>;
```

속성에 JavaScript 표현식을 포함할 때 중괄호를 따옴표를 묶으면 안된다. 따옴표(문자열 ..) 혹은 중괄호(표현식) 중 하나만 사용하자!

JSX는 HTML보다 JavaScript에 가까워서 React DOM은 `camelCase` 속성 명명규칙을 사용한다.
예를 들어서 `class`는 JSX에서 `className`이 되고, `tabindex`는 `tabIndex`가 된다.

## Specifying Children with JSX

태그가 비어있는 경우 XML 처럼 `/>`로 바로 닫을 수 있다.

```
const element = <img src={user.avatarUrl} />;
```

JSX 태그에는 자식이 포함될 수 있다.

```
const element = (
    <div>
        <h1>Hello!</h1>
        <h2>Good to see you here.</h2>
    </div>
);
```

## JSX Prevents Injection Attacks

사용자 입력을 JSX에 포함하는 것이 안전하다.

```
const title = response.potentiallyMaliciousInput;
// This is safe : 
const element = <h1>{title}</h1>
```

React DOM은 렌더링하기 전에 임베디드된 모든 값을 이스케이프 처리한다. (&:&amp;, <:&lt; >:&gt;) 따라서 XSS(cross-site-scripting)공격을 방지할 수 있다.

## JSX Represents Objects

Bebel은 JSX를 React.createElement() 호출하여 컴파일한다.

아래 두 예제는 동일하다.

```
const element = (
    <h1 className="greeting>
        Hello, world!
    </h1>
);
```

```
const element = React.createElement(
    'h1',
    {className : 'greeting'},
    'Hello, world!'
);
```

React.createElement()는 버그 없는 코드를 작성하는데 도움이되는 몇가지 검사를 수행하지만 기본적으로 다음과 같은 객체를 만든다.

```
// Note : 단순
const element = {
    type : 'h1',
    props : {
        className : 'greeting',
        children : 'Hello, world'
    }
};
```

이런 객체를 "React elements'라고 한다. React는 이런 객체를 읽고 DOM을 구성하고 최신 상태로 유지한다.