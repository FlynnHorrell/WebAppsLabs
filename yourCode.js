/*
 * Name 1: Flynn Horell
 * Name 2: Luke Lentz
 */

/*
 * BINARY SEARCH
 */
var binarySearch = function binarySearch(arr, val) {
   var lo, hi, mid;
   lo = 0;
   hi = arr.length-1;
   mid = Math.floor(hi/2);
   
   if(arr.length===1){
   	return arr[mid]===val;
   }
   // You may need to add things here
   while (lo<=hi) {     // You should change this with a proper condition
      // You will need to add things here
      if(arr[mid]===val){
        return true;
      }
      if(val>arr[mid]){
      	lo = mid+1;
      }
      if(val<arr[mid]){
      	hi = mid-1;
      }
      mid = Math.floor((lo+hi)/2);
   }
   return false;
   // You may need to add things here
};

/*
 * COUNTING TAGS
 */
var countTags = function countTags(items) {
   // Declare your local variables here. One was done for you.
   var tagCounts;

   // Add your code here


   return tagCounts;
};

/*
 * EXTRACT HASHTAGS
 */
var extractHashTags = function extractHashTags(str) {

};
