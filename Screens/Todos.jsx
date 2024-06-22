import React, {useEffect, useState} from 'react';
import {EditTodo} from '../component/EditTodo';
import {RenderTodo} from '../component/RenderTodo';
import {EnterTodo} from '../component/EnterTodo';
import {useRoute} from '@react-navigation/native';
import database, {firebase} from '@react-native-firebase/database';

const Todo = () => {
  const {uid, email} = useRoute().params;
  console.log('params', {uid, email});
  const [todo, setTodo] = useState([]);
  const [edit_val, set_edit_val] = useState({});
  const [edit_input, set_edit_input] = useState(false);

  // console.log('todo', typeof todo, todo);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    database()
      .ref(`users/${uid}/`)
      .on('value', snapshot => {
        const data = snapshot.val() && Object.values(snapshot.val());
        setTodo(data);
      });
  };

  const addTodo = value => {
    const {key} = firebase.app().database().ref().push();
    firebase
      .app()
      .database()
      .ref(`users/${uid}/${key}`)
      .set({value, key})
      // .then(res => )
      .catch(err => console.log('err', err));
    // console.log(key);
    getData();
  };

  const delAll = () => {
    firebase.app().database().ref(`users/${uid}/`).remove();
  };

  const del = key => {
    firebase.app().database().ref(`users/${uid}/${key}`).remove();
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
      <EnterTodo addTodo={addTodo} delAll={delAll} />
    </>
  );
};

export {Todo};
