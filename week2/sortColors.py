# -*- coding: utf-8 -*-
"""
Created on Sun Nov  1 21:03:49 2020

@author: raj
"""

class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        if len(nums) == 0:
            return
        
        left = 0
        right = len(nums) - 1
        i = 0
        while i <= right:
            if nums[i] == 0:
                if left == i:
                    i += 1
                else:
                    nums[left], nums[i] = nums[i], nums[left]
                left += 1
            elif 1 == nums[i]:
                i += 1
            else:
                if right == i:
                    i += 1
                else:
                    nums[right], nums[i] = nums[i], nums[right]
                right -= 1
        print(nums)
        
Solution().sortColors([2,0,2,1,1,0])