import React, { useReducer, useState } from "react";

const initialState = { toDos: [] };
const ADD = "add";

const reducer = (state, action) => {
  // → action : dispatch에서 쏴준값들이 들어간다
  switch (action.type) {
    case ADD:
      return { toDos: [...state.toDos, { text: action.payload }] };
    default:
      return;
  }
};

function App() {
  // dispatch: reducer에게 입력된 매개변수를 전달 + reducer 함수 실행
  // reducer : dispatch의 입력값에 따라 기존 state를 가공하여 새로운 state를 출력하는 역할

  const [state, dispatch] = useReducer(reducer, initialState); // 데이터 누적용도

  const [newToDo, setNewToDo] = useState(""); // 현재입력값 저장 용도

  const onSubmit = e => {
    e.preventDefault();
    dispatch({ type: ADD, payload: newToDo });
    setNewToDo("");
  };
  const onChange = e => {
    const {
      target: { value }
    } = e;
    setNewToDo(value);
  };
  return (
    <>
      <h2>Add to do</h2>
      <form onSubmit={onSubmit}>
        <input
          value={newToDo}
          type="text"
          placeholder="Write to do"
          onChange={onChange}
        />
      </form>

      <ul>
        <h2>할 일</h2>
        {state.toDos.map((toDo, index) => (
          <li key={index}>{toDo.text}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
