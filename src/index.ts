// import { AppDataSource } from "./data-source"
// import { WalletAddress } from "./entity/wallet-addresses"

// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new WalletAddress()
//     user.UserId = "123"
//     user.WalletAddress = "0xA75A4c4066C1074A73dA073e1D4A84AA0A951a41"
//     user.isGroupJoined = true
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.UserId)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(WalletAddress)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.");

// }).catch(error => console.log(error))

import startbot from './bot'
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(async (connection) => {

    startbot(connection);

}).catch((error) => {
    console.log(error);
    AppDataSource.destroy();
});