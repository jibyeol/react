# Hello World

```
create-react-app my-app
cd my-app
npm start
```

가장 작은 React 예시는 다음과 같다.

```
ReactDOM.render(
    <h1>Hello, world!</h1>
    document.getElementById('root')
);
```

이것은 "Hello, workd!"를 렌더링할 것이다.

ES6의 arrow functions, classes, template literals, let, const 에 익숙해 져야한다.

# Java Script tutorial

## Numbers

JavaScript의 숫자는 다음과 같다.

```
0.1 + 0.2 == 0.30000000000000004;
```

실제로 정수 값은 32 비트 정수로 처리된다.

`Math` 고급 수학 함수와 상수를 제공하는 내장 객체도 있다.

```
Math.sin(3.5);
var circumference = 2 * Math.PI * r;
```

`parseInt(str, 몇진수)` 함수를 사용하여 문자열을 정수로 변환할 수 있다.

```
parseInt('123', 10); // 123
parseInt('010', 10); // 10
parseInt('101011', 2); // 43
```

"0"으로 시작하면 8진수, "0x"로 시작하면 16진수이다.

```
parseInt('010'); // 8 (8진수))
parseInt('0x10'); // 16 (16진수)
```

마찬가지로 내장 `parseFloat()`함수로 소수점 수를 분석할 수 있다.
단항 `+` 연산자를 사용하여 값을 숫자로 변환할 수도 있다.

```
+ '42'; // 42
+ '010'; // 8
+ '0x10'; // 16
```

문자열이 아닌경우 `Nan`이 반환된다.

```
parseInt('hello', 10); // NaN
NaN + 5; // NaN
isNaN(NaN); // true : NaN인지 확인하는 내장함수
+ NaN; // NaN
```

또한 `Infinity`와 `-Infinity`의 값도 있다.

```
1 / 0; // Infinity
-1 / 0; // -Infinity
isFinity(1/0); // false
isFinity(-Infinity); // false
isFinity(NaN); // false
```

## Strings

UTF-16 코드 단위의 시퀀스.

```
'hello'.length; // 5
'hello, world'.replace('hello', 'goodbye'); "goodbye, world"
'hello, world'.replace('o', '5'); // "hell5, world"
'hello'.toUpperCase(); // "HELLO"
```

## Other types

값이 없음을 나타내는 `null`과 초기화되지 않은 `undefined`는 다르다. 변수를 선언하고 초기화하지 않았다면 `undefined`가 된다. `undefined`는 실제로 상수이다.

`Boolean`은 `true`와 `false`의 값을 갖는다. 모든 값은 부울로 변환할 수 있다.
1. `false`, `0`, 빈 문자열(`""`), `NaN`, `null`, `undefined` 모두가 `false`이다.
2. 다른 모든 값은 `true`이다.

```
Boolean(''); // false
Boolean(234); // true
```

## Variables

JavaScript에서 `let`, `const`, `var` 키워드 중 하나를 사용하여 변수를 선언한다.

`let`은 블록 수준의 변수를 선언한다.

```
let a;
let name = 'Simon';
```

```
// myLetVariable은 여기서 표시되지 않는다.
// myLetVariable에 접근하면 에러남 : Uncaught ReferenceError: myVarVariable is not defined

for (let myLetVariable = 0; myLetVariable < 5; myLetVariable++) {
    // myLetVariable은 오직 여기만 표시된다.
}

// myLetVariable은 여기서 표시되지 않는다.
// myLetVariable에 접근하면 에러남 : Uncaught ReferenceError: myVarVariable is not defined
```

`const`는 변경하지 않으려는 변수를 선언할 수 있고 변수는 선언된 블록에서만 사용된다.

```
const Pi = 3.14; // Pi가 설정됨
Pi = 1; // Error!! - Uncaught TypeError: Assignment to constant variable.

const constVariable; // Error!! - Uncaught SyntaxError: Missing initializer in const declaration
```

`var`는 가장 일반적인 선언 키워드이다. 다른 두 키워드의 제한사항이 없다. `var`키워드로 선언된 변수는 선언된 함수에서 사용할 수 있다.

```
var a;
var name = 'Simon';
```

```
console.log("pre for : " + myVarVariable); // undefined

for (var myVarVariable = 0; myVarVariable < 5; myVarVariable++) { 
  console.log("in for : " + myVarVariable); // 1,2,3,4,5
} 

console.log("post for : " + myVarVariable); // 5
```

JavaScript와 Java의 중요한 차이점은 JavaScript에서 블록에는 범위가 없다는 것이다. 오직 함수에만 범위가 있다. 그러나 `let`이나 `const`를 사용하면 블록 범위의 변수를 만들 수 있다.

## Operators

TODO : 이어서 하기!

# ES6

## Arrow functions

Basic Syntax

```
(param1, param2, ..., paramN) => { statements }
(param1, param2, ..., paramN) => expression // {return expression;} 과 같음

// 파라미터가 하나인 경우 괄호는 없애도 된다.
(singleParam) => {statements}
singleParam => {statements}

// 파라미터가 없으면 괄호는 작성해주어야한다.
() => {statements}
```

Advanced Syntax

```
// 함수의 body를 괄호로 묶어서 객체를 반환한다.
params => ({foo : bar})

// Rest parameters와 default parameters가 지원된다.
(param1, param2, ...rest) => {statements}
(param1 = defaultValue1, param2, ..., paramN = defaultValueN) => {statements}

// 파라미터 목록에서 destructuring도 지원된다.
var f = ([a, b] = [1, 2], {x : c} = {x : a + b}) => a + b + c;
f();
```

## classes

```
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}
```

### Hoisting

함수 선언과 클래스 선언 사이의 중요한 차이점은 Hoisting이다. 함수는 호출하고 선언해도 되지만, 클래스는 선언 전에 호출하면 ReferenceError 에러난다.

```
var p = new MyClass(); // Uncaught ReferenceError: MyClass is not defined
class MyClass{}
```

```
// unnamed
var Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};

// named
var Rectangle = class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
```