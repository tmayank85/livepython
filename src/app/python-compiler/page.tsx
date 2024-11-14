"use client"

import styles from "../../styles/globals.module.css"
import FileSection from "@/components/FileSection";
import Idle from "@/components/Idle";
import {useEffect, useRef, useState} from "react";


export default function PythonCompiler(){

    const [code, setCode] = useState("");
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(0);

    const [fileSectionRef, setFileSectionRef] = useState(useRef(null));
    const [idleRef, setIdleRef] = useState(useRef(null));
    const [fileSectionIdleSeparatorRef, setFileSectionIdleSeparatorRef] = useState(useRef(null));

    useEffect(() => {

        let initialFileSectionAndIdleSepXPos = 0;
        const minFileSectionWidth = 30;
        const minIdleWidth = 600;

        const FileSectionAndIdleOnMouseMove = (event)=>{
            const dx = event.clientX - initialFileSectionAndIdleSepXPos;
            initialFileSectionAndIdleSepXPos = event.clientX
            let finalFileSectionWidth = 0;
            let finalIdleWidth = 0;
            let dxFileSection = parseInt(fileSectionRef.current.offsetWidth) + dx;
            let dxidle = parseInt(idleRef.current.offsetWidth) - dx;
            if(dxFileSection >= minFileSectionWidth){
                if(dxidle >= minIdleWidth) {
                    finalFileSectionWidth = dxFileSection;
                    finalIdleWidth = dxidle;
                }
                else{
                    dxFileSection -= minIdleWidth - dxidle;
                    finalFileSectionWidth = dxFileSection;
                    finalIdleWidth = minIdleWidth;
                }
            }
            else{
                finalFileSectionWidth = minFileSectionWidth;
                dxidle -= minFileSectionWidth - dxFileSection;
                finalIdleWidth = dxidle;
            }
            const finalFileSectionWidthPercent = (finalFileSectionWidth/(finalFileSectionWidth+finalIdleWidth))*100;
            const finalIdleWidthPercent = (finalIdleWidth/(finalFileSectionWidth+finalIdleWidth))*100;
            fileSectionRef.current.style.width = `${finalFileSectionWidthPercent}%`;
            idleRef.current.style.width = `${finalIdleWidthPercent}%`;


        }
        const FileSectionAndIdleOnMouseUp = (event) => {
            document.removeEventListener("mousemove", FileSectionAndIdleOnMouseMove)
        }

        const FileSectionAndIdleOnMouseDown = (event) => {
            initialFileSectionAndIdleSepXPos = event.clientX;
            document.addEventListener("mousemove", FileSectionAndIdleOnMouseMove);
            document.addEventListener("mouseup", FileSectionAndIdleOnMouseUp)
        }

        // add event listener for mouse down
        if(fileSectionRef.current && idleRef.current && fileSectionIdleSeparatorRef.current)
            fileSectionIdleSeparatorRef.current.addEventListener('mousedown', FileSectionAndIdleOnMouseDown)

    }, [fileSectionRef, idleRef, fileSectionIdleSeparatorRef]);


    return (
        <div className={styles.appBody}>
            <FileSection
                setFileSectionRef={setFileSectionRef}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                code={code}
                setCode={setCode}
                input={input}
                setInput={setInput}
            />
            <div ref={fileSectionIdleSeparatorRef} className={styles.fileAndIdleSeparator} ></div>
            <Idle
                setIdleRef={setIdleRef}
                selectedFile={selectedFile}
                code={code}
                setCode={setCode}
                input={input}
                setInput={setInput}
            />
        </div>
    )

}
