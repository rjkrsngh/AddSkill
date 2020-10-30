class Solution:
    def leastBricks(self, wall: List[List[int]]) -> int:
        if len(wall) == 0:
            return 0
        count = 0
        dictBrick = {}
        
        for brickRow in wall:
            lenBrick = 0
            for i in range(len(brickRow)-1):
                lenBrick += brickRow[i]
                dictBrick[lenBrick] = dictBrick.get(lenBrick, 0) + 1
                count = max(count, dictBrick.get(lenBrick))
                
        return len(wall) - count