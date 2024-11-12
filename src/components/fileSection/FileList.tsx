import File from "@/components/fileSection/File";
import styles from "../../styles/file-section.module.css"

export default function FileList({fileList, selectedFile, onFileClick}: {
    fileList: Array<string>,
    selectedFile: number,
    onFileClick: (index: number) => void
})
{

    return (
        <div className={styles.fileList}>
            {fileList.map((file, index: number) => (
                <File key={index} index={index} fileName={file} isSelected={selectedFile === index}  onFileClick={onFileClick}/>
            ))}
        </div>
    );
}
