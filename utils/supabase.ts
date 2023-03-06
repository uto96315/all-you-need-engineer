import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string
);

export const signOut = () => {
    try {
        supabase.auth.signOut();
    } catch (e) {
        console.log("サインアウトに失敗しました");
        throw new Error();
    }

    console.log("サインアウトしました");
};