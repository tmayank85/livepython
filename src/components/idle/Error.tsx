import styles from "../../styles/idle.module.css"

// @ts-ignore
export default function Error({error}){

    return (<div className={styles.error}>
        <div className={styles.outputAndErrorHeader}>Errors</div>
        <div className={styles.errorInnerBox}>
            {error}
        </div>
    </div>);
}