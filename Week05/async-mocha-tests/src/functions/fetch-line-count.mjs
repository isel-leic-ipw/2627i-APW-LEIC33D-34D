/**
 * Counts the number of non-empty lines in a text string.
 * Parameters:
 *    text: The text to analyze.
 *    return: The number of non-empty lines in the text.
 */
export function countNonEmptyLines(text) {
    return text
        .split('\n')
        .filter(line => line.trim().length > 0)
        .length;
}


/**
 * Fetches a text document from a URL and returns the number of non-empty lines.
 * Parameters:
 *    url: The URL of the resource to fetch.
 *    fetchImpl=fetch: Optional custom fetch implementation used to perform the HTTP request.
 *    return {Promise<number>}: A promise that resolves to the count of non-empty lines in the fetched text.
 */
export function fetchLineCount(url, fetchImpl = fetch) {
    return fetchImpl(url)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(`HTTP error: ${response.status}`);
            }
            return response.text();
        })
        .then(countNonEmptyLines);
}