# -*- coding: utf-8 -*-
"""
Created on Sun Nov  1 20:43:11 2020

@author: raj
"""

class Solution(object):
    def insert(self, intervals, newInterval):

        # if intervals is empty, return list of newInterval
        if not intervals:
            return [newInterval]

        #if the iterval to be inserted is the smallest
        if newInterval[1] < intervals[0][0]:
            return [newInterval].extend(intervals)

        #if the interval to be inserted is largest
        if newInterval[0] > intervals[-1][1]:
            return intervals.extend([newInterval])
        
        # find the new interval position
        i = 0
        out = []
        while i < len(intervals):
            if newInterval[0] < intervals[i][0]:
                out.append(newInterval)
                break
            if intervals[i][0] <= newInterval[0] <= intervals[i][1]:
                out.append([intervals[i][0], max(intervals[i][1], newInterval[1])])
                i += 1
                break
                
            out.append(intervals[i])   
            i += 1
            
        #merge the intervals here
        while i < len(intervals):
            if intervals[i][0] > out[-1][1]:
                break
            out[-1] = [out[-1][0], max(out[-1][1], intervals[i][1])]
            i += 1
            
        return out + intervals[i:]

print(Solution().insert([[1,3],[6,9]], [2,5]))