// this returns a promise which is already resolved
const p = Promise.resolve({ id: 1 });
p.then(result => console.log(result));

const q = Promise.reject(new Error('reason for failing...'));
q.catch(error => console.log(error));