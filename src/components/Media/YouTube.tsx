import { useSignal } from '@preact/signals';

import { Button } from 'common';

import youtubePlay from 'assets/youtube_play.png';
import { globalUser, allowYouTube } from 'src/App';

import styles from './media.module.css';

interface YouTubeProps {
  media: string;
}

const YouTube = ({ media }: YouTubeProps) => {
  const url = media.split('.be/')[1];
  const openVideo = useSignal(false);

  console.log(url);

  if (globalUser.value.allowYouTube) {
    return (
      <div
        className={[styles.videoContainer, styles.disabled].join(' ')}
        role="button"
        onClick={() => (openVideo.value = true)}
        style={{
          backgroundImage: `url(https://img.youtube.com/vi/${url}/0.jpg)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {openVideo.value ? (
          <iframe
            className={styles.video}
            src={`https://youtube.com/embed/${url}`}
            allow="picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className={styles.playButtonContainer} aria-label="play">
            <img src={youtubePlay} />
          </div>
        )}
      </div>
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
