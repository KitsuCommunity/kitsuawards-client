import { convertServerDate } from 'utils';

interface DateTimeProps {
  dateTime: Date | string;
}

export const DateTime = ({ dateTime }: DateTimeProps) => {
  const date =
    typeof dateTime === 'string'
      ? new Date(convertServerDate(dateTime))
      : dateTime;

  return (
    <time dateTime={date.toISOString()}>
      {date.toLocaleString(undefined, {
        dateStyle: 'full',
        timeStyle: 'short',
      })}
    </time>
  );
};

export default DateTime;
