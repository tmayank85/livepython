"use client"

import styles from "../styles/file-section.module.css"
import FileList from "@/components/fileSection/FileList";
import {useEffect, useRef, useState} from "react";
import CreateNewFileButton from "@/components/fileSection/CreateNewFileButton";
import {createNewFile, getFile, getFileNameList, saveFile} from "@/app/utils/fileUtils";

export default function FileSection({code, setCode, selectedFile, setSelectedFile, setFileSectionRef}) {

    const [fileNameList, setFileNameList] = useState([]);
    const fileSectionRef = useRef(null);

    useEffect(() => {
        setFileNameList(getFileNameList());
        setSelectedFile(0);

    }, []);



    const onFileClick = (index: number) => {
        setSelectedFile(index);
    }

    function onCreateNewFileClick(){
        createNewFile();
        setFileNameList(getFileNameList());
    }

    useEffect(() => {
        const file = getFile(fileNameList[selectedFile]);
        setCode(file.fileContent)
    }, [selectedFile, fileNameList]);

    useEffect(() => {
        const fileName = fileNameList[selectedFile];
        if(fileName!==null && fileName !== undefined && code!==undefined && code!==null) {
            saveFile(fileName, code)
        }
    }, [code]);

    useEffect(() => {
        if(fileSectionRef.current)
            setFileSectionRef(fileSectionRef)
    }, [fileSectionRef]);

    return (
        <div ref={fileSectionRef} className={styles.fileSection}>
            <div className={styles.fileSectionHeader}><span>Files</span></div>
            <div className={styles.fileSectionInnerBox}>
                <CreateNewFileButton onButtonClick={onCreateNewFileClick}/>
                <div className={styles.fileContainer}>
                <FileList fileList={fileNameList} selectedFile={selectedFile} onFileClick={onFileClick}/>
                </div>
            </div>

        </div>
    )
}