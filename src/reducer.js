import uuid from "uuid/v4";
import { ADD, DEL, COMPLETE, UNCOMPLETE } from "./actions";

export const initialState = { toDos: [], completed: [] };

const reducer = (state, action) => {
  // dispatch: reducer에게 입력된 매개변수를 전달(reducer의 action에 할당됨) + reducer 함수 실행
  // reducer : dispatch의 입력값에 따라 기존 state를 가공하여 새로운 state를 출력하는 역할
  // → action : dispatch에서 쏴준값들이 들어간다

  switch (action.type) {
    case ADD:
      return {
        ...state,
        toDos: [...state.toDos, { text: action.payload, id: uuid() }]
      };
    case DEL:
      return {
        ...state,
        toDos: state.toDos.filter(toDo => toDo.id !== action.payload)
      };
    case COMPLETE:
      const target = state.toDos.find(toDo => toDo.id === action.payload);
      return {
        ...state,
        toDos: state.toDos.filter(toDo => toDo.id !== action.payload),
        completed: [...state.completed, target]
      };
    case UNCOMPLETE:
      const aTarget = state.completed.find(toDo => toDo.id === action.payload);
      return {
        ...state,
        completed: state.completed.filter(toDo => toDo.id !== action.payload),
        toDos: [...state.toDos, aTarget]
      };
    default:
      return;
  }
};

export default reducer;
