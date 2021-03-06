

const { Pool }  = require('pg');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
	try{
		const client = await pool.connect();
		const result = await client.query('SELECT * FROM mejoras_table');
		const resultados = { 'resultados': (result) ? result.rows : null};
		res.render('mejoras', resultados );
		client.release();
	} catch (err) {
	  console.error(err);
	  res.send("Error " + err);
	}	
});

module.exports = router;
