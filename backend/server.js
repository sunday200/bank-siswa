import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'

import { errorHandler } from './middleware/errorMiddleware.js'
import siswaRoutes from './routes/siswaRoutes.js'
import kelasRoutes from './routes/kelasRoutes.js'
import managementRoutes from './routes/managementRoutes.js'

const port = process.env.PORT || 5000
connectDB() // Connect to MongoDB

const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Route
app.use('/api/siswa', siswaRoutes)
app.use('/api/kelas', kelasRoutes)
app.use('/api/management', managementRoutes)

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()

  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  const __dirname = path.resolve()
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
