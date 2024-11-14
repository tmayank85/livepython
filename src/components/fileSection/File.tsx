import styles from "../../styles/file-section.module.css"
import {getFileNameList, renameFile} from "@/app/utils/fileUtils";
import {useEffect, useRef} from "react";

export default function File({index, fileName, isSelected, onFileClick, setFileNameList}: {
    index: number,
    fileName: string,
    isSelected: boolean,
    onFileClick: (index: number) => void,
    setFileNameList: React.Dispatch<React.SetStateAction<Array<string>>>
})
{

    const  fileRef = useRef(null);
    const lengthLimit = 20;
    const allowedSpecialChars = ['-', '_', '.'];

    function handleInputChange(event){
        renameFile(fileName, event.target.innerText)
        setFileNameList(getFileNameList());
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default behavior (e.g., adding a new line)
            e.target.blur(); // Make the div lose focus (blur)
        }
        else if (e.key === 'Backspace') {
            return;
        }
        else if (e.target.innerText.length > lengthLimit ||
                (!allowedSpecialChars.includes(e.key) && !(/^[a-zA-Z0-9]+$/.test(e.key)) )
                ){
                e.preventDefault()
            }
    };


    useEffect(() => {
        if(fileRef.current) {
            fileRef.current.innerText = fileName;
        }

    }, [fileRef, fileName]);


    return (
        <>
        <div ref={fileRef} className={styles.file}
             onKeyDown={handleKeyDown}
             contentEditable={isSelected}
             onClick={() => onFileClick(index)}
             onBlur={handleInputChange}
        >
        </div>

        </>
    )
}