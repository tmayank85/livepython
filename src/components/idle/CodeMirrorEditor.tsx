"use client";
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';



// @ts-ignore
export default function CodeMirrorEditor({code, onCodeChange}){


    return (
        <>
            <CodeMirror
                value={code}
                height="463px"
                extensions = {[python()]}
                theme = {oneDark}
                onChange={onCodeChange}
            />
            </>


    );

}
