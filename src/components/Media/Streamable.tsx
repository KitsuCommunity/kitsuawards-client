interface StreamableProps {
  media: string;
}

const Streamable = ({ media }: StreamableProps) => {
  const url = media.split('.com/')[1];
  return (
    <iframe
      src={`https://streamable.com/e/${url}`}
      frameBorder="0"
      allowFullScreen
    />
  );
};

export default Streamable;
