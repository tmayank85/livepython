import styles from "../../styles/globals.module.css"
import FileSection from "@/components/FileSection";
import Idle from "@/components/Idle";


export default function pythonCompiler(){

    return (
        <div className={styles.appBody}>
            <FileSection/>
            <Idle/>
        </div>
    )

}
