"use client"

import { Menu, MenuItem } from "@mui/material";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import * as React from 'react';
import { useState } from "react";

interface CardProps {
  quotation: string,
  onEdit: () => void,
  onDelete: () => void
}

export default function Card({quotation, onEdit, onDelete}: CardProps) {
  const [title, setTitle] = useState<string>(quotation);
  const [buyValue, setBuyValue] = useState<string>('0,00');
  const [sellValue, setSellValue] = useState<string>('0,00');
  const [buyUp, setBuyUp] = useState<boolean>(true);
  const [sellUp, setSellUp] = useState<boolean>();

  function formatCurrency(value: string) {
    return Number(value).toLocaleString(quotation.includes('-BRL') ? 'pt-BR' : 'en-US', {style:"currency", currency: quotation.includes('-BRL') ? "BRL" : "USD"});
  }

  fetch(`https://economia.awesomeapi.com.br/last/${quotation}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then((response) => response.json())
  .then((data) => {
    if (data && data.status) return;

    let quotationFormated = data[`${quotation.replace('-', '')}`];
    setBuyValue(formatCurrency(quotationFormated.bid));
    setSellValue(formatCurrency(quotationFormated.ask));
  })
  .catch(erro => console.log(erro))

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className="flex flex-col bg-gray-900 rounded-md w-64 h-32">
      <div className="flex justify-center py-2">
        <div className="flex flex-grow justify-center">
          <span className="font-bold text-xl">{title}</span>
        </div>
        <div>
          <button onClick={handleClick}><IconDotsVertical /></button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={onEdit}><IconEdit />Edit</MenuItem>
            <MenuItem onClick={() => {onDelete(); handleClose()}}><IconTrash />Delete</MenuItem>
          </Menu>
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