export const watchlist = [
  {
    id: 1,
    name: "INFY",
    exchange: "NSE",
    price: 1555.45,
    percent: "-1.60%",
    isDown: true,
  },
  {
    id: 2,
    name: "ONGC",
    exchange: "NSE",
    price: 116.8,
    percent: "-0.09%",
    isDown: true,
  },
  {
    id: 3,
    name: "TCS",
    exchange: "NSE",
    price: 3194.8,
    percent: "-0.25%",
    isDown: true,
  },
  {
    id: 4,
    name: "KPITTECH",
    exchange: "NSE",
    price: 266.45,
    percent: "3.54%",
    isDown: false,
  },
  {
    id: 5,
    name: "QUICKHEAL",
    exchange: "NSE",
    price: 308.55,
    percent: "-0.15%",
    isDown: true,
  },
  {
    id: 6,
    name: "WIPRO",
    exchange: "NSE",
    price: 577.75,
    percent: "0.32%",
    isDown: false,
  },
  {
    id: 7,
    name: "M&M",
    exchange: "NSE",
    price: 779.8,
    percent: "-0.01%",
    isDown: true,
  },
  {
    id: 8,
    name: "RELIANCE",
    exchange: "NSE",
    price: 2112.4,
    percent: "1.44%",
    isDown: false,
  },
  {
    id: 9,
    name: "HUL",
    exchange: "NSE",
    price: 512.4,
    percent: "1.04%",
    isDown: false,
  },
];

// holdings
export const holdings = [
    { 
      name: "AAPL", 
      desc: "Apple Inc.", 
      qty: 50, avg: "175.40", 
      ltp: "182.63", 
      curVal: "9,131.50", 
      pl: "+361.50", 
      chg: "+4.12%", 
      type: "positive",
    },

    { 
      name: "MSFT", 
      desc: "Microsoft Corp.", 
      qty: 25, avg: "390.12", 
      ltp: "420.55", 
      curVal: "10,513.75", 
      pl: "+760.75", 
      chg: "+7.80%", 
      type: "positive",
    },

    { 
      name: "TSLA", 
      desc: "Tesla, Inc.", 
      qty: 60, avg: "185.00", 
      ltp: "163.57", 
      curVal: "9,814.20", 
      pl: "-1,285.80", 
      chg: "-11.58%", 
      type: "negative" 
    },

    { 
      name: "NVDA", 
      desc: "Nvidia Corp.", 
      qty: 15, avg: "450.25", 
      ltp: "875.28", 
      curVal: "13,129.20", 
      pl: "+6,375.45", 
      chg: "+94.40%", 
      type: "positive" },

    { 
      name: "GOOGL", 
      desc: "Alphabet Inc.", 
      qty: 40, avg: "132.50", 
      ltp: "152.26", 
      curVal: "6,090.40", 
      pl: "+790.40", 
      chg: "+14.91%", 
      type: "positive" 
    },

    { 
      name: "AMZN", 
      desc: "Amazon.com, Inc.", 
      qty: 30, avg: "145.75", 
      ltp: "174.42", 
      curVal: "5,232.60", 
      pl: "+860.10", 
      chg: "+19.67%", 
      type: "positive" 
    },
];

// positions

export const positions = [
    { 
      name: "NIFTY 19800 CE", 
      desc: "NSE | 28 NOV 2023", 
      product: "Intraday", 
      qty: 150, 
      avg: "145.20", 
      ltp: "168.45", 
      pl: "+3,487.50", 
      type: "positive" 
    },

    { 
      name: "BANKNIFTY 44000 PE", 
      desc: "NSE | 28 NOV 2023", 
      product: "Intraday", 
      qty: 45, 
      avg: "312.00", 
      ltp: "294.15", 
      pl: "-803.25", 
      type: "negative" },
    { 
      name: "RELIANCE JAN FUT", 
      desc: "NSE | 25 JAN 2024", 
      product: "CNC", 
      qty: 250, 
      avg: "2410.00", 
      ltp: "2432.15", 
      pl: "+5,537.50", 
      type: "positive" },
  ];
