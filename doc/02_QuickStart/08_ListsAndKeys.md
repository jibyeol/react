# Lists and Keys

```
const numbers = [1, 2, 3, 4, 5];
const double = numbers.map((number) => number * 2);
console.log(double); // [2, 4, 6, 8, 10]
```

## Rendering Multiple Components

element collection을 빌드하고 중괄호(`{}`)를 사용하여 JSX에 포함할 수 있다.

```
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => 
    <li>{number}</li>
);

// listItems 내부에 전체 배열을 포함시키고 DOM에 렌더링한다.
ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
);
```

## Basic List Component

```
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => 
        <li>{number}</li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);
```

(Warning: Each child in an array or iterator should have a unique "key" prop.)
이 코드는 key가 제공되어야한다고 경고문이 뜬다. "key"는 요소의 목록을 만들 때 포함해야한다.

`numbers.map()`내부의 목록 element에 `key`를 지정하자.

```
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => 
        <li key={number.toString()}>
            {number}
        </li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);
```

warning이 없어졌다.

## Keys 

변경사항, 추가, 제거된 항목을 확인해야한다. element에 안정적인 id를 제공하려면 배열 내부에 key를 지정해 주어야한다.

```
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => 
    <li key={number.toString()}>
        {number}
    </li>
);
```

키를 선택할 때에는 고유하게 식별하는 문자열을 사용한다. 대부분 데이터의 ID로 사용한다.

```
const todoItems = todo.map((todo) => 
    <li key={todo.id}>
        {todo.text}
    </li>
);
```

안정적인 ID가 없는 경우 index를 키로 사용할 수 있다.

```
const todoItems = todo.map((todo, index) => 
    <li key={index}>
        {todo.text}
    </li>
);
```
항목의 순서가 변경되는 경우에 index를 키로 사용하지 않는 것이 좋다. 이로서 성능이 저하되고 상태에 문제가 발생할 수 있다.

## Extracting Components with Keys

`ListItem` component를 추출하는 경우 `ListItem`자체의 `<li>` 요소가 아니라 배열의 `<ListItem />` 요소에 키를 보관해야한다.

잘못된 키사용 예

```
function ListItem(props) {
    const value = props.value;
    return (
        // Wrong!
        <li key={value.toString()}>
            {value}
        </li>
    );
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => 
        // Wrong!!
        <ListItem value={number} />
    );
    return (
        <ul>
            {listItems}
        </ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);
```

올바른 예

```
function ListItem(props) {
    return <li>{props.value}</li>;
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => 
        // Wrong!!
        <ListItem key={number.toString()} 
                value={number} />
    );
    return (
        <ul>
            {listItems}
        </ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);
```

## Keys Must Only Be Unique Among Siblings

key는 글로벌하게 unique할 필요 없지만 형제들 사이에서는 unique해야한다. 두 개의 다른 배열을 생성할 때에 동일한 키를 사용할 수 있다.

```
function Blog(props) {
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
                <li key={post.id}>
                    {post.title}
                </li>
            )}
        </ul>
    );
    const content = props.posts.map((post) => 
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );
    return (
        <div>
            {sidebar}
            <hr />
            {content}
        </div>
    );
}

const posts = [
    {id:1, title:'Hello World', content:'Welcome to learning React!'},
    {id:2, title:'Installation', content:'You can install React from npm.'}
];
ReactDOM.render(
    <Blog posts={posts} />,
    document.getElementById('root')
);
```

키는 React에서 힌트 역할이지만 component로 전달되지는 않는다. component에 동일한 값이 필요하면 명시적으로 다른 이름의 porp로 전달해야한다.

```
const content = posts.map((post) => 
    <Post
        key={post.id}
        id={post.id}
        title={post.title} />
);
```

위의 예에서 `Post`에서 `props.id`는 읽을 수 있지만 `props.key`는 읽을 수 없다.