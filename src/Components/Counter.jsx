import React from "react";
import { useAppDispatch, useAppSelector } from "../Redux/Hooks/hooks";
import { increment, decrement } from "../Redux/Slices/counter";

const Counter = () => {
  const count = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </>
  );
};

export default Counter;
