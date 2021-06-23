import React from "react";
import styled from "styled-components";

interface IText {
  success: boolean;
}

const Text = styled.span<IText>`
  text-decoration: ${props => props.success ? "line-through" : "none"};
  opacity: ${props => props.success ? 0.5 : 1};
`;

interface IItem {
  children: React.ReactNode;

  checkValue: boolean;

  checkChange: (e: React.FormEvent) => void;

  onUpdate: (e: React.FormEvent) => void;

  onDelete: (e: React.FormEvent) => void;
}

export default function Item(props: IItem) {
  const { children, checkValue, checkChange, onUpdate, onDelete } = props;

  return (
    <div className="flex flex-row items-center justify-between w-full p-2 m-1 bg-white rounded hover:bg-gray-100">
      <input type="checkbox" checked={checkValue} onChange={checkChange}/>
      <Text success={checkValue}>{children}</Text>
      <div className="flex flex-row items-center">
        <svg onClick={onUpdate} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-1 cursor-pointer hover:opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <svg onClick={onDelete} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-1 cursor-pointer hover:opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 1 9 9 0 0118 0z" />
        </svg>
      </div>
    </div> 
  );
}