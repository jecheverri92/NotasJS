/* 
  Implement a function called areThereDuplicates,  which accepts a variable number of arguments,
  and checks whether there are any duplicates among the arguments passed in.
  You can solve this using the frequency counter pattern OR the multiple pointers pattern.
  areThereDuplicates(1, 2, 3);              // false
  areThereDuplicates(1, 2, 2);              // true
  areThereDuplicates('a', 'b', 'c', 'a');   // true
  Complexities:
    Time:  O(n) or better O(n log(n))
    Space: O(n) or better O(1)
*/

//Frequency counter
function areThereDuplicates(...args){
  const freq = {};
  for(let val in args){
    freq[args[val]] =  (freq[args[val]] || 0) + 1
    if(freq[args[val]]>1) return true;
  }

  return false;
  
}
console.log(areThereDuplicates(1,2,3,4));

//Multiple pointers
function areThereDuplicates2(...args){
  let start = 0;
  let next = 1;
  // Two pointers
  args.sort((a,b) => a > b);
  while(next<args.length){
    if(args[start]==args[next]){
      return true;
    }
    start++;
    next++;
  }
  return false;
}

//One Liner Solution
function areThereDuplicates3(...arguments) {
  return new Set(arguments).size !== arguments.length;
}