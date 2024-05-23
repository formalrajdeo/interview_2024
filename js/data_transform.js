const obj = [
    {
        key: 'Sample 1',
        data: 'Data1'
    },
    {
        key: 'Sample 1',
        data: 'Data1'
    },
    {
        key: 'Sample 2',
        data: 'Data2'
    },
    {
        key: 'Sample 1',
        data: 'Data1'
    },
    {
        key: 'Sample 3',
        data: 'Data1'
    },
    {
        key: 'Sample 4',
        data: 'Data1'
    }
]

const total_Sample_obj = {}
obj.map((d, i) => {
    if (!total_Sample_obj[d.key]) {
        total_Sample_obj[d.key] = []
    }
    console.log(`${Object.keys(total_Sample_obj)} == ${d.key}`)
    total_Sample_obj[d.key].push(d)
})

// console.log({ output: JSON.stringify(total_Sample_obj) })
console.dir({ output: total_Sample_obj }, { depth: null });

/*
const expected_output = {
    'Sample 1': [
        {
            key: 'Sample 1',
            data: 'Data1'
        },
        {
            key: 'Sample 1',
            data: 'Data1'
        },
        {
            key: 'Sample 1',
            data: 'Data1'
        }
    ],
    'Sample 2': [
        {
            key: 'Sample 2',
            data: 'Data2'
        }
    ],
    'Sample 3': [
        {
            key: 'Sample 3',
            data: 'Data1'
        },
    ],
    'Sample 4': [
        {
            key: 'Sample 4',
            data: 'Data1'
        }
    ]

}
*/