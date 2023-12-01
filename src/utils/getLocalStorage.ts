export const getLocalStorage = <R>(key: string): R | void => {
    const localStorageString = localStorage.getItem(key);

    if (localStorageString) return JSON.parse(localStorageString);
};
