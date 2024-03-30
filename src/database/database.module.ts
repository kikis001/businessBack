import { Module, Global, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import config from 'src/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, dbName, host } = configService.mongo
        return {
          uri: `${connection}://${host}`,
          user,
          pass: password,
          dbName
        }
      },
      inject: [config.KEY]
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, dbName } = configService.mongo
        const uri = `${connection}://${user}:${password}@${host}/`
        const client = new MongoClient(uri)
        await client.connect()
        const db = client.db(dbName);
        return db;
      },
      inject: [config.KEY]
    }
  ],
  exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}
