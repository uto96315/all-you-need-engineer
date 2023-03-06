import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutateAuth } from "hooks/useMutateAuth";
import Input from "components/elements/input";
import { FormEvent } from "react";


const LoginPage: NextPage = () => {
    const { push } = useRouter();
    const {
        email,
        setEmail,
        password,
        setPassword,
        loginMutation
    } = useMutateAuth();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        console.log("ボタンがタップされました");
        e.preventDefault();
        loginMutation.mutate();
    };


    return (
        <div className="text-center pt-5">
            <h1 className="p-2 text-lg">ログイン</h1>
            <form onSubmit={handleLogin} className="w-1/3 bg-slate-200 p-2 m-auto text-center">
                <Input label={"メールアドレス"} type={"email"} placeholder={"example@example.com"} value={email} setFunction={setEmail} />
                <Input label={"パスワード"} type={"password"} placeholder={""} value={password} setFunction={setPassword} />

                <button type="submit">ログインする</button>

                <br />

                <button type="button" className="border border-b-black" onClick={() => { push("./register_page"); }}>または新規登録</button>
            </form>
        </div>
    );
};

export default LoginPage;