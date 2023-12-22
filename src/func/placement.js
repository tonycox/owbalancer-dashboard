
function sortByPlace(array, access = (f) => {return f.place}) {
    return array.sort((a, b) => {
        if (access(a) === null) {
            return 1;
        }
        if (access(b) === null) {
            return -1;
        }
        return access(a) - access(b)
    });
}

export {
    sortByPlace
}
