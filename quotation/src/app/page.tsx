"use client"

import { IconPlus } from "@tabler/icons-react"
import Card from "./components/Card"
import Modal from "./components/modal/Modal"
import { useEffect, useState } from "react"
import Button from "@mui/material/Button";
import { MenuItem, Select } from "@mui/material"
import CurrencyPair from "./models/CurrencyPair";
import { CURRENCY_PAIR } from "./constants/constants";
import Message from "./components/Message"

export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [idEditing, setIdEditing] = useState<number>(-1);

  const [list, setList] = useState<CurrencyPair[]>([]);

  const [showMessageFull, setShowMessageFull] = useState<boolean>(false);
  const [showMessageRequired, setShowMessageRequired] = useState<boolean>(false);

  useEffect(() => {
    let quotations = JSON.parse(String(localStorage.getItem("quotations")) || "");

    if (!!quotations) {
      setList(quotations);
    }
  }, [])

  const currencies = CURRENCY_PAIR;

  function openRegister() {
    if (list.length == currencies.length) {
      setShowMessageFull(true);
      return;
    }
    
    setShowModal(true);
  }

  function addQuotation() {
    if (!currency) {
      setShowMessageRequired(true);      
      return;
    }

    if (isEditing) {
      setList(list.map(item => item.id == idEditing ? {id: item.id, currencyPair: currency} : item))
    } else {
      setList(current => [...current, {id: list.length+1, currencyPair: currency}]);
    }

    clear();
  }

  function clear() {
    setIsEditing(false);
    setShowModal(false);
    setCurrency("");
    setIdEditing(-1);
  }

  function editCurrency(item: CurrencyPair) {
    setIdEditing(item.id);
    setCurrency(item.currencyPair);
    setIsEditing(true);
    setShowModal(true);
  }

  function deleteCurrency(id: number){
    setList(list.filter(item => item.id != id));
  }

  function disabled(item: CurrencyPair) {
    return !!(list.some(cur => cur.currencyPair == item.currencyPair));
  }

  useEffect(() => {
    localStorage.setItem('quotations', JSON.stringify(list));
  }, [list]);

  return (
    <div>
      <nav className="flex justify-between px-5 py-2">
        <div>
          <strong>QUOTA</strong>tion
        </div>

        <div className="flex flex-row">
          <Button variant="outlined" startIcon={<IconPlus />} onClick={openRegister}>Add quotation</Button>
        </div>
      </nav>
      
      <main className="p-4 min-h-[calc(100vh-101px)] bg-gray-800">
        <div className="flex justify-around flex-wrap gap-2">
          {list.map(item => <Card key={item.id} quotation={item.currencyPair} onEdit={() => editCurrency(item)} onDelete={() => deleteCurrency(item.id)}></Card>)}
        </div>

        <Modal title={isEditing ? 'Edit quotation' : 'New quotation'} show={showModal} onClose={() => clear()} onSave={addQuotation}>
            <Select
              id="currency-pair"
              value={currency}
              onChange={(event) => setCurrency(event.target.value as string)}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>Select the currency pair</MenuItem>
              {currencies.map((item, index) => {
                return <MenuItem 
                  key={index} 
                  value={item.value} 
                  disabled={list.some(cur => cur.currencyPair == item.value)}
                  >{item.value}</MenuItem>
              })}
            </Select>
        </Modal>

        <Message title="Ops" text="All available currencies are listed. Please, edit or delete one." show={showMessageFull} onClose={() => setShowMessageFull(false)} />
        <Message title="Hello" text="Please, select the currency" show={showMessageRequired} onClose={() => setShowMessageRequired(false)} />
        
      </main>

      <footer>
        <div className="py-3 px-2">
          <span>Data from API: <a href="https://economia.awesomeapi.com.br/" target="_blank">https://economia.awesomeapi.com.br</a></span>
        </div>
      </footer>
    </div>

  )
}