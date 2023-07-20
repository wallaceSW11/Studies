const TYPE_OF_ENTRIES = {
  ENTRY: {
    title: 'Entry',
    value: 'ENTRY'
  },
  BUY: {
    title: 'Buy',
    value: 'BUY'
  },
  TRANSFER: {
    title: 'Transfer',
    value: 'TRANSFER'
  },
  BONUS: {
    title: 'Bonus',
    value: 'BONUS'
  }
}

const HEADERS_POINTS = 
 [
  {
    text: 'Date',
    align: 'start',
    sortable: false,
    value: 'date',
  },
  {
    text: 'Type',
    align: 'start',
    sortable: false,
    value: 'type',
  },
  {
    text: 'Quantity',
    align: 'right',
    sortable: false,
    value: 'quantity',
  },
  {
    text: 'Total value',
    align: 'right',
    sortable: false,
    value: 'totalValue',
  },
  // {
  //   text: 'Installment number',
  //   align: 'start',
  //   sortable: false,
  //   value: 'installmentNumber',
  // },
  // {
  //   text: 'First installment',
  //   align: 'start',
  //   sortable: false,
  //   value: 'firstInstallment',
  // },
  {
    text: 'Cost effective',
    align: 'right',
    sortable: false,
    value: 'costEffective',
  },
  {
    text: 'Actions',
    align: 'center',
    sortable: false,
    value: 'actions',
  },

]

const TYPES_OF_ENTRIES = Object.values(TYPE_OF_ENTRIES);

export {
  TYPE_OF_ENTRIES,
  TYPES_OF_ENTRIES,
  HEADERS_POINTS
}