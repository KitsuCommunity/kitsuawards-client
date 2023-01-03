import styles from './media.module.css';

interface YouTubeProps {
  media: string;
}

const YouTube = ({ media }: YouTubeProps) => {
  const url = media.split('.be/')[1];
  return (
    <iframe
      className={styles.video}
      src={`https://youtube.com/embed/${url}`}
      allow="picture-in-picture"
      allowFullScreen
    />
  );
};

export default YouTube;
