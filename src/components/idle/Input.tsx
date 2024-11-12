import styles from "../../styles/idle.module.css"
import {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef} from "react";

export default function Input({setInputRef}:
{
    setInputRef:  Dispatch<SetStateAction<MutableRefObject<any>>>
}){

    const inputRef = useRef(null);

    useEffect(() => {
        if(inputRef.current)
            setInputRef(inputRef);
    }, [setInputRef, inputRef]);

    return (<div ref={inputRef} className={styles.input}>
        <div className={styles.editorAndInputHeader}>Input</div>

    </div>);
}