import React, { useReducer } from "react";

const INCREMENT = "increment";
const DECREMENT = "decrement";

const reducer = (state, action) => {
  console.log("state", state);
  console.log("action", action);
  // 리턴 값 = 새로운 state가 된다.(기존 state가 대체됨)
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

function App() {
  // dispatch: reducer에게 입력된 매개변수를 전달 + reducer 함수 실행
  // reducer : dispatch의 입력값에 따라 기존 state를 가공하여 새로운 state를 출력하는 역할
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: INCREMENT })}>Add</button>
      <button onClick={() => dispatch({ type: DECREMENT })}>Remove</button>
    </>
  );
}

export default App;
