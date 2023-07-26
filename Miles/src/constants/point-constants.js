const TYPE_OF_TRANSACTION = {
  BUY: {
    title: 'Buy',
    value: 'BUY'
  },
  ENTRY: {
    title: 'Entry',
    value: 'ENTRY'
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

const POINT_PROGRAM = {
  LIVELO: {
    title: 'Livelo',
    value: 'LIVELO'
  },
  ESFERA: {
    title: 'Esfera',
    value: 'ESFERA'
  },
  IUPP: {
    title: 'IUPP',
    value: 'IUPP'
  },
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

const TYPES_OF_ENTRIES = Object.values(TYPE_OF_TRANSACTION);
const POINTS_PROGRAM = Object.values(POINT_PROGRAM);

export {
  TYPE_OF_TRANSACTION,
  TYPES_OF_ENTRIES,
  HEADERS_POINTS,
  POINTS_PROGRAM
}