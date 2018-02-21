# Rendering Elements

elements는 app의 가장 작은 블록이다.
elements는 화면에 표시할 내용을 설명한다.

```
const element = <h1>Hello, world!</h1>;
```

## Rendering an Element into the DOM

`<div>`가 HTML 파일의 어딘가에 있다고 가정하자.

```
<div id="root"></div>
```

우리는 이것을 "root" DOM 노드라고 부른다. 그 내부의 모든 것이 React DOM에 의해 관리되기 때문이다.

React로 구축된 애플리케이션은 보통 단일 루트 DOM 노드를 갖는다. React를 기존 앱에 통합하면 원하는 갯수의 root DOM 노드가 있을 수 있다.

React 요소를 루트 DOM 노드로 렌더링하려면 `ReactDOM.render()`에 모두 전달한다.

```
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

## Updating the Rendered Element

element를 만든 후에는 자식 또는 특성을 변경할 수 없다. element 특정 시점의 UI를 나타낸다. UI를 업데이트하려면 새 element를 작성하고 `ReactDOM.render()`에 전달하는 것이다.

```
function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000); // 매초마다 tick() 호출하여 ReactDOM.render()가 호출됨
```

실제로 대부분 `ReactDOM.reander()`는 한번만 호출한다.

## React Only Updates What's Necessary

React DOM은 element와 그 하위 element를 이전 element와 비교하여 필요한 DOM만 업데이트한다. tick예제의 개발자도구로 Elements 탭을 보면 시간 부분만 바뀌는 것을 확인할 수 있다.