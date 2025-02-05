import React from "react";
import { useCounter } from "../utils/store/UseCounter";
import { Button } from "@nextui-org/react";

const CounterApp = () => {
  const { count, username } = useCounter();

  return (
    <>
      <h2>Counter App - {username}</h2>
      <ButtonKurang />
      <h2>{count}</h2>
      <ButtonTambah />
    </>
  );
};

export default CounterApp;

const ButtonKurang = ({ count, setCount }) => {
  const { btnKurang } = useCounter();
  return (
    <>
      <Button onClick={btnKurang}>Kurang</Button>
    </>
  );
};

const ButtonTambah = ({ count, setCount }) => {
  const { btnTambah } = useCounter();
  return (
    <>
      <Button onClick={btnTambah}>Tambah</Button>
    </>
  );
};
