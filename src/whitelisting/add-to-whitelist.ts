import axios from "axios";
import config from "../config";

export default async function AddToWhiteList(data: any) {
    try {
        console.log(data);
        await axios.post(`http://localhost:8080/api/project/t-whitelist-create`,
            data,
            // {
            //     headers: {
            //         Authorization: `Bearer ${config.APIPW}`,
            //         "Content-Type": "application/json",
            //     },
            // }
        );
    }
    catch (ex: any) {
        console.log(ex)
    }
}