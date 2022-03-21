interface YouTubeProps {
  media: string;
}

const YouTube = ({ media }: YouTubeProps) => {
  const url = media.split('.be/')[1];
  return (
    <iframe
      src={`https://youtube.com/embed/${url}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default YouTube;
