# -*- coding: utf-8 -*-
"""
Created on Fri Oct 23 15:07:43 2020

@author: raj
"""


""" If an element exists, return its index. Else return the index where it would have been
in a sorted array. """

class Solution:
    def searchInsert(self, nums, target):
        res = self.findIndex(nums, 0, len(nums)-1, target)
        print('res: ', res)
        return res
    
    #findIndex is a Binary search based function
    def findIndex(self, nums, low, high, target):
        if low<=high:
            mid = low + (high-low)//2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                # for the case when the target is greater than the maximum
                # element of the array
                if mid == len(nums)-1:
                    return mid+1
                # for the case when the element lies within the mid and mid+1 element
                elif nums[mid+1] > target:
                    return mid+1
                return self.findIndex(nums, mid+1, high, target)
            else:
                # when target is smaller than the smalles element of the array
                if mid < 0: 
                    return 0
                #for the case when the element lies within the mid and mid-1
                elif nums[mid-1] < target:
                    return mid
                return self.findIndex(nums, low, mid-1, target)

        else:
            return high+1
    
    
s = Solution()
print(s.searchInsert([1,3,5,6], 0))
        
        