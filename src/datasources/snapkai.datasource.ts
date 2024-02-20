import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  name: 'snapkai',
  connector: 'postgresql',
  url: '',
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'snapkai'
};


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SnapkaiDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'snapkai';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.snapkai', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
