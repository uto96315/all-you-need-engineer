import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";

type Props = {
    label: string,
    type: string,
    placeholder: string,
    value: any,
    setFunction: Dispatch<SetStateAction<string>>;
};

const Input: NextPage<Props> = ({ label, type, placeholder, value, setFunction }) => {
    return (
        <div className="text-left p-3">
            <label className="font-sans text-left">{label}</label>
            <br />
            <input
                className={styles.input}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => { setFunction(e.target.value); }}
            />
        </div>
    );
};

export default Input;

/*
    メモ
    Inputでフォーカス時だけ下線が出るようにしたい。
 */

const styles = {
    input: `
        w-full 
        border-none
        rounded
        p-1
    `
};