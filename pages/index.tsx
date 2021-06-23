import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Item from '@components/Item';
import { useMutation, useQuery } from "@apollo/client";
import { CHECK_TODO, CREATE_TODO, DELETE_TODO, GET_TODOS, UPDATE_TODO } from "@utils/querys";
import Alert, { AddFunction } from '@components/alert';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  font-size: 14px;
  position: relative;
  overflow: hidden;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  height: 700px;
  background-color: #B3E5FC;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
`;

interface ITodo {
  id: number;
  content: string;
  success: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function Home() {
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [value, setValue] = useState("");
  const { loading, error, data } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(CREATE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [checkTodo] = useMutation(CHECK_TODO);
  const ref = useRef<null | AddFunction>(null);

  // 전체 리스트
  useEffect(() => {
    if(data?.getTodos) {
      setTodo(data.getTodos);
    }
  }, [data?.getTodos]);

  // 개별 리스트
  // const onGetTodo = useCallback((id) => {
  //   console.log("get", id);
  // }, []);

  // 안내 메시지 열기
  const handleOpen = useCallback((text) => {
    ref.current?.(text);
  }, [ref?.current]);

  // 텍스트 작성
  const onChange = useCallback((e) => setValue(e.target.value), []);

  // 리스트 추가
  const onAddTodo = useCallback( async () => {
    try {
      const { data, errors } = await addTodo({ variables: { content: value } });

      if(errors) {
        throw errors;
      }
  
      if(data?.create) {
        setTodo(state => state.concat(data.create));
      }
    } catch(err) {
      window.alert(err.message);
    } finally {
      setValue("");
    }
  }, [value]);

  // 리스트 수정
  const onUpdateTodo = useCallback( async (id) => {
    try {
      const { data, errors } = await updateTodo({ variables: { id, content: value } });
    
      if(errors) {
        throw errors;
      }

      const newTodo = todo.map(val => {
        if(id === val.id) {
          return {
            ...data.update,
          };
        }

        return {
          ...val,
        };
      });

      setTodo(newTodo);
    } catch(err) {
      window.alert(err.message);
    } finally {
      setValue("");
    }
  }, [value, todo]);

  // 리스트 삭제
  const onDeleteTodo = useCallback( async (id) => {
    try {
      const { data, errors } = await deleteTodo({ variables: { id } });

      if(errors) {
        throw errors;
      }

      const filterdTodo = todo.filter(val => val.id !== id);

      setTodo(filterdTodo);

      handleOpen(data.delete);
    } catch(err) {
      window.alert(err.message);
    } 
  }, [todo, handleOpen]);

  // 체크 변경
  const onCheckTodo = useCallback( async (id, success) => {
    try {
      const { errors } = await checkTodo({ variables: { id, success: !success } });

      if(errors) {
        throw errors;
      }

      const newTodos = todo.map((val) => {
        if(id === val.id) {
          return {
            ...val,
            success: !success,
          };
        }
  
        return {
          ...val,
        };
      });
  
      setTodo(newTodos);
    } catch(err) {
      window.alert(err.message);
    }
  }, [todo]);

  if(loading) {
    return (
      <Container>
        List Loading..
      </Container>
    );
  }

  if(error) {
    return (
      <Container>
        List Get Error !!
      </Container>
    );
  }

  return (
    <Container>
      <Box>
        <div className="flex flex-row items-center mb-5">
          <input value={value} onChange={onChange} className="bg-gray-100 focus:bg-white rounded p-2 w-full mr-2"/>
          <svg onClick={onAddTodo} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="w-full flex flex-col">
          {
            todo.map((val, idx) => {
              return <Item 
                key={idx} 
                checkValue={val.success} 
                checkChange={() => onCheckTodo(val.id, val.success)}
                onUpdate={() => onUpdateTodo(val.id)}
                onDelete={() => onDeleteTodo(val.id)}
              >
                {val.content}
              </Item>
            })
          }
        </div>
      </Box>
      <Alert children={(add: AddFunction) => {
        ref.current = add;
      }}/>
    </Container>
  );
};