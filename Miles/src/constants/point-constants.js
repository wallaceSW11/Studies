const TYPE_OF_TRANSACTION = {
  BUY: {
    title: 'Buy',
    value: 'BUY'
  },
  ENTRY: {
    title: 'Entry',
    value: 'ENTRY'
  },
  ENTRY_POINTS: {
    title: 'Entry points',
    value: 'ENTRY_POINTS'
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
    value: 'LIVELO',
    image: 'https://www.livelo.com.br/file/general/pt_logo-v1.svg'
  },
  ESFERA: {
    title: 'Esfera',
    value: 'ESFERA',
    image: 'https://www.esfera.com.vc/file/v2921935191691134188/general/Logo_Esfera_300dpi.png'
  },
  IUPP: {
    title: 'IUPP',
    value: 'IUPP',
    image: 'https://milheirodeprimeira.com.br/wp-content/plugins/phastpress/phast.php/c2VydmljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGbWlsaGVpcm9kZXByaW1laXJhLmNvbS5iciUyRndwLWNvbnRlbnQlMkZ1cGxvYWRzJTJGaXVwcC1pdGF1LTkwMHg1MDAucG5nJmNhY2hlTWFya2VyPTE2NjA0MTUzMjQtMTgxOTQmdG9rZW49MGY0ZjM3ZDc2MzMzMGI5NQ.q.png'
  },
}

const AIRLINE_PROGRAM = {
  SMILE: {
    title: 'Smile',
    value: 'SMILE',
    image: 'https://logodownload.org/wp-content/uploads/2017/09/smiles-logo.png'
  },
  LATAM: {
    title: 'Latam',
    value: 'LATAM',
    image: 'https://logospng.org/wp-content/uploads/latam.jpg'
  },
  TUDO_AZUL: {
    title: 'Tudo Azul',
    value: 'TUDO_AZUL',
    image: 'https://tudoazul.azulviagens.com.br/handlers/ImageRequest.ashx?path=%2fimg%2flogo-tudoazul.png&mediaSize=lg&imgSize=original'
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
const AIRLINES_PROGRAM = Object.values(AIRLINE_PROGRAM);

export {
  TYPE_OF_TRANSACTION,
  TYPES_OF_ENTRIES,
  HEADERS_POINTS,
  HEADERS_MILES,
  POINTS_PROGRAM,
  STORAGE_DATA,
  AIRLINES_PROGRAM,
  AIRLINE_PROGRAM
}