class Solution:
    def dailyTemperatures(self, T: List[int]) -> List[int]:
        res = [0]*len(T)
        stack = [(T[0], 0)]
        
        for i in range(1, len(T)):
            while len(stack) and T[i]>stack[-1][0]:
                res[stack[-1][1]] = i - stack[-1][1]
                stack.pop()
            stack.append((T[i], i))
            
        return res