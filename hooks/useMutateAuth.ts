import { useEffect, useState } from "react";
import { supabase } from "utils/supabase";
import { useMutation } from "react-query";

export const useMutateAuth = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // フォームリセット用の関数
    const reset = () => {
        setEmail("");
        setPassword("");
    };

    // ログイン時の処理
    const loginMutation = useMutation(
        async () => {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw new Error(error.message);
            console.log("ログインしました");
        },

        // 上記非同期処理でエラーが発生した場合の処理
        {
            onError: (err: any) => {
                alert(err.message);
                reset();
            }
        }
    );


    // 新規登録時の処理
    const registerMutation = useMutation(
        async () => {
            const { error, data } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) {
                throw new Error(error.message);
            }

            const userId = data.user?.id;
            const userEmail = data.user?.email;
            console.log(`
            新規登録しました
            ユーザーIdは：${userId}
            ユーザーemailは：${userEmail}
            です。
            `);

            if (userId && userEmail) {
                await registerUserToDB(userId, userEmail);
            }
        },
        {
            onError: (err: any) => {
                alert(err.message);
                reset();
            }
        }
    );

    // ユーザー情報をDBに登録する処理
    const registerUserToDB = async (userId: string, userEmail: string) => {
        const { data, error } = await supabase
            .from("users")
            .insert([
                {
                    uid: userId,
                    email: userEmail,
                    created_at: new Date(),
                },
            ]);

        if (error) {
            console.log(error.message);
            throw new Error(error.message);
        }

        console.log("DBへの登録が完了しました");
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        loginMutation,
        registerMutation,
        registerUserToDB
    };
};
