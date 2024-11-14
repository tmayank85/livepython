"use client";
import "../../styles/code-mirror-editor.css"
import CodeMirror, {ViewUpdate} from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import React from "react";



export default function CodeMirrorEditor({code, onCodeChange}: {code: string, onCodeChange: (code: string, viewUpdate: ViewUpdate) => Promise<void>}) {


    return (
        <>
            <CodeMirror
                value={code}
                extensions = {[python()]}
                theme = {oneDark}
                onChange={onCodeChange}
            />
            </>


    );

}
