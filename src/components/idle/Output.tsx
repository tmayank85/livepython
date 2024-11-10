import styles from "../../styles/idle.module.css"

export default function Output({output}){
    return (
        <div className={styles.output}>
            <div className={styles.outputAndErrorHeader}>Output</div>

            <div className={styles.outputInnerBox}>
                <pre>
                    {output}
                </pre>
            </div>
        </div>
    );
}