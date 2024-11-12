import styles from "../../styles/idle.module.css"
import {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef} from "react";

export default function Error({error, setErrorRef}: {
    error: string,
    setErrorRef: Dispatch<SetStateAction<MutableRefObject<any>>>
})
{
    const errorRef = useRef(null);

    useEffect(() => {
        if(errorRef.current)
            setErrorRef(errorRef);
    }, [setErrorRef, errorRef]);

    return (<div ref={errorRef} className={styles.error}>
        <div className={styles.outputAndErrorHeader}>Errors</div>
        <div className={styles.errorInnerBox}>
            {error}
        </div>
    </div>);
}