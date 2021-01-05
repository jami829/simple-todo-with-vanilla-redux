import { createStore } from "redux";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// action을 함수화 시켜서 재사용성을 높이자.
// dispatch 할 때 함수만 입력하면 된다. 
const addToDo = text => {   // 파라미터인 text에 추후 새로 작성된 todo가 입력될것임. onSubmit 함수 잘 볼 것.
  return {
    type: ADD_TODO,
    text
  };
};
const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};

const reducer = (state = [], action) => {
  // console.log(action)
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];  // 원형 배열이 절대 변형되면 안된다.(immutable), .text는 29번줄으로부터 왔음.
    case DELETE_TODO:
      return [];
    default:
      return state;
  }
};

const store = createStore(reducer);


const onSubmit = e => {
  e.preventDefault();

  const toDo = input.value;
  input.value = ""  // 다시 초기화
  store.dipatch({ type: ADD_TODO, text: toDo }); // reducer의 action으로 전달이 되어 새로운 인풋밸류로 상태를 업데이트 시킬 것임.
};

form.addEventListener("submit", onSubmit);