interface ImageProps {
  media: string;
}

const Image = ({ media }: ImageProps) => {
  return <img src={media} alt="" />;
};

export default Image;
