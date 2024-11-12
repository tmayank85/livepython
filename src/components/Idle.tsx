"use client"
import styles from "../styles/idle.module.css"
import Editor from "@/components/idle/Editor";
import Input from "@/components/idle/Input";
import Output from "@/components/idle/Output";
import Error from "@/components/idle/Error";
import {useEffect, useRef, useState} from "react";

export default function Idle(){

    const [error,setError] = useState("No Errors");
    const [output,setOutput] = useState("");


    const [editorRef, setEditorRef] = useState(useRef(null));
    const [inputRef, setInputRef] = useState(useRef(null));
    const editorAndInputSeparatorRef = useRef(null);

    const [outputRef, setOutputRef] = useState(useRef(null));
    const [errorRef, setErrorRef] = useState(useRef(null));
    const outputAndErrorSeparatorRef = useRef(null);

    const [editorAndInputParentRef, setEditorAndInputParentRef] = useState(useRef(null));
    const [outputAndErrorParentRef, setOutputAndErrorParentRef] = useState(useRef(null));
    const editorInputAndOutputErrorSeparatorRef = useRef(null);


    // resizing logic for editor and input separator
    useEffect(() => {

        let initialEditorInputSepYPos = 0;
        const minEditorHeight = "200px";
        const minInputHeight = "50px";

        const editorAndInputOnMouseMove = (event)=>{
                const dy = event.clientY - initialEditorInputSepYPos;
                initialEditorInputSepYPos = event.clientY
                let dyEditor = parseInt(editorRef.current.offsetHeight) + dy;
                let dyInput = parseInt(inputRef.current.offsetHeight) - dy;
                if(dyEditor >= parseInt(minEditorHeight)){
                    if(dyInput >= parseInt(minInputHeight)) {
                        editorRef.current.style.height = `${dyEditor}px`;
                        inputRef.current.style.height = `${dyInput}px`;
                    }
                    else{
                        dyEditor -= parseInt(minInputHeight) - dyInput;
                        editorRef.current.style.height = `${dyEditor}px`;
                        inputRef.current.style.height = minInputHeight;
                    }
                }
                else{
                    editorRef.current.style.height = minEditorHeight;
                    dyInput -= parseInt(minEditorHeight) - dyEditor;
                    inputRef.current.style.height = `${dyInput}px`;
                }


        }
        const editorAndInputOnMouseUp = (event) => {
            document.removeEventListener("mousemove", editorAndInputOnMouseMove)
        }

        const editorAndInputOnMouseDown = (event) => {
            initialEditorInputSepYPos = event.clientY;
            console.log("Mouse down")
            document.addEventListener("mousemove", editorAndInputOnMouseMove);
            document.addEventListener("mouseup", editorAndInputOnMouseUp)
        }

        // add event listener for mouse down
        if(editorRef.current && inputRef.current && editorAndInputSeparatorRef.current)
            editorAndInputSeparatorRef.current.addEventListener('mousedown', editorAndInputOnMouseDown)

    }, [editorRef, inputRef, editorAndInputSeparatorRef]);

    // resizing logic for output and error separator
    useEffect(() => {

        let initialOutputErrorSepYPos = 0;
        const minOutputHeight = "200px";
        const minErrorHeight = "50px";

        const outputAndErrorOnMouseMove = (event)=>{
            const dy = event.clientY - initialOutputErrorSepYPos;
            initialOutputErrorSepYPos = event.clientY
            let dyOutput = parseInt(outputRef.current.offsetHeight) + dy;
            let dyError = parseInt(errorRef.current.offsetHeight) - dy;
            if(dyOutput >= parseInt(minOutputHeight)){
                if(dyError >= parseInt(minErrorHeight)) {
                    outputRef.current.style.height = `${dyOutput}px`;
                    errorRef.current.style.height = `${dyError}px`;
                }
                else{
                    dyOutput -= parseInt(minErrorHeight) - dyError;
                    outputRef.current.style.height = `${dyOutput}px`;
                    errorRef.current.style.height = minErrorHeight;
                }
            }
            else{
                outputRef.current.style.height = minOutputHeight;
                dyError -= parseInt(minOutputHeight) - dyOutput;
                errorRef.current.style.height = `${dyError}px`;
            }


        }
        const outputAndErrorOnMouseUp = (event) => {
            document.removeEventListener("mousemove", outputAndErrorOnMouseMove)
        }

        const outputAndErrorOnMouseDown = (event) => {
            initialOutputErrorSepYPos = event.clientY;
            console.log("Mouse down")
            document.addEventListener("mousemove", outputAndErrorOnMouseMove);
            document.addEventListener("mouseup", outputAndErrorOnMouseUp)
        }

        // add event listener for mouse down
        if(outputRef.current && errorRef.current && outputAndErrorSeparatorRef.current)
            outputAndErrorSeparatorRef.current.addEventListener('mousedown', outputAndErrorOnMouseDown)

    }, [outputRef, errorRef, outputAndErrorSeparatorRef]);

    useEffect(() => {

        let initialEditorInputAndOutputErrorSepXPos = 0;
        const minEditorWidth = "400px";
        const minOutputWidth = "150px";

        const EditorInputAndOutputErrorOnMouseMove = (event)=>{
            const dx = event.clientX - initialEditorInputAndOutputErrorSepXPos;
            initialEditorInputAndOutputErrorSepXPos = event.clientX
            let dyEditorInput = parseInt(editorAndInputParentRef.current.offsetWidth) + dx;
            let dyOutputError = parseInt(outputAndErrorParentRef.current.offsetWidth) - dx;
            if(dyEditorInput >= parseInt(minEditorWidth)){
                if(dyOutputError >= parseInt(minOutputWidth)) {
                    editorAndInputParentRef.current.style.width = `${dyEditorInput}px`;
                    outputAndErrorParentRef.current.style.width = `${dyOutputError}px`;
                }
                else{
                    dyEditorInput -= parseInt(minOutputWidth) - dyOutputError;
                    editorAndInputParentRef.current.style.width = `${dyEditorInput}px`;
                    outputAndErrorParentRef.current.style.width = minOutputWidth;
                }
            }
            else{
                editorAndInputParentRef.current.style.width = minEditorWidth;
                dyOutputError -= parseInt(minEditorWidth) - dyEditorInput;
                outputAndErrorParentRef.current.style.width = `${dyOutputError}px`;
            }


        }
        const EditorInputAndOutputErrorOnMouseUp = (event) => {
            document.removeEventListener("mousemove", EditorInputAndOutputErrorOnMouseMove)
        }

        const EditorInputAndOutputErrorOnMouseDown = (event) => {
            initialEditorInputAndOutputErrorSepXPos = event.clientX;
            console.log("Mouse down")
            document.addEventListener("mousemove", EditorInputAndOutputErrorOnMouseMove);
            document.addEventListener("mouseup", EditorInputAndOutputErrorOnMouseUp)
        }

        // add event listener for mouse down
        if(editorAndInputParentRef.current && outputAndErrorParentRef.current && editorInputAndOutputErrorSeparatorRef.current)
            editorInputAndOutputErrorSeparatorRef.current.addEventListener('mousedown', EditorInputAndOutputErrorOnMouseDown)

    }, [editorAndInputParentRef, outputAndErrorParentRef, editorInputAndOutputErrorSeparatorRef]);



    return (
        <div className={styles.idle}>

            <div ref={editorAndInputParentRef} className={styles.editorAndInputParent}>
                <Editor setError={setError} setOutput={setOutput} setEditorRef={setEditorRef}/>
                <div ref={editorAndInputSeparatorRef} className={styles.editorAndInputSeparator}></div>
                <Input setInputRef={setInputRef}/>
            </div>

            <div ref={editorInputAndOutputErrorSeparatorRef} className={styles.editorInputAndOutputErrorSeperator}></div>

            <div ref={outputAndErrorParentRef} className={styles.outputAndErrorParent}>
                <Output output={output} setOutputRef={setOutputRef}/>
                <div ref={outputAndErrorSeparatorRef} className={styles.outputAndErrorSeparator}></div>
                <Error error={error} setErrorRef={setErrorRef}/>
            </div>

        </div>
    )

}