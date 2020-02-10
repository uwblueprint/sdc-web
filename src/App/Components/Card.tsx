import React from 'react';

type myProps = {
  text: string;
  header: string;
  buttontext: string;
};

export default function Card(props: myProps) {
  return (
    <div>
      {props.text} {props.header} {props.buttontext}
    </div>
  );
}
