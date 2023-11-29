import styles from './media.module.css';

interface StreamableProps {
  media: string;
}

const Streamable = ({ media }: StreamableProps) => {
  const url = media.split('.com/')[1];
  return (
    <iframe
      className={styles.video}
      allow="picture-in-picture"
      src={`https://streamable.com/e/${url}`}
      allowFullScreen
      loading="lazy"
    />
  );
};

export default Streamable;
