import styles from "./footer.module.css"

export const Footer = () => {
    return (
        <>
            <footer>
                <div className={styles.line}></div>
                <div className={styles.copyright}>© 2018-2019</div>
            </footer>
        </>
    )
}