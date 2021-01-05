import { createStore } from "redux";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state = [], action) => {
  // console.log(action)
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];  // 원형 배열이 절대 변형되면 안된다.(immutable), .text는 29번줄으로부터 왔음.
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