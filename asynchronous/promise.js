// Creating promise
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
        // reject(new Error('message'));
    }, 2000);
});


// Consuming promise
p
    .then(result => console.log(result)) 
    .catch(err => console.log(err.message));