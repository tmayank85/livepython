import styles from "../../../styles/file-section.module.css"

export default function File({index, fileName, isSelected, onFileClick}: {
    index: number,
    fileName: string,
    isSelected: boolean,
    onFileClick: (index: number) => void,
})
{

    console.log("file: ", isSelected)

    return (
        <div className={isSelected ? styles.selectedFile: styles.file} onClick={() => onFileClick(index)}>
            {fileName}
        </div>
    )
}