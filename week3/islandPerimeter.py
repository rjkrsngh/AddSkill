class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        count = 0
        
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] == 1:
                    count += self.checkTop(grid, i, j)
                    count += self.checkLeft(grid, i, j)
                    count += self.checkRight(grid, i, j)
                    count += self.checkBottom(grid, i, j)
        return count
        
    
    def checkTop(self, grid: List[List[int]], row: int, col: int):
        if row == 0:
            return 1
        elif grid[row-1][col] == 0:
            return 1
        else:
            #print('does not contribute to top')
            return 0
        
    def checkBottom(self, grid: List[List[int]], row: int, col: int):
        if row == len(grid)-1:
            return 1
        elif grid[row+1][col] == 0:
            return 1
        else:
            #print('does not contribute to bottom')
            return 0
        
    def checkLeft(self, grid: List[List[int]], row: int, col: int):
        if col == 0:
            return 1
        elif grid[row][col-1] == 0:
            return 1
        else:
            #print('does not contribute to left')
            return 0
        
    def checkRight(self, grid: List[List[int]], row: int, col: int):
        if col == len(grid[0])-1:
            return 1
        elif grid[row][col+1] == 0:
            return 1
        else:
            #print('does not contribute to right')
            return 0
                    
                    
            
            
            
            