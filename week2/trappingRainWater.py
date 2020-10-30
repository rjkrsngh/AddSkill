class Solution:
    def trap(self, height: List[int]) -> int:
        stack = []
        waterStored = 0
        
        for i in range(len(height)):
            while len(stack) > 0 and height[stack[-1]] < height[i]:
                h = height[stack.pop()]
                
                if len(stack) == 0:
                    break
                    
                breadth = i - stack[-1] -1
                minHeight = min(height[stack[-1]], height[i]) - h
                
                waterStored += breadth * minHeight
            stack.append(i)
                
        return waterStored
        