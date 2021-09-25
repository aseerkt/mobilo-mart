import path from 'path';
import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { parse } from 'pg-connection-string';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const __dev__ = process.env.NODE_ENV !== 'production';
const config = parse(process.env.DATABASE_URL!);

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    emit: 'js',
    pattern: /^[\w-]+\d+\.js$/,
    // https://github.com/mikro-orm/mikro-orm/issues/190
    disableForeignKeys: false,
    wrap: false,
  },
  entities: [path.join('./dist/entities')],
  tsNode: false,
  type: 'postgresql',
  dbName: config.database,
  user: config.user,
  host: config.host,
  port: config.port,
  password: config.password,
  debug: __dev__,
  highlighter: new SqlHighlighter(),
  driverOptions: {
    connection: { ssl: { rejectUnauthorized: false } },
  },
} as Options<PostgreSqlDriver>;
