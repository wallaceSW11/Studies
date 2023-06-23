"use client"

import { IconArrowBigUpLine, IconArrowBigDownLine, IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react"

interface CardProps {
  quotation: string
}

export default function Card(props: CardProps) {
  const [title, setTitle] = useState<string>(props.quotation);
  const [buyValue, setBuyValue] = useState<string>('0,00');
  const [sellValue, setSellValue] = useState<string>('0,00');
  const [buyUp, setBuyUp] = useState<boolean>(true);
  const [sellUp, setSellUp] = useState<boolean>();

  fetch(`https://economia.awesomeapi.com.br/last/${props.quotation}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then((response) => response.json())
  .then((data) => {
    if (data && data.status) return;

    let quotation = data[`${props.quotation.replace('-', '')}`];
    setBuyValue(Number(quotation.bid).toLocaleString('en-US', {style:"currency", currency:"USD"}));
    setSellValue(Number(quotation.ask).toLocaleString('en-US', {style:"currency", currency:"USD"}));
  })
  .catch(erro => console.log(erro))

  function openMenu() {
    console.log('open menu')
  }


  return (
    <div className="flex flex-col bg-gray-900 rounded-md w-64 h-32">
      <div className="flex justify-center py-2">
        <div className="flex flex-grow justify-center">
          <span className="font-bold text-xl">{title}</span>
        </div>
        <div>
          <button onClick={openMenu}><IconDotsVertical /></button>
        </div>
      </div>
      <div className="flex flex-grow pt-2">
        <div className="flex flex-col flex-grow">
          <div className="flex justify-center pb-2">Buy</div>
          <div className="flex justify-center items-center">
            <span>{buyValue}</span>
            {/* {buyUp ? (<IconArrowBigUpLine color="green" />) : (<IconArrowBigDownLine color="red" />)} */}
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex justify-center pb-2">Sell</div>
          <div className="flex justify-center items-center">
            <span>{sellValue}</span>
            {/* {sellUp ? (<IconArrowBigUpLine color="green" />) : (<IconArrowBigDownLine color="red" />)} */}
          </div>
        </div>
      </div>

    </div>
  )
}