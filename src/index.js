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
const deleteToDo = id => {  // 아래 dispatch 함수화한 곳에서 파라미터를 id로 받고, id의 할당까지 할 것. 그 id를 사용할 예정
  return {
    type: DELETE_TODO,
    id
  };
};

const reducer = (state = [], action) => {  // return 되는 것들은 store에 저장이 되고, application의 최종 최근 상태값.
  // console.log(action)
  console.log("state", state) // 파라미터로 들어간 state = [] 은 정말 처음 시작할 때의 설정 값이고, action으로 변경된 값이 state값으로 변경되는 것을 확인할 수 있다.
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];  // 원형 배열이 절대 변형되면 안된다.(immutable), .text는 29번줄으로부터 왔음.
    case DELETE_TODO:
      return state.filter(toDo => toDo.id !== action.id);  // 원형 배열을 변형시키면 안되므로 filter를 사용함. & reducer이 초깃값 호출 1번, action으로 변형된 값(dispatch함수에서 전달된 id) 1번 총 2번 호출되는 것을 이용 => action.id값도 두번째 호출될 때 새롭게 적용될 것. cf) action은 55번째 btn 클릭이벤트로 dispatch가 되면서 reducer함수가 불려와지면서 실행될 것임
    default:                                               // 같지 않다면 true로 살아남고, 같다면 false로 버려질 것임, "같다면 false"를 이용한 것.
      return state;
  }
};


const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

// action을 reducer 함수에 전달하기
const dispatchAddToDo = text => {  // text는 onSubmit에서 설정이 될 것임.
  store.dispatch(addToDo(text));
};
const dispatchDeleteToDo = e => {  // reducer의 action으로 전달될 것임.
  const id = parseInt(e.target.parentNode.id); // console.log(e.target) ==> btn  // id는 string일 것. 상단의 Date.now는 숫자. 따라서 파싱을 해줘야함. reducer의 action으로 전달하기 위해선!
  store.dispatch(deleteToDo(id))
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerText = ""; // 새로운 todo를 생성할 때마다 ul태그 초기화 (초기화 안하면 기존 todo가 새로운 todo와 같이 또 추가됨.)
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "삭제";
    btn.addEventListener("click", dispatchDeleteToDo); // reducer 함수 내에서 액션까지 실행시킬것임.
    li.id = toDo.id; // toDo는 forEach toDos의 각 item이고, id는 ADD_TODO action 함수에서 지정한 것.
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

// paintTodos가 store에서 변화되고 있는 것을 살펴보자
// 구독을 안하면 렌더자체가 안됨.
store.subscribe(paintToDos);


store.subscribe(() => console.log(store.getState()));

const onSubmit = e => {
  e.preventDefault();

  const toDo = input.value;
  input.value = ""  // 다시 초기화
  // reducer의 action으로 전달이 되어 새로운 인풋밸류로 상태를 업데이트 시킬 것임.
  // store.dispatch({ type: ADD_TODO, text: toDo }); 
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);