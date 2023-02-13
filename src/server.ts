import cors from 'cors'
import express from 'express';
import { v4 as uuid } from 'uuid'

const app = express()
app.use(cors({origin: '*'}))
app.use(express.json())

const port = process.env.PORT || 3333

interface Client{
  id: string
  name: string
  document: string
  phone: string
  email: string
}

const clients: Client[] = []
const products = []

// LISTAR CLIENTES 
app.get('/clients', (request, response) => {
  return response.json(clients)
})

// CRIAR CLIENTE
app.post('/clients', (request, response) => {
  const { name , document, phone, email } = request.body
  const client = { id: uuid(), name , document, phone, email }

  clients.push(client)
  return response.json(client)
})

// ATUALIZAR CLIENTE
app.put('/client/:id', (request, response) => {
  const { id } = request.params
  const { name , document, phone, email } = request.body

  const clientIndex = clients.findIndex((user) => user.id === id)

  if(clientIndex < 0 ){
    return response.status(404).json({error: 'User not found.'})
  }

  const client = { id, name , document, phone, email }
  clients[clientIndex] =  client

  return response.json(client)
})

// DELETAR CLIENTE
app.delete('/client/:id', (request, response) => {
  const { id } = request.params

  const clientIndex = clients.findIndex((user) => user.id === id)

  if(clientIndex < 0 ){
    return response.status(404).json({error: 'User not found.'})
  }

  clients.splice(clientIndex, 1)
  return response.status(204).send()
})



// CRIAR ROTA POST E GET PARA PRODUTOS




// SUBINDO SERVIDOR
app.listen(port, () => {
  console.log("Backend Started 🚀");
})
