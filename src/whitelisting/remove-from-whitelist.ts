import axios from "axios";
import config from "../config";


export default async function RemoveFromWhiteList(Id) {
    try {
        await axios.delete(
            `http://localhost:8080/api/project/t-whitelist-delete?project_id=` + config.PROJECTID + `&telegram_uid=` + Id,
            // {
            //     headers: {
            //         Authorization: `Bearer ${config.APIPW}`,
            //         "Content-Type": "application/json",
            //     },
            // }
        );
    }
    catch (ex) {
        console.log("Error deleting member", ex);
    }
}