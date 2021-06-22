import styled from "styled-components";

const Box = styled.div`

`;

const Check = styled.input`

`;

interface IItem {
  children: React.ReactNode;

  checkValue?: boolean;

  checkChange?: (e: React.FormEvent) => void;
}

export default function Item(props: IItem) {
  const { children, checkValue, checkChange } = props;

  return (
    <Box className="flex flex-row items-center justify-between w-full p-2 m-1 bg-white rounded">
      <Check type="checkbox" checked={checkValue} onChange={checkChange}/>
      {children}
      <div className="flex flex-row items-center">
        <svg onClick={() => console.log("edit")} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-1 cursor-pointer hover:opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>

        <svg onClick={() => console.log("delete")} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-1 cursor-pointer hover:opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </Box> 
  );
}