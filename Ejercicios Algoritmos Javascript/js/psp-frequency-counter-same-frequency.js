/*
  Write a function called sameFrequency.
  Given two positive integers, find out if the two numbers have the same frequency of digits.
  Your solution MUST have the following time complexity: O(n)

  sameFrequency(182, 281);            // true
  sameFrequency(34, 14);              // false
  sameFrequency(3589578, 5879385);    // true
  sameFrequency(22, 222);             // true
*/

function sameFrequency(num1,num2){
    const digits1 = `${num1}`.split('');      // number > string > array
    const digits2 = `${num2}`.split('');

    if(digits1.length != digits2.length) return false;

    const freq = {};

    for(let i = 0; i<digits1.length; i++){
        freq[digits1[i]] = (freq[digits1[i]] || 0) + 1;
    }
    
    for(let i = 0; i<digits2.length; i++){
        const cur = digits2[i];
        if (!freq[cur]) return false;    // if freq1[cur] reached zero, this will return false
        freq[cur]--;     // decrease freq[cur], (freq[cur] -= 1, freq[cur] = freq[cur] - 1)
    }
    return true;
    
}

console.log(sameFrequency(11121,11111));