import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutateAuth } from "hooks/useMutateAuth";
import Input from "components/elements/input";
import { FormEvent } from "react";



const RegisterPage: NextPage = () => {
    const { push } = useRouter();
    const {
        email,
        setEmail,
        password,
        setPassword,
        registerMutation
    } = useMutateAuth();

    // 新規登録ボタンの制御
    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            registerMutation.mutate();
        } catch (e) {
            alert(e);
        }
        console.log("新規登録する");
    };


    return (
        <div className="text-center pt-5">
            <h1 className="p-2 text-lg">新規登録</h1>
            <form onSubmit={handleRegister} className="w-1/3 bg-slate-200 p-2 m-auto text-center">
                <Input label={"メールアドレス"} type={"email"} placeholder={"example@example.com"} value={email} setFunction={setEmail} />
                <Input label={"パスワード"} type={"password"} placeholder={""} value={password} setFunction={setPassword} />

                <button type="submit">新規登録する</button>
                <br />
                <button className="border border-b-black hover:text-blue-600 focus:border-b-blue-600" onClick={() => { push("./login_page"); }}>
                    またはログイン
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;