"use client"
import styles from "../styles/idle.module.css"
import Editor from "@/components/idle/Editor";
import Input from "@/components/idle/Input";
import Output from "@/components/idle/Output";
import Error from "@/components/idle/Error";
import {useEffect, useRef, useState} from "react";

export default function Idle({code, setCode, selectedFile, setIdleRef, input, setInput}){

    const [error,setError] = useState("No Errors");
    const [output,setOutput] = useState("");

    const idleRef = useRef(null);

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
        const minEditorHeight = 200;
        const minInputHeight = 50;

        const editorAndInputOnMouseMove = (event)=>{
                const dy = event.clientY - initialEditorInputSepYPos;
                initialEditorInputSepYPos = event.clientY
                let finalEditorHeight = 0;
                let finalInputHeight = 0;
                let dyEditor = parseInt(editorRef.current.offsetHeight) + dy;
                let dyInput = parseInt(inputRef.current.offsetHeight) - dy;
                if(dyEditor >= minEditorHeight){
                    if(dyInput >= minInputHeight) {
                        finalEditorHeight = dyEditor;
                        finalInputHeight = dyInput;
                    }
                    else{
                        dyEditor -= minInputHeight - dyInput;
                        finalEditorHeight = dyEditor;
                        finalInputHeight = minInputHeight;
                    }
                }
                else{
                    finalEditorHeight = minEditorHeight;
                    dyInput -= parseInt(minEditorHeight) - dyEditor;
                    finalInputHeight = dyInput;
                }
                const finalEditorHeightPercent = (finalEditorHeight/(finalEditorHeight + finalInputHeight + 8)) * 100;
                const finalInputHeightPercent = (finalInputHeight/(finalEditorHeight + finalInputHeight + 8)) * 100;

                editorRef.current.style.height = finalEditorHeightPercent + "%";
                inputRef.current.style.height = finalInputHeightPercent + "%";

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
        const minOutputHeight = 200;
        const minErrorHeight = 50;

        const outputAndErrorOnMouseMove = (event)=>{
            const dy = event.clientY - initialOutputErrorSepYPos;
            initialOutputErrorSepYPos = event.clientY

            let finalOutputHeight = 0
            let finalErrorHeight = 0;

            let dyOutput = parseInt(outputRef.current.offsetHeight) + dy;
            let dyError = parseInt(errorRef.current.offsetHeight) - dy;
            if(dyOutput >= minOutputHeight){
                if(dyError >= minErrorHeight) {
                    finalOutputHeight = dyOutput;
                    finalErrorHeight = dyError;
                }
                else{
                    dyOutput -= minErrorHeight - dyError;
                    finalOutputHeight = dyOutput;
                    finalErrorHeight = minErrorHeight;
                }
            }
            else{
                finalOutputHeight = minOutputHeight;
                dyError -= minOutputHeight - dyOutput;
                finalErrorHeight = dyError;
            }
            const finalOutputHeightPercent = (finalOutputHeight/(finalOutputHeight + finalErrorHeight + 6))*100;
            const finalErrorHeightPercent = (finalErrorHeight/(finalOutputHeight + finalErrorHeight + 6))*100;

            outputRef.current.style.height = finalOutputHeightPercent + "%";
            errorRef.current.style.height = finalErrorHeightPercent + "%";

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
        const minEditorWidth = 400;
        const minOutputWidth = 150;

        const EditorInputAndOutputErrorOnMouseMove = (event)=>{
            const dx = event.clientX - initialEditorInputAndOutputErrorSepXPos;
            initialEditorInputAndOutputErrorSepXPos = event.clientX
            let finalEditorWidth = 0;
            let finalOutputWidth = 0;

            let dyEditorInput = parseInt(editorAndInputParentRef.current.offsetWidth) + dx;
            let dyOutputError = parseInt(outputAndErrorParentRef.current.offsetWidth) - dx;
            if(dyEditorInput >= minEditorWidth){
                if(dyOutputError >= minOutputWidth) {
                    finalEditorWidth = dyEditorInput;
                    finalOutputWidth = dyOutputError;
                }
                else{
                    dyEditorInput -= minOutputWidth - dyOutputError;
                    finalEditorWidth = dyEditorInput;
                    finalOutputWidth = minOutputWidth;
                }
            }
            else{
                finalEditorWidth = minEditorWidth;
                dyOutputError -= minEditorWidth - dyEditorInput;
                finalOutputWidth = dyOutputError;
            }

            const finalEditorWidthPercent = (finalEditorWidth / (finalEditorWidth + finalOutputWidth)) * 100;
            const finalOutputWidthPercent = (finalOutputWidth / (finalEditorWidth + finalOutputWidth)) * 100;

            editorAndInputParentRef.current.style.width = `${finalEditorWidthPercent}%`;
            outputAndErrorParentRef.current.style.width = `${finalOutputWidthPercent}%`;


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

    useEffect(() => {
        if(idleRef.current)
            setIdleRef(idleRef)
    }, [idleRef]);


    return (
        <div ref={idleRef} className={styles.idle}>

            <div ref={editorAndInputParentRef} className={styles.editorAndInputParent}>
                <Editor setError={setError} setOutput={setOutput} setEditorRef={setEditorRef} code={code} setCode={setCode}
                selectedFile={selectedFile}
                input={input}
                />
                <div ref={editorAndInputSeparatorRef} className={styles.editorAndInputSeparator}></div>
                <Input setInputRef={setInputRef} input={input} setInput={setInput}/>
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