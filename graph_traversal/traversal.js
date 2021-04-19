const { getUser } = require('./getUser.js');

// you work for a professional social network. in this social network, a professional
// can follow other people to see their updates (think Twitter for professionals.)
// write a function that finds the job `title` that shows up most frequently given
// a set of degree of separation from you. count initial id's own job title in the total

/*
 * parameters:
 * myId                - number    - the id of the user who is the root node
 * getUser             - function - a function that returns a user's object given an ID
 * degreesOfSeparation - number   - how many degrees of separation away to look on the graph
 */
const findMostCommonTitle = (myId, getUser, degreesOfSeparation) => {

    let queue = [myId];
    const seenIds = new Set();
    const jobs = {};

    for (let i = 0; i <= degreesOfSeparation; i++) {
        queue = queue
            .filter((id) => !seenIds.has(id))
            .map(getUser)
            .map((user) => {
                seenIds.add(user.id);
                jobs[user.title] = jobs[user.title] ? jobs[user.title] + 1 : 1;
                return user.connections
            })
            .reduce((acc, cons) => acc.concat(cons))
    }

    // return Object.keys(jobs).reduce((acc, job) => jobs[acc] > jobs[job] ? acc : job)
    return Object.keys(jobs)
        .map((job) => [job, jobs[job]])
        .sort((a, b) => b[1] - a[1])[0]
}

console.log(findMostCommonTitle(1, getUser, 7));