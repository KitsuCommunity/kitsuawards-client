import styles from './loading.module.css';

interface LoadingProps {
    fill?: boolean;
    fullscreen?: boolean;
    className?: string;
}

export const Loading = ({
    fill = false,
    fullscreen = false,
    className,
}: LoadingProps) => {
    return (
        <div
            className={[
                fill ? styles.fill : fullscreen ? styles.fullscreen : '',
                className,
            ].join(' ')}
        >
            <div className={styles.loaderOuter}>
                <div className={styles.loaderInner}></div>
            </div>
        </div>
    );
};

export default Loading;
