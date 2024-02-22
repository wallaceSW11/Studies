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
    title: 'Li',
    value: 'LI',
    image: 'https://api.lorem.space/image/movie?w=150&amp;amp;amp;amp;h=220'
  },
  ESFERA: {
    title: 'Es',
    value: 'ES',
    image: 'https://api.lorem.space/image/movie?w=150&amp;amp;amp;amp;h=220'
  },
  IUPP: {
    title: 'IUPP',
    value: 'IUPP',
    image: 'https://api.lorem.space/image/movie?w=150&amp;amp;amp;amp;h=220'
  },
}

const AIRLINE_PROGRAM = {
  SMILE: {
    title: 'Smile',
    value: 'SMILE',
    image: 'https://api.lorem.space/image/movie?w=150&amp;amp;amp;amp;h=220'
  },
  LATAM: {
    title: 'Latam',
    value: 'LATAM',
    image: 'https://api.lorem.space/image/movie?w=150&amp;amp;amp;amp;h=220'
  },
  TUDO_AZUL: {
    title: 'Tudo Azul',
    value: 'TUDO_AZUL',
    image: 'https://api.lorem.space/image/movie?w=150&amp;amp;amp;amp;h=220'
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