import "reflect-metadata"
import { DataSource } from "typeorm"
import { WalletAddress } from "./entity/wallet-addresses"
import config from "./config";
export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.HOST,
    port: parseInt(config.PORT),
    username: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE,
    entities: [
        WalletAddress
    ],
    synchronize: true,
    logging: false,
    subscribers: [],
    migrations: [],
    extra: {
        "connectionLimit": 15
    }
});