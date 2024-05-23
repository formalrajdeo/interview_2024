const callMe = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            return resolve('OK')
        }
    })
}

(async () => {
    const result = await callMe();
    console.log({ result })
})()