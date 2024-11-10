"use client"
import styles from "../styles/idle.module.css"
import Editor from "@/components/idle/Editor";
import Input from "@/components/idle/Input";
import Output from "@/components/idle/Output";
import Error from "@/components/idle/Error";
import {useState} from "react";

export default function Idle(){

    const [error,setError] = useState("No Errors");
    const [output,setOutput] = useState("");

    return (
        <div className={styles.idle}>

            <div className={styles.editorAndInputParent}>
                <Editor setError={setError} setOutput={setOutput}/>
                <Input/>
            </div>

            <div className={styles.outputAndErrorParent}>
                <Output output={output}/>
                <Error error={error}/>
            </div>

        </div>
    )

}