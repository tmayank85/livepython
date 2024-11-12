"use client"

import styles from "../styles/file-section.module.css"
import FileList from "@/components/idle/fileSection/FileList";
import {useEffect, useState} from "react";

export default function FileSection() {

    const files = ["untitled1.py", "untitled2.py", "untitled3.py", "untitled4.py"];
    const [selectedFile, setSelectedFile] = useState(1);


    const onFileClick = (index: number) => {
        setSelectedFile(index);
    }


    return (
        <div className={styles.fileSection}>
            <div className={styles.fileSectionHeader}><span>Files</span></div>
            <FileList fileList={files} selectedFile={selectedFile} onFileClick={onFileClick}/>
        </div>
    )
}