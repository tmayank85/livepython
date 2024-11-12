"use client"

import styles from "../../styles/globals.module.css"
import FileSection from "@/components/FileSection";
import Idle from "@/components/Idle";
import {useEffect, useRef, useState} from "react";


export default function PythonCompiler(){

    const [code, setCode] = useState("");
    const [selectedFile, setSelectedFile] = useState(0);

    const [fileSectionRef, setFileSectionRef] = useState(useRef(null));
    const [idleRef, setIdleRef] = useState(useRef(null));
    const [fileSectionIdleSeparatorRef, setFileSectionIdleSeparatorRef] = useState(useRef(null));

    useEffect(() => {

        let initialFileSectionAndIdleSepXPos = 0;
        const minFileSectionWidth = "30px";
        const minIdleWidth = "800px";

        const FileSectionAndIdleOnMouseMove = (event)=>{
            const dx = event.clientX - initialFileSectionAndIdleSepXPos;
            initialFileSectionAndIdleSepXPos = event.clientX
            let dyEditorInput = parseInt(fileSectionRef.current.offsetWidth) + dx;
            let dyOutputError = parseInt(idleRef.current.offsetWidth) - dx;
            if(dyEditorInput >= parseInt(minFileSectionWidth)){
                if(dyOutputError >= parseInt(minIdleWidth)) {
                    fileSectionRef.current.style.width = `${dyEditorInput}px`;
                    idleRef.current.style.width = `${dyOutputError}px`;
                }
                else{
                    dyEditorInput -= parseInt(minIdleWidth) - dyOutputError;
                    fileSectionRef.current.style.width = `${dyEditorInput}px`;
                    idleRef.current.style.width = minIdleWidth;
                }
            }
            else{
                fileSectionRef.current.style.width = minFileSectionWidth;
                dyOutputError -= parseInt(minFileSectionWidth) - dyEditorInput;
                idleRef.current.style.width = `${dyOutputError}px`;
            }


        }
        const FileSectionAndIdleOnMouseUp = (event) => {
            document.removeEventListener("mousemove", FileSectionAndIdleOnMouseMove)
        }

        const FileSectionAndIdleOnMouseDown = (event) => {
            initialFileSectionAndIdleSepXPos = event.clientX;
            console.log("Mouse down")
            document.addEventListener("mousemove", FileSectionAndIdleOnMouseMove);
            document.addEventListener("mouseup", FileSectionAndIdleOnMouseUp)
        }

        // add event listener for mouse down
        if(fileSectionRef.current && idleRef.current && fileSectionIdleSeparatorRef.current)
            fileSectionIdleSeparatorRef.current.addEventListener('mousedown', FileSectionAndIdleOnMouseDown)

    }, [fileSectionRef, idleRef, fileSectionIdleSeparatorRef]);


    return (
        <div className={styles.appBody}>
            <FileSection setFileSectionRef={setFileSectionRef} selectedFile={selectedFile} setSelectedFile={setSelectedFile} code={code} setCode={setCode}/>
            <div ref={fileSectionIdleSeparatorRef} className={styles.fileAndIdleSeparator} ></div>
            <Idle setIdleRef={setIdleRef} selectedFile={selectedFile}  code={code} setCode={setCode} />
        </div>
    )

}
