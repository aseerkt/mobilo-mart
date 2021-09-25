import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { parse } from 'pg-connection-string';
import path from 'path';

const __dev__ = process.env.NODE_ENV !== 'production';
const config = parse(process.env.DATABASE_URL!);

console.log(config, __dev__);

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    emit: 'js',
    pattern: /^[\w-]+\d+\.js$/,
  },
  entities: [path.join('./dist/entities')],
  type: 'postgresql',
  dbName: config.database,
  user: config.user,
  password: config.password,
  debug: true,
  highlighter: true && new SqlHighlighter(),
  driverOptions: {
    connection: { ssl: { rejectUnauthorized: false } },
  },
} as Options;
