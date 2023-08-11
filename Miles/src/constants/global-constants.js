import language from "@/utils/language";
import { TEXT } from "./text";

const LANGUAGE = {
  BR: 'br',
  EN: 'en'
}

const lang = language();

const TRANSACTION_TYPE = {
  BUY: {
    title: TEXT.BUY[lang],
    value: 'BUY'
  },
  ENTRY: {
    title: TEXT.ENTRY[lang],
    value: 'ENTRY'
  },
  ENTRY_BY_TRANSFER: {
    title: TEXT.ENTRY_PER_TRANSFER[lang],
    value: 'ENTRY_BY_TRANSFER'
  },
  TRANSFER: {
    title: TEXT.TRANSFER[lang],
    value: 'TRANSFER'
  },
  BONUS: {
    title: TEXT.BONUS[lang],
    value: 'BONUS'
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
    text: 'Id',
    align: ' d-none',
    sortable: false,
    value: 'id'
  },
  {
    text: TEXT.DATE[lang],
    align: 'start',
    sortable: false,
    value: 'date',
  },
  {
    text: TEXT.TRANSACTION[lang],
    align: 'start',
    sortable: false,
    value: 'type',
  },
  {
    text: TEXT.QUANTITY[lang],
    align: 'right',
    sortable: false,
    value: 'quantity',
  },
  {
    text: TEXT.TOTAL_VALUE[lang],
    align: 'right',
    sortable: false,
    value: 'totalValue',
  },
  {
    text: TEXT.COST_PER_THOUSAND[lang],
    align: 'right',
    sortable: false,
    value: 'costPerThousand',
  },
  {
    text: TEXT.ACTIONS[lang],
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
    text: TEXT.DATE[lang],
    align: 'start',
    sortable: false,
    value: 'date',
  },
  {
    text: TEXT.TRANSACTION[lang],
    align: 'start',
    sortable: false,
    value: 'type',
  },
  {
    text: TEXT.QUANTITY[lang],
    align: 'right',
    sortable: false,
    value: 'quantity',
  },
  {
    text: TEXT.AIRLINE[lang],
    align: 'right',
    sortable: false,
    value: 'airline',
  },
  {
    text: TEXT.PRICE[lang],
    align: 'right',
    sortable: false,
    value: 'price',
  },
  {
    text: TEXT.COST_PER_THOUSAND[lang],
    align: 'right',
    sortable: false,
    value: 'costPerThousand',
  },
  {
    text: TEXT.ACTIONS[lang],
    align: 'center',
    sortable: false,
    value: 'actions',
  }
]

const TRANSACTION_TYPES = Object.values(TRANSACTION_TYPE);
const POINTS_PROGRAM = Object.values(POINT_PROGRAM);
const AIRLINES_PROGRAM = Object.values(AIRLINE_PROGRAM);

export {
  TRANSACTION_TYPE,
  TRANSACTION_TYPES,
  HEADERS_POINTS,
  HEADERS_MILES,
  POINTS_PROGRAM,
  AIRLINES_PROGRAM,
  AIRLINE_PROGRAM,
  LANGUAGE
}