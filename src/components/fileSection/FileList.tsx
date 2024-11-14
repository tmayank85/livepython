import File from "@/components/fileSection/File";
import styles from "../../styles/file-section.module.css"
import DeleteFile from "@/components/fileSection/DeleteFile";

export default function FileList({fileList, selectedFile, onFileClick, setFileNameList}: {
    fileList: Array<string>,
    selectedFile: number,
    onFileClick: (index: number) => void,
    setFileNameList: React.Dispatch<React.SetStateAction<Array<string>>>
})
{

    return (
        <div className={styles.fileList}>
            {fileList.map((file, index: number) => (
                <div key={index} className={selectedFile === index? styles.fileLineSelected: styles.fileLine}>
                    <File setFileNameList={setFileNameList}  index={index} fileName={file} isSelected={selectedFile === index}  onFileClick={onFileClick}/>
                    <DeleteFile  setFileNameList={setFileNameList} fileName={file}/>
                </div>

            ))}
        </div>
    );
}
