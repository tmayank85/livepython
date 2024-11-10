"use client";
import styles from "../../styles/idle.module.css"
import CodeMirrorEditor from "@/components/idle/CodeMirrorEditor";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ViewUpdate} from "@uiw/react-codemirror";



export default  function Editor({setError, setOutput}: {setError: Dispatch<SetStateAction<string>>, setOutput: Dispatch<SetStateAction<string>>}) {

    const [pyodide, setPyodide] = useState(null);
    const [code, setCode] = useState('# write your python code here');

    useEffect(() => {
        const initializePyodide = async () => {
            // Dynamically load the Pyodide script
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.2/full/pyodide.js'; // Correct URL for Pyodide
            script.onload = async () => {
                // After the script is loaded, load Pyodide
                try {
                    const pyodideInstance = await window.loadPyodide(); // Initialize Pyodide
                    setPyodide(pyodideInstance);
                    console.log('Pyodide initialized');
                } catch (error) {
                    console.error('Error loading Pyodide:', error);
                }
            };
            document.body.appendChild(script); // Append script to body
        };

        initializePyodide();
    }, []);


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const onCodeChange = React.useCallback( async (newCode: string, viewUpdate: ViewUpdate) => {
            setCode(newCode);
        if(pyodide){
            try{

                await pyodide.runPython(`
import sys
from io import StringIO

# Redirect stdout to capture print
old_stdout = sys.stdout
sys.stdout = StringIO()

# Python code that prints something
${newCode}

# Get the printed output
captured_output = sys.stdout.getvalue()

# Restore stdout
sys.stdout = old_stdout

captured_output
`);

                const result = pyodide.globals.get('captured_output');
                setOutput(result);
                console.log("output", result);
                setError("No Errors");
            }
            catch (error: unknown) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setError(error.message);
            }
        }

    }, [pyodide, setError, setOutput]);


    return (<div className={styles.editor}>
        <div className={styles.editorAndInputHeader}>Python Code</div>
        <div className={styles.editorInnerBox}>
            <CodeMirrorEditor code={code} onCodeChange={onCodeChange}/>
        </div>

    </div>);
}