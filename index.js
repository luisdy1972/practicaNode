const express = require("express")
const app = express()
app.use(express.json())
const loger = require("./models/loger.js")
const homeHTML = require("./models/home.js")

let datos = [
	{
		id: 3,
		nombre: "Juan",
		apellido: "García",
		edad: 50,
		cliente: false,
	},

	{
		id: 1,
		nombre: "Luis",
		apellido: "Ayala",
		edad: 22,
		cliente: true,
	},

	{
		id: 2,
		nombre: "Diego",
		apellido: "Bravo",
		edad: 20,
		cliente: true,
	},
]

app.use(loger)

app.get("/", (req, res) => {
	// res.send(datos)
	res.send(homeHTML)
})

app.get("/datos", (req, res) => {
	res.json(datos)
})

app.get("/datos/:id", (req, res) => {
	const id = Number(req.params.id)
	const dato = datos.find((dato) => dato.id === id)
	if (dato) {
		res.json(dato)
	} else {
		res.status(404).end()
	}
})
app.post("/datos", (req, res) => {
	const dato = req.body
	if (!dato || !dato.nombre || !dato.apellido || !dato.edad) {
		return res.status(400).json({
			error: "error al guardad datos",
		})
	}

	const idDatos = datos.map((dato) => dato.id)
	const idMaxima = Math.max(...idDatos)

	const nuevoDato = {
		id: idMaxima + 1,
		nombre: dato.nombre,
		apellido: dato.apellido,
		edad: dato.edad,
		cliente: typeof dato.cliente !== "undefined" ? dato.cliente : false,
	}
	datos = datos.concat(nuevoDato)
	res.status(201).json(dato)
})

app.delete("/datos/:id", (req, res) => {
	const id = Number(req.params.id)
	datos = datos.filter((dato) => dato.id !== id)
	res.status(404).end()
})

app.use((req, res) => {
	console.log(req.path)
	res.status(404).json({
		error: "not found",
	})
})

const PORT = process.env.PORT || 800
// const PORT = 800
app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}
	enlace: http://localhost:${PORT}
	`)
})
