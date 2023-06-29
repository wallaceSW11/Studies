"use client"

import { IconPlus } from "@tabler/icons-react"
import Card from "./components/Card"
import Modal from "./components/modal/Modal"
import { useState } from "react"
import Button from "@mui/material/Button";
import { MenuItem, Select } from "@mui/material"
import CurrencyPair from "./models/CurrencyPair";

export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [idEditing, setIdEditing] = useState<number>(-1);

  const [list, setList] = useState<CurrencyPair[]>(
  [
    {
      id: 1,
      currencyPair: "BTC-USD"
    },
    {
      id: 2,
      currencyPair: "BTC-BRL"
    },
    {
      id: 3,
      currencyPair: "USD-BRL"
    }
  ]);

  const currencies = ["BTC-USD","BTC-BRL","USD-BRL","CAD-BRL","CAD-USD"]

  function addQuotation() {
    if (!currency) {
      alert("Please, select the currency");
      return;
    }

    if (isEditing) {
      setList(list.map(item => item.id == idEditing ? {id: item.id, currencyPair: currency} : item))
    } else {
      setList(current => [...current, {id: list.length+1, currencyPair: currency}]);
    }

    setIsEditing(false);
    setShowModal(false);
    setCurrency("");
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

  return (
    <div>
      <nav className="flex justify-between px-5 py-2">
        <div>
          <strong>QUOTA</strong>tion
        </div>

        <div className="flex flex-row">
          <Button variant="outlined" startIcon={<IconPlus />} onClick={() => setShowModal(true)}>Add quotation</Button>
        </div>
      </nav>
      <main className="p-4 min-h-[calc(100vh-53px)] bg-gray-800">
        <div className="flex justify-around flex-wrap gap-2">
          {list.map(item => <Card key={item.id} quotation={item.currencyPair} onEdit={() => editCurrency(item)} onDelete={() => deleteCurrency(item.id)}></Card>)}
        </div>

        <Modal title={isEditing ? 'Edit quotation' : 'New quotation'} show={showModal} onClose={() => setShowModal(false)} onSave={addQuotation}>
          <div className="flex justify-center">
            <Select
              id="currency-pair"
              value={currency}
              onChange={(event) => setCurrency(event.target.value as string)}
              displayEmpty
            >
              <MenuItem value="" disabled>Select the currency pair</MenuItem>
              {currencies.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
            </Select>
          </div>
        </Modal>
      </main>
    </div>

  )
}
