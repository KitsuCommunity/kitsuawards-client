interface GifProps {
  media: string;
}

const Gif = ({ media }: GifProps) => {
  const webm = media.replace(/\.gifv/, '.webm');
  const mp4 = media.replace(/\.gifv/, '.mp4');
  return (
    <video controls loop>
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
};

export default Gif;
