import styles from "../../styles/idle.module.css"
import {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef} from "react";

export default function Output({output, setOutputRef}: {
    output: string,
    setOutputRef: Dispatch<SetStateAction<MutableRefObject<any>>>

})
{
    const outputRef = useRef(null);

    useEffect(() => {
        if(outputRef.current)
            setOutputRef(outputRef);
    }, [setOutputRef, outputRef]);

    return (
        <div ref={outputRef} className={styles.output}>
            <div className={styles.outputAndErrorHeader}>Output</div>

            <div className={styles.outputInnerBox}>
                <pre>
                    {output}
                </pre>
            </div>
        </div>
    );
}