import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@clusterwebapplication-shard-00-00.8g5ne.mongodb.net:27017,clusterwebapplication-shard-00-01.8g5ne.mongodb.net:27017,clusterwebapplication-shard-00-02.8g5ne.mongodb.net:27017/CarCoders?ssl=true&replicaSet=atlas-a8r12n-shard-0&authSource=admin&retryWrites=true&w=majority`,
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
