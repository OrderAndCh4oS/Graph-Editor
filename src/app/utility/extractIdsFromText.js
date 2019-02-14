export default function extractIdsFromString(str) {
    const re = /(?:{)(.*?)(?:})/g;
    const ids = [];
    let m;
    while((m = re.exec(str)) !== null) {
        ids.push(m[1]);
    }
    return ids;
}