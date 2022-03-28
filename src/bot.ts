import config from "./config";
process.env.NTBA_FIX_319 = "1";

import * as TelegramBot from "node-telegram-bot-api";
import { AppDataSource } from "./data-source";
import { DataSource } from "typeorm";
import { WalletAddress } from "./entity/wallet-addresses";
import AddToWhiteList from "./whitelisting/add-to-whitelist";
import RemoveFromWhiteList from "./whitelisting/remove-from-whitelist";

function startbot(connection: DataSource) {
    const MyTelegramBot = new TelegramBot(config.TOKEN as string, { polling: true });


    MyTelegramBot.onText(/\/start/, async (msg, match) => {

        const chatId = msg.from?.id!;
       
        const userid = msg.from.id;
        
        const address = msg.text.replace('/start', '').trim();
        if (address !== '' && address !== undefined && address !== null) {
            //AppDataSource.initialize().then(async () => {

            const user = new WalletAddress();
            user.UserId = userid.toString();
            user.WalletAddress = address;
            user.isGroupJoined = false;
            await connection.manager.save(user);

            const users = await connection.manager.find(WalletAddress);
            console.log("Loaded users: ", users);

            MyTelegramBot.sendMessage(chatId, "Added in the whitelist successfully, click on the <a href='https://t.me/+uDVeuueNO3s4NjZk'>link</a> to join our group, thank you.", { parse_mode: 'HTML' });

            //    AppDataSource.destroy();
            // }).catch((error) => {
            //     console.log(error);
            //     AppDataSource.destroy();
            //     MyTelegramBot.sendMessage(chatId, "Already in the whiteList");
            // });
        }
        else {
            console.log("Empty Address");
        }
    });

    // Listen for any kind of message. There are different kinds of
    // messages.
    // MyTelegramBot.on('message', (msg) => {
    //     const chatId = msg.chat.id;
    //     console.log(msg);
    //     // send a message to the chat acknowledging receipt of their message
    //     MyTelegramBot.sendMessage(chatId, 'Received your message');

    //     // MyTelegramBot.createChatInviteLink(5233874453, "SAD", 1234, 1234, true).then((e)=>{
    //     //     console.log(e,'asd');
    //     // });
    // });

    MyTelegramBot.getMe().then((value: TelegramBot.User) => {
        console.log('Bot Started');
        //MyTelegramBot.sendMessage(value.id,'asdasd');
    });
    MyTelegramBot.on('new_chat_members', async (e) => {
        console.log(e, 'member joined');

        const chatId = e.from?.id!;

        //AppDataSource.initialize().then(async (connection) => {


        const UserId = e.new_chat_members[0].id.toString();

        let WalletRepository = connection.getRepository(WalletAddress);

        let WalletToUpdate = await WalletRepository.findOne({
            where:
                { UserId: UserId }
        });
        WalletToUpdate.isGroupJoined = true;

        await WalletRepository.save(WalletToUpdate);
        let data = {
            address: WalletToUpdate.WalletAddress,
            telegramUid: WalletToUpdate.UserId,
            projectId: config.PROJECTID
        }

        AddToWhiteList(data);

        MyTelegramBot.sendMessage(chatId, "Added successfully in group.");

        //     AppDataSource.destroy();
        // }).catch((error) => {
        //     console.log(error);
        //     AppDataSource.destroy();
        // });
    });

    MyTelegramBot.on('left_chat_member', async (e) => {
        console.log(e, 'member left');

        //AppDataSource.initialize().then(async (connection) => {


        const UserId = e.left_chat_member.id.toString();
        const isGroupJoined = true;

        let WalletRepository = connection.getRepository(WalletAddress);

        let WalletToUpdate = await WalletRepository.findOne({
            where:
                { UserId: UserId }
        });

        await WalletRepository.remove(WalletToUpdate);



        RemoveFromWhiteList(UserId);

        //    AppDataSource.destroy();
        // }).catch((error) => {
        //     console.log(error);
        //     AppDataSource.destroy();
        // });

    });
}

export default startbot