const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: '151.106.119.226', 
  user: 'jans9573_janssen',
  password: 'Jan230103', 
  database: 'jans9573_Photobooth', 
  port: 3306
});

//Data Connecting
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connect To Database...');
});


// Product Table
app.get('/Product', (req, res) => {
  let sql = 'SELECT * FROM Product';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

// Order Table
app.get('/Order', (req, res) => {
  let sql = 'SELECT * FROM Order';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});



//Posrt Server
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));

/*
const [data, setData]= useState([])

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/product");
      setData(response.data); 
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  print()
  };
  
  fetchData();
}, []);

const print = () => {
  // Cek apakah data sudah tersedia sebelum mencetaknya
  if (data[1] && data[1].hargaModal) {
    console.log(data[1].hargaModal);
  } else {
    console.log("Data atau hargaModal belum tersedia.");
  }
};*/
