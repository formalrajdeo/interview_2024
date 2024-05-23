const a = [1, 2, 3, [4, [5, 6]], 7, 8]
function flattenArray(a) {
    a.forEach(element => {
        if (Array.isArray(element)) {
            element.forEach(d => {
                if (Array.isArray(d)) {
                    d.forEach(d => console.log(d))
                } else {
                    console.log(d)
                }
            })
        } else {
            console.log(element)
        }
    });
}

const result = flattenArray(a)
console.log(result)