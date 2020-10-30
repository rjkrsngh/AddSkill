# -*- coding: utf-8 -*-
"""
Created on Tue Nov  3 20:32:04 2020

@author: raj
"""

class MinStack:

    def __init__(self):
        """
        initialize your data structure here.
        """
        self.minVal = 9999999999
        self.stack = []
        
    def findNewMinimum(self):
        self.minVal = 9999999999
        for i in self.stack:
            if i<self.minVal:
                self.minVal = i
        
    def push(self, x: int):
        if x < self.minVal:
            self.minVal = x
            self.stack.append(x)
        else:
            self.stack.append(x)

    def pop(self):
        if self.stack[-1] == self.minVal:
            del(self.stack[-1])
            self.findNewMinimum()
        else:
            del(self.stack[-1])
        
    def top(self):
        print(self.stack)
        return self.stack[-1]
        
    def getMin(self):
        return self.minVal
        


# Your MinStack object will be instantiated and called as such:
# obj = MinStack()
# obj.push(x)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.getMin()