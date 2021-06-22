import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Item from '@components/Item';

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

export default function Home() {
  const [todo, setTodo] = useState([{
    id: 0,
    content: "content"
  }]);
  const [value, setValue ] = useState("");

  const onGetTodos = useCallback(() => {

  }, []);

  const onGetTodo = useCallback((id) => {

  }, []);

  const onAddTodo = useCallback(() => {

  }, []);

  const onUpdateTodo = useCallback((id) => {

  }, []);

  const onDeleteTodo = useCallback((id) => {

  }, []);

  const onCheckTodo = useCallback((id, success) => {

  }, []);

  useEffect(() => {
    if(todo && !todo[0]) {
      onGetTodos();
    }
  }, [onGetTodos]);

  if(false) {
    return (
      <Container>
        List Loading..
      </Container>
    );
  }

  return (
    <Container>
      <Box>
        <div className="flex flex-row items-center mb-5">
          <input className="bg-gray-100 focus:bg-white rounded p-2 w-full mr-2"/>
          <svg onClick={() => console.log("add")} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="w-full flex flex-col">
          {
            todo.map((val, idx) => {
              return <Item key={idx}>
                {/* val */}
              </Item>
            })
          }
        </div>
      </Box>
    </Container>
  );
};