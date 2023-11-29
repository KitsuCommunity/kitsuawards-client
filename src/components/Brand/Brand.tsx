import image from 'assets/favicon.png';

import styles from './brand.module.css';

export const Brand = () => {
  return (
    <div className={styles.brand}>
      <img src={image} />
      <h1>Kitsu Anime Awards</h1>
    </div>
  );
};

export default Brand;
