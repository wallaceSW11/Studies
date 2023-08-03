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
  },
  OUT: {
    title: 'Out',
    value: 'OUT'
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
  {
    text: 'Cost per thousand',
    align: 'right',
    sortable: false,
    value: 'costPerThousand',
  },
  {
    text: 'Actions',
    align: 'center',
    sortable: false,
    value: 'actions',
  }
]

const HEADERS_MILES = 
 [
  {
    text: 'Id',
    align: ' d-none',
    sortable: false,
    value: 'id'
  },
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
    text: 'Airline',
    align: 'right',
    sortable: false,
    value: 'airline',
  },
  {
    text: 'Price',
    align: 'right',
    sortable: false,
    value: 'price',
  },
  {
    text: 'Cost per mile',
    align: 'right',
    sortable: false,
    value: 'costPerMile',
  },
  {
    text: 'Actions',
    align: 'center',
    sortable: false,
    value: 'actions',
  },

]

const STORAGE_DATA = {
  POINTS: {
    key: 'points'
  },
  MILES: {
    key: 'miles'
  },
  KEEP_ADDING: {
   POINTS: {
    key: 'keepAddingPoints'
   },
   MILES: {
    key: 'keepAddingMiles'
   }
  },
}

const TYPES_OF_ENTRIES = Object.values(TYPE_OF_TRANSACTION);
const POINTS_PROGRAM = Object.values(POINT_PROGRAM);

export {
  TYPE_OF_TRANSACTION,
  TYPES_OF_ENTRIES,
  HEADERS_POINTS,
  HEADERS_MILES,
  POINTS_PROGRAM,
  STORAGE_DATA
}