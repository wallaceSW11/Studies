"use client"

import { useEffect, useState } from "react"
import NavBar from "./components/NavBar"
import Quotations from "./components/Quotations"

export default function Home() {
  const [newQuotation, setNewQuotation] = useState<boolean>(false);

  useEffect(() => {
    if (!newQuotation) return;

    setNewQuotation(false);
  }, [newQuotation])
 
  return (
    <div>
      <NavBar actionButton={() => setNewQuotation(true)}/>

      <main className="p-4 min-h-[calc(100vh-101px)] bg-gray-800">
        <Quotations onAdd={newQuotation}/>
      </main>

      <footer>
        <div className="py-3 px-2">
          <span>Data from API: <a href="https://docs.awesomeapi.com.br/api-de-moedas" target="_blank">https://economia.awesomeapi.com.br</a></span>
        </div>
      </footer>
    </div>

  )
}