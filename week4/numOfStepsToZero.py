# -*- coding: utf-8 -*-
"""
Created on Wed Nov  4 10:25:50 2020

@author: raj
"""

class Solution:
    def numberOfSteps (self, num):
        res = 0
        while num:
            if num%2 == 0:
                num >>= 1
                res += 1
            else:
                num -= 1
                res += 1
        return res
    
print(Solution().numberOfSteps(123))
                