import 'dotenv/config';
import {z} from "zod";

const envZodSchema = z.object({
    RPC:z.string().nonempty(),
    DIFF_BLOCKS:z.string(),
    WETH:z.string(),
    FACTORY:z.string()
});

const _env = envZodSchema.safeParse(process.env);

if(_env.success === false) {
    console.error("invalid environment param", );
    throw new Error("Invalid environment param");
}

export const env = _env.data;