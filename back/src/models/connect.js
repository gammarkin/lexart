import * as pg from 'pg';
import { Sequelize } from 'sequelize';

const POSTGRES_URL = process.env.POSTGRES_URL || '';
const password = process.env.POSTGRES_PASSWORD || '';


const sequelize = new Sequelize(POSTGRES_URL, { dialect: 'postgres', password, dialectModule: pg })

export default sequelize;
