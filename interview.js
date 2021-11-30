let p1 = new Promise((resolve, reject) => {
    resolve('this');
})

let p2 = new Promise((resolve, reject) => {
    resolve('that');
})

let p3 = new Promise((resolve, reject) => {
    resolve('the other');
})

let pFail = new Promise((resolve, reject) => {
    reject();
})

let promiseOne = p1;
promiseOne.then(res => res).catch(err => console.log(err));

let promises = [p1, p2, p3];
let promisesWithFail = [ pFail || null, p1, p2, p3];

/**
 * 
 * This is a component to the first answer I failed to solve, how to aggregate a series of API calls
 * 
 * Promise.all(array)
 * This function logs/returns a series of calls in the order of promise coded
 * Can be used if all endpoints/dataSources are deemed reliable
 * Fails fast, meaning if a single call in the chain fails, it returns the error inside the catch block
 */
const allInSeries = async () => {
    Promise.all(promises)
    .then(results => {
        for (let i = 0; i < results.length; ++i) {
            console.log(`results[i], promise.all => `, results[i]);
        }
    }).catch(err => console.error(err))
    console.log('\n\n')
}
// allInSeries();

/**
 * 
 * - How to call API in series with potential failures with Promise()
 * -> Promise try/catch
 * - Promise.all() will not work because we are assuming the first promise or more will reject
 * - try each promise in series
 * - store results to array, log array at end
 */
const allWithPotentialFail = async() => {
    let results = [];
    let _p = null;
    for (let i = 0; i < promisesWithFail.length; ++i) {
        try {
            _p = await promisesWithFail[i];
            results.push(_p)
        } catch(err) {
            results.push(err);
        }
    }
    console.log('all with potential fail => ', results);
    console.log('\n\n')
}

// allWithPotentialFail()

/**
 * 
 * - This is the final question I failed to complete
 * - Return after the first successful api call
 * 
 * - This function returns data from the first valid endpoint in a series
 * - Use case: each endpoint is computationally expensive, the series must 
 *   be terminated after the first successful call
 */

 const firstWithPotentialFail = async() => {
    let results = [];
    let _p = null;
    for (let i = 0; i < promisesWithFail.length; ++i) {
        try {
            if (results.length > 0) {
                continue;
            } else {
                _p = await promisesWithFail[i];
                results.push(_p)
            }
        } catch(err) {
            console.error('rejection => ', err)
        }
    }
    console.log('first resolved promise => ', results);
}

// firstWithPotentialFail()

/**
 * 
 * random rejection promise with resolve after 1 second
 * resolves string message
 */
let randomPromise = new Promise((resolve, reject) => {
    if (Math.random() < .25) {
        reject()
    } else {
        setTimeout(resolve('this'), 1000)
    }
})
randomPromise
    .then(res => {console.log('random promise => ', res); return res})
    .catch(err => {throw err});