interface ImageProps {
  media: string;
}

const Image = ({ media }: ImageProps) => {
  return <img src={media} alt="" loading="lazy" />;
};

export default Image;
