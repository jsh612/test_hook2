import React, { useReducer, useState } from "react";
import reducer, {
  initialState,
  ADD,
  DEL,
  COMPLETE,
  UNCOMPLETE
} from "./reducer";

function App() {
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
            <span
              role="img"
              aria-label=""
              onClick={() => dispatch({ type: DEL, payload: toDo.id })}
            >
              ❌
            </span>
            <span
              role="img"
              aria-label=""
              onClick={() => dispatch({ type: COMPLETE, payload: toDo.id })}
            >
              ✅
            </span>
          </li>
        ))}
      </ul>
      <ul>
        {state.completed.length !== 0 && (
          <>
            <h2>Completed</h2>
            {state.completed.map(toDo => {
              console.log("toDo", toDo);
              return (
                <li key={toDo.id}>
                  <span>{toDo.text}</span>
                  <span
                    role="img"
                    aria-label=""
                    onClick={() => dispatch({ type: DEL, payload: toDo.id })}
                  >
                    ❌
                  </span>
                  <span
                    role="img"
                    aria-label=""
                    onClick={() =>
                      dispatch({ type: UNCOMPLETE, payload: toDo.id })
                    }
                  >
                    🙅🏼‍♂️
                  </span>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </>
  );
}

export default App;
