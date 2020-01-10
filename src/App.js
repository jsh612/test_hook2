import React, { useReducer, useState } from "react";
import uuid from "uuid/v4";

const ADD = "add";
const DEL = "del";

const reducer = (state, action) => {
  // → action : dispatch에서 쏴준값들이 들어간다

  switch (action.type) {
    case ADD:
      return { toDos: [...state.toDos, { text: action.payload, id: uuid() }] };
    case DEL:
      return { toDos: state.toDos.filter(toDo => toDo.id !== action.payload) };
    default:
      return;
  }
};

function App() {
  const initialState = { toDos: [] };
  // dispatch: reducer에게 입력된 매개변수를 전달(reducer의 action에 할당됨) + reducer 함수 실행
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
          <li key={index}>
            <span>{toDo.text}</span>
            <button onClick={() => dispatch({ type: DEL, payload: toDo.id })}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
