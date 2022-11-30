const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const User = require("./models/user.js")
// const appb = bodyParser();

let datos = [
	{
		id: 3,
		nombre: "Juan",
		apellido: "García",
		edad: 50,
		cliente: false
	},

	{
		id: 1,
		nombre: "Luis",
		apellido: "Ayala",
		edad: 22,
		cliente: true
	},

	{
		id: 2,
		nombre: "Diego",
		apellido: "Bravo",
		edad: 20,
		cliente: true
	},
];
// GET
app.get("/", (req, res) => {
	res.send(datos);
});

app.get("/datos", (req, res) => {
	res.json(datos);
});

app.get("/datos/:id", (req, res) => {
	const id = Number(req.params.id);
	const dato = datos.find((dato) => dato.id === id);
	if (dato) {
		res.json(dato);
	} else {
		res.status(404).end();
	}
});

// POST (Crear)
app.post('/datos', (req, res) => {
	const dato = req.body;

	const idDatos = datos.map(dato => dato.id)
	const idMaxima = Math.max(...idDatos)
	
	const nuevoDato = {
		id: idMaxima + 1,
		nombre: dato.nombre,
		apellido: dato.apellido,
		edad: dato.edad,
		cliente: typeof dato.cliente !== "undefined" ? dato.cliente : false
	}
	datos = datos.concat(nuevoDato);
	res.json(dato);
});

// hola[
// 	{
// 		id: "",
// 		nombre: "Pedro",
// 		apellido: "Picapiedra",
// 		edad: 200,
// 		cliente: false,
// 	}
// ];

// DELETE
app.delete("/datos/:id", (req, res) => {
	const id = Number(req.params.id);
	datos = datos.filter((dato) => dato.id !== id);
	res.status(404).end();
});

const PORT = 800;
app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}
enlace: http://localhost:${PORT}
`);
});
