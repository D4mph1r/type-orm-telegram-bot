import * as dotenv from 'dotenv';

dotenv.config();

const { TOKEN, HOST, PORT, USERNAME, PASSWORD, DATABASE, LAUNCHPADURL, APIPW, PROJECTID } = process.env;

if (!TOKEN || !HOST || !PORT || !USERNAME || !PASSWORD || !DATABASE || !LAUNCHPADURL || !APIPW || !PROJECTID) {
    throw new Error("Missing Environment Variables");
}
const config: Record<string, string> = {
    TOKEN,
    HOST,
    PORT,
    USERNAME,
    PASSWORD,
    DATABASE,
    LAUNCHPADURL,
    APIPW,
    PROJECTID
}

export default config