function generateN(rng, num) {
    var cur = rng;
    var out = [];
    for (var idx = 0; idx != num; ++idx) {
        var nextOut = cur.next();
        out.push(nextOut[0]);
        cur = nextOut[1];
    }
    return [out, cur];
}
function skipN(rng, num) {
    return generateN(rng, num)[1];
}
export { generateN, skipN };
