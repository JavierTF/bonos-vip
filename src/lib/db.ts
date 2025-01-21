import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/bonosartgoma',
  {
    dialect: 'postgres',
  }
)

export default sequelize