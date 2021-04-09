const greedyMakeChange = (n, nominals = [25, 10, 5]) => {
    nominals.sort((a, b) => b - a)
    let res = [];
    if (n < nominals[0]) {
        return "There is no such answer"
    }
    let i = 0
    while (n) {
        if (n - nominals[i] >= 0) {
            n -= nominals[i]
            res.push(nominals[i])
        } else if (n === 0) {
            break
        } else {
            i++
        }
    }
    return res
}

const bruteMakeChange = (n, nominals = [10, 6, 1]) => {
    if (n === 0) return 0;
    let minNrOfCoins;
    let curminNrOfCoins;
    nominals.forEach((v, i) => {
        if (n - v >= 0) {
            curminNrOfCoins = bruteMakeChange(n - v)
            if (minNrOfCoins === undefined || curminNrOfCoins < minNrOfCoins) {
                minNrOfCoins = curminNrOfCoins
            }
        }
    })
    return minNrOfCoins + 1
}

const cache = {}
const dynamicMakeChange = (n, nominals = [10, 6, 1]) => {
    if (cache[n] === 0) return 0;
    let minNrOfCoins;
    let curminNrOfCoins;
    nominals.forEach((v, i) => {
        if (n - v >= 0) {
            curminNrOfCoins = bruteMakeChange(n - v)
            if (minNrOfCoins === undefined || curminNrOfCoins < minNrOfCoins) {
                minNrOfCoins = curminNrOfCoins
            }
        }
    })
    cache[n] = minNrOfCoins + 1
    return cache[n]
}

// console.log(makeChange(35));
console.log(bruteMakeChange(12));
console.log(dynamicMakeChange(12));

