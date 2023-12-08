var options = { year: 'numeric', month: 'short', day: 'numeric' };

function formatDate(date) {
    return new Date(date).toLocaleDateString("en-GB", options)
}

export {
    formatDate
}
