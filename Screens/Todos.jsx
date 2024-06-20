import React, {useState} from 'react';
import {EditTodo} from '../component/EditTodo';
import {RenderTodo} from '../component/RenderTodo';
import {EnterTodo} from '../component/EnterTodo';

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [edit_val, set_edit_val] = useState({});
  const [edit_input, set_edit_input] = useState(false);
  // console.log("todo", typeof todo,todo)

  const del = i => {
    const arr = todo;
    arr.splice(i, 1);
    setTodo([...arr]);
  };
  const edit = i => {
    set_edit_val({val: todo[i], index: i});
    set_edit_input(true);
  };
  const edit_cancel = () => {
    set_edit_input(false);
  };

  const edit_done = i => {
    console.log('i', i);
    if (JSON.stringify(i) == '{}') {
      set_edit_input(false);
      setTodo([...todo]);
    } else {
      const {index} = edit_val;
      todo[index] = i;
      setTodo([...todo]);
      set_edit_input(false);
    }
  };

  return edit_input ? (
    <EditTodo
      defaultValue={edit_val.val}
      edit_done={edit_done}
      edit_cancel={edit_cancel}
    />
  ) : (
    <>
      <RenderTodo todo={todo} edit={edit} del={del} />
      <EnterTodo
        addTodo={val => setTodo([...todo, val])}
        delAll={() => setTodo([])}
      />
    </>
  );
};

export {Todo};
