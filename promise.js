let p = new Promise((resolve, reject) => resolve('resolved'))
let randomP1 = new Promise((resolve, reject) => {
    let r = Math.random()
    if (r > .25 && r < .75) {
        reject('rejection: Math.random() was between .25 and .75');
    } else {
        setTimeout(resolve('resolved'), 1000)
    }
})
let randomP2 = new Promise((resolve, reject) => {
    let r = Math.random()
    if (r > .25 && r < .75) {
        reject('rejection: Math.random() was between .25 and .75');
    } else {
        setTimeout(resolve('resolved'), 1000)
    }
})
let randomP3 = new Promise((resolve, reject) => {
    let r = Math.random()
    if (r > .25 && r < .75) {
        reject('rejection: Math.random() was between .25 and .75');
    } else {
        setTimeout(resolve('resolved'), 1000)
    }
})
let allPromises = async () => {
    let promisesWithFail = [ randomP1, randomP2, randomP3, p ]
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
allPromises();