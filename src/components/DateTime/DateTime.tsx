interface DateTimeProps {
  dateTime: Date | string;
}

export const DateTime = ({ dateTime }: DateTimeProps) => {
  const date =
    typeof dateTime === 'string'
      ? new Date(
          dateTime.replace(
            /(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) (UTC)/,
            '$1T$2Z',
          ),
        )
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
