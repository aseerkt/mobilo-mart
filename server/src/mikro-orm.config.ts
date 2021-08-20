import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import path from 'path';

const __dev__ = process.env.NODE_ENV !== 'production';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    emit: 'js',
    pattern: /^[\w-]+\d+\.js$/,
  },
  entities: [path.join('./dist/entities')],
  type: 'postgresql',
  dbName: 'mobilo',
  user: 'postgres',
  password: 'postgres',
  debug: __dev__,
  highlighter: __dev__ && new SqlHighlighter(),
} as Options;
