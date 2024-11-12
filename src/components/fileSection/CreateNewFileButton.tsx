import styles from "../../styles/file-section.module.css"
import {createNewFile} from "@/app/utils/fileUtils";


export default function CreateNewFileButton({onButtonClick}: {onButtonClick: ()=>void}) {
    return (
        <div className={styles.createNewFile}>
            <button onClick={onButtonClick} className={styles.createNewFileButton}>+ Create new file</button>
        </div>
    )
}