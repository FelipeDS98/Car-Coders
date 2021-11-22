import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb://FelipeD98:misionticgrupo6carcoders@clusterwebapplication-shard-00-00.zx7wg.mongodb.net:27017,clusterwebapplication-shard-00-01.zx7wg.mongodb.net:27017,clusterwebapplication-shard-00-02.zx7wg.mongodb.net:27017/CarCoders?ssl=true&replicaSet=atlas-fhm97o-shard-0&authSource=admin&retryWrites=true&w=majority',
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
