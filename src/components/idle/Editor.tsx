"use client";
import styles from "../../styles/idle.module.css"
import CodeMirrorEditor from "@/components/idle/CodeMirrorEditor";
import React, {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState} from "react";
import {ViewUpdate} from "@uiw/react-codemirror";



export default  function Editor({setError, setOutput, setEditorRef, code, setCode, selectedFile, input}:
{setError: Dispatch<SetStateAction<string>>,
setOutput: Dispatch<SetStateAction<string>>,
setEditorRef: Dispatch<SetStateAction<MutableRefObject<any>>>,
code: string,
setCode: Dispatch<SetStateAction<string>>,
selectedFile: number,
input: string
}) {

    const [pyodide, setPyodide] = useState(null);

    const editorRef = useRef(null)

    useEffect(() => {
        const initializePyodide = async () => {
            // Dynamically load the Pyodide script
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.2/full/pyodide.js'; // Correct URL for Pyodide
            script.onload = async () => {
                // After the script is loaded, load Pyodide
                try {
                    // eslint-disable-next-line
                    // @ts-ignore
                    const pyodideInstance = await window.loadPyodide(); // Initialize Pyodide
                    setPyodide(pyodideInstance);
                    console.log('Pyodide initializeded');
                } catch (error) {
                    console.error('Error loading Pyodide:', error);
                }
            };
            document.body.appendChild(script); // Append script to body
        };

        initializePyodide()
    }, []);


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const executeCode = React.useCallback( async (newCode: string, inputGiven) => {

        if(pyodide){
            try{
                const timeout = 100;
                // eslint-disable-next-line
                // @ts-ignore
                await pyodide.runPythonAsync(`
import sys
import asyncio
import time
import ast

from io import StringIO

# Redirect stdout to capture print
sys.stdin = StringIO('''${inputGiven}'''.replace('''\n''', '''\\n'''));

old_stdout_1234893147 = sys.stdout
sys.stdout = StringIO()

code_completed_8971234 = False
error_msg_9474892348 = ""

code_897845675 = """${newCode}"""
timeout_microseconds_453653546734 = 0.01
start_time_346564745 = time.time()
timeout_exception_9387538956 = Exception("Time Limit Exceeded")

def timeOutCounter_12454345634():
    global error_msg_9474892348
    if time.time() - start_time_346564745 > timeout_microseconds_453653546734:
        error_msg_9474892348 = "Time Limit Exceeded"
        raise timeout_exception_9387538956
        
def inject_function_call_765865534576(code):
  new_code = ""
  is_prev_parent = False
  for i in code.split('\\n'):
    i = i.rstrip()
    if is_prev_parent and len(i) > 0:
        is_prev_parent = False
        new_code += (" "* ( len(i) - len(i.lstrip()) )) + "timeOutCounter_12454345634(); \\n"
    if len(i) > 0 and i[-1] != ':':
        if i[-1] != ';':
            i += ';'
        new_code += i + " timeOutCounter_12454345634(); \\n"
    elif len(i) > 0 and i[-1] == ':':
        is_prev_parent = True
        new_code += i + '\\n'
    else:
      new_code += i + '\\n'
  return new_code


try:
    #print(inject_function_call_765865534576(code_897845675))
    exec(inject_function_call_765865534576(code_897845675))
    
except Exception as e:
    captured_output_7654674654 = sys.stdout.getvalue()
    if e != timeout_exception_9387538956:
        exec(code_897845675)
    else:
        raise e

# Get the printed output
captured_output_7654674654 = sys.stdout.getvalue()

# Restore stdout
sys.stdout = old_stdout_1234893147

captured_output_7654674654
`)
                // eslint-disable-next-line
                // @ts-ignore
                const result = pyodide.globals.get('captured_output_7654674654');
                setOutput(result);
                setError("No Errors");
            }
            catch (error: unknown) {
                const result = pyodide.globals.get('captured_output_7654674654') || "";
                const error_msg = pyodide.globals.get('error_msg_9474892348') || "";
                if(result.length > 0){
                    setOutput(result);
                }
                if(error_msg.length > 0)
                    setError(error_msg)
                else
                    // eslint-disable-next-line
                    // @ts-ignore
                    setError(error.message);
            }
        }

    }, [pyodide, setError, setOutput]);

    useEffect(() => {

        if(code !== null && code !== undefined) {
            executeCode(code, input);


            }

    }, [code, selectedFile, pyodide, input]);

    useEffect(() => {
        if(editorRef.current)
            setEditorRef(editorRef);
    }, [setEditorRef, editorRef]);

    const saveCode = React.useCallback( async (newCode: string, viewUpdate: ViewUpdate) => {
        setCode(newCode);
    }, [setCode]);


        return (<div ref={editorRef} className={styles.editor}>
        <div className={styles.editorAndInputHeader}>Python Code</div>
        <div className={styles.editorInnerBox}>
            <CodeMirrorEditor code={code} onCodeChange={saveCode}/>
        </div>

    </div>);
}