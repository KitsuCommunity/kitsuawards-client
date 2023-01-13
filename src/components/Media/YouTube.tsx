import { Button } from 'components/Button';
import { useContext } from 'react';
import { UserContext } from 'src/App';
import styles from './media.module.css';

interface YouTubeProps {
  media: string;
}

const YouTube = ({ media }: YouTubeProps) => {
  const [user, __, ___, allowYouTube] = useContext(UserContext);

  const url = media.split('.be/')[1];

  if (user.allowYouTube) {
    return (
      <iframe
        className={styles.video}
        src={`https://youtube.com/embed/${url}`}
        allow="picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    );
  }

  return (
    <div className={styles.video}>
      <Button onClick={() => allowYouTube()}>
        Allow displaying YouTube videos
      </Button>
    </div>
  );
};

export default YouTube;
