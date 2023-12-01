export const convertServerDate = (dateTime: string) => {
    return new Date(
        dateTime.replace(
            /(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) (UTC)/,
            '$1T$2Z',
        ),
    );
};
