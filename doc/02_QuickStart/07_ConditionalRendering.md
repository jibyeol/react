# Conditional Rendering

```
function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}
```

`Greeting` 사용자가 로그인했는지에 따라서 다른 component를 표시하는 component를 만들자.

```
function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn) {
        return <UserGreeting />;
    } else {
        return <GuestGreeting />;
    }
}

ReactDOM.render(
    <Greeting isLoggedIn={false} />,
    document.getElementById('root')
);
```

`isLoggedIn` prop의 값에 따라서 다른 인사말이 렌더링된다.

## Element Variables

로그아웃 및 로그인 버튼을 나타내는 구성요소를 만들어보자.

```
function LoginButton(props) {
    return (
        <button onClick={props.onClick}>Login</button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>Logout</button>
    );
}
```

`LoginControl`을 만드는데, 여기서 `<LoginButton />` 또는 `<LogoutButton />`이 상태에 따라서 달라진다.

```
class LoginControl extends React.Component {
    constructor (props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn : false};
    }

    handleLoginClick() {
        this.setState({
            isLoggedIn : true
        });
    }

    handleLogoutClick() {
        this.setState({
            isLoggedIn : false
        });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button = null;
        if(isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }
        return(
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}
```

## Inline If with Logical && Operator

JSX에서 중괄호로 묶어서 표현식을 삽입할 수 있다. `&&`연산자를 이용해서 편리하게 요소를 추가할 수 있다.

```
function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 && 
                <h2>
                    You have {unreadMessages.length} unread messages.
                </h2>
            }
        </div>
    );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('root')
);
```

`true && expression`에서는 항상 `expression`이 실행된다. `false && expression`에서는 `expression`이 무시된다. 따라서 위 조건이 맞아야 다음 요소가 출력된다.

## Inline If-Else with Conditional Operator

element를 인라인으로 조건부 렌더링하는 방법은 `condition ? true : false` 이다.

```
render() {
    const inLoggedIn = this.state.isLoggedIn;
    return(
        <div>
            The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
        </div>
    );
}
```

또는 큰 표현을 위해 아래처럼 할 수 있다.

```
render() {
    const inLoggedIn = this.state.isLoggedIn;
    return(
        <div>
            {isLoggedIn ? (
                <LogoutButton onClick={this.handleLogoutClick} />
            ) : (
                <LoginButton onClick={this.handleLoginClick} />
            )}
        </div>
    );
}
```

편한 방법을 사용하면 되고, 조건이 너무 복잡해질 경우에는 component를 추출하는 것이 좋다.

## Preventing Component from Rendering

component가 다른 component에 의해서 렌더링 되었더라도 자체를 숨길 경우는 렌더링 출력 대신에 `null`을 반환한다.

```
function WarningBanner(props) {
    if(!props.warn) {
        return null;
    }

    return (
        <div className="warning">
            Warning!
        </div>
    )
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state ={showWarning : true};
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(prevState => ({
            showWarning : !prevState.showWarning
        }));
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);
```

component의 `render`메소드에서 `null`을 반환해도 component의 수명주기 메서드가 실행되는데 영향을 주지 않는다. (`componentWillUpdate` or `componentDidUpdate`)