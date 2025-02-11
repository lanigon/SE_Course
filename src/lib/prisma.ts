import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

// 添加连接检查
prisma.$connect()
  .then(() => console.log('Prisma connected'))
  .catch(err => console.error('Prisma connection error:', err))

export { prisma } 