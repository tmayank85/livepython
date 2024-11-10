import styles from "../styles/site-header.module.css";

export default function SiteHeader() {

    return (
        <header className={styles.siteHeader}>
            <span className={styles.siteLogo}>livepython.net</span>
        </header>
    )
}