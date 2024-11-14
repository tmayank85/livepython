import styles from "../styles/site-header.module.css";

export default function SiteHeader() {

    return (
        <header className={styles.siteHeader}>
            <img className={styles.siteLogo} src="logoLivePythonCharcol.png"/>
        </header>
    )
}