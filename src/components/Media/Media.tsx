import Gif from './Gif';
import Image from './Image';
import Streamable from './Streamable';
import YouTube from './YouTube';

interface MediaProps {
  media: string;
}

type JPG = `${string}.jpg`;
type JPEG = `${string}.jpeg`;
type PNG = `${string}.png`;
type Image = JPG | PNG | JPEG;

type YouTube = `https://youtu.be/${string}`;

const mediaType = (media: string) => {
  if (
    media.endsWith('.jpg') ||
    media.endsWith('.png') ||
    media.endsWith('.jpeg')
  ) {
    return <Image media={media} />;
  } else if (media.includes('youtu.be')) {
    // TODO: Load a thumbnail by default to prevent loading lots of videos at once
    // http://img.youtube.com/vi/<insert-youtube-video-id-here>/[Thumnail-Size].jpg
    return <YouTube media={media} />;
  } else if (media.includes('streamable')) {
    return <Streamable media={media} />;
  } else if (media.endsWith('.gifv')) {
    return <Gif media={media} />;
  } else {
    return <Image media={media} />;
  }
};

export const Media = ({ media }: MediaProps) => {
  return <div>{mediaType(media)}</div>;
};

export default Media;
