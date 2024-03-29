import Card from './Card'
import CurrencyPair from '../models/CurrencyPair'
import { useEffect, useState } from 'react';
import { CURRENCY_PAIR } from '../constants/constants';
import Modal from './modal/Modal';
import { MenuItem, Select } from '@mui/material';
import useMessage from '../hooks/useMessage';

interface QuotationsProps {
  onAdd: boolean
}

export default function Quotations({ onAdd } : QuotationsProps) {
  type Alert = {
    title: string,
    text: string
  }

  const [list, setList] = useState<CurrencyPair[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [idEditing, setIdEditing] = useState<number>(-1);
  const [alert, setAlert] = useState<Alert>();
  const { Message, show } = useMessage();

  const MESSAGE_ALL_ADDED = {
    title: "Ops", 
    text: "All available currencies are listed. Please, edit or delete one."
  }

  const MESSAGE_REQUIRED = {
    title: "Hello", 
    text: "Please, select the currency"
  }

  useEffect(() => {
    let quotations = JSON.parse(String(localStorage.getItem("quotations")) || "");

    if (!!quotations) {
      setList(quotations);
    }
  }, [])

  useEffect(() => {
    if (!onAdd) return;

    if (list.length == currencies.length) {
      setAlert(MESSAGE_ALL_ADDED);
      show(); 
      return;
    }

    setShowModal(true);
  }, [onAdd])

    useEffect(() => {
      localStorage.setItem('quotations', JSON.stringify(list));
    }, [list]);

  const currencies = CURRENCY_PAIR;

  function addQuotation() {
    if (!currency) {
      setAlert(MESSAGE_REQUIRED);
      show(); 
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

  return (
    <>
      <div className="flex justify-around flex-wrap gap-2">
        {list.map(item => {
          return <Card 
            key={item.id} 
            quotation={item.currencyPair} 
            onEdit={() => editCurrency(item)} 
            onDelete={() => deleteCurrency(item.id)}
          />})}
      </div>

      <Modal 
        title={isEditing ? 'Edit quotation' : 'New quotation'} 
        show={showModal} 
        onClose={() => clear()} 
        onSave={addQuotation}
      >
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

      {Message && <Message title={alert?.title || ""} text={alert?.text} /> }
    </>
  )
}