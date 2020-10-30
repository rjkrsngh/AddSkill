# -*- coding: utf-8 -*-
"""
Created on Tue Nov  3 21:37:11 2020

@author: raj
"""

class SolutionNaive:
    def nextGreaterElements(self, nums):
        array = [0]*2*len(nums)
        res = [0]*len(nums)
        for i in range(len(array)):
            array[i] = nums[i%len(nums)]
            
        for i in range(len(res)):
            nextGreater = -1
            for j in range(i+1, len(array)):
                if array[j]>array[i]:
                    nextGreater = array[j]
                    break
            res[i] = nextGreater
            
        return res
    
class Solution:
    def nextGreaterElements(self, nums):
        l = len(nums)
        
        if l == 0:
            return []

        res = [-1]*l
        stack = []
        
        for i in range(l-2, -1, -1):
            while len(stack)>0 and stack[-1]<=nums[i]:
                stack.pop()
            stack.append(nums[i])
            
        for i in range(l-1, -1, -1):
            while len(stack)>0 and stack[-1]<=nums[i]:
                stack.pop()
                
            if len(stack) == 0:
                res[i] = -1
                
            else:
                res[i]= stack[-1]
                
            stack.append(nums[i])
        
        
        return res
        
print(Solution().nextGreaterElements([1,2,3,4,3]))
        