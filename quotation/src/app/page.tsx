"use client"

import { IconPlus } from "@tabler/icons-react"
import Card from "./components/Card"
import Modal from "./components/modal/Modal"
import { useState } from "react"

export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>();

  const [list, setList] = useState<any[]>(
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

  function addQuotation() {
    if (!currency) {
      alert('Please, select the currency');
      return;
    }

    setList(current => [...current, {"id": list.length+1, "currencyPair": currency}]);
    setCurrency('');
    setShowModal(false);
  }

  
  return (
    <>
      <nav className="flex justify-between px-5 py-2">
        <div>
          <strong>QUOTA</strong>tion
        </div>
        
        <div className="flex flex-row">
          <button className="button" onClick={() => setShowModal(true)}><IconPlus />Add quotation</button>
        </div>
      </nav>
      <main className="p-4 min-h-[calc(100vh-42px)] bg-gray-800">
        <div className="flex justify-around flex-wrap gap-2">
          {list.map(item => <Card key={item.id} quotation={item.currencyPair}></Card>)}
        </div>

        <Modal title="New quotation" show={showModal} onClose={() => setShowModal(false)} onSave={addQuotation}>
          <div className="flex justify-center">
            <div>
              <select name="currency-pair" id="currency-pair" onChange={(event) => setCurrency(event.target.value)} defaultValue={'default'}>
                <option value="default" disabled  >Select the currency pair</option>
                <option value="BTC-USD">BTC-USD</option>
                <option value="BTC-BRL">BTC-BRL</option>
                <option value="USD-BRL">USD-BRL</option>
                <option value="CAD-BRL">CAD-BRL</option>
                <option value="CAD-USD">CAD-USD</option>
              </select>
            </div>
          </div>
        </Modal>
      </main>
    </>

  )
}
