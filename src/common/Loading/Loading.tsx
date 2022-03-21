import styles from './loading.module.css';

interface LoadingProps {
  fill?: boolean;
  fullscreen?: boolean;
}

export const Loading = ({ fill = false, fullscreen = false }: LoadingProps) => {
  return (
    <div className={fill ? styles.fill : fullscreen ? styles.fullscreen : ''}>
      <div className={styles.loaderOuter}>
        <div className={styles.loaderInner}></div>
      </div>
    </div>
  );
};

export default Loading;
