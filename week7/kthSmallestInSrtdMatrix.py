import heapq

class Solution:
    def kthSmallest(self, matrix: List[List[int]], k: int) -> int:
        if not len(matrix):
            return 
        else:
            n = len(matrix)
            heapList = matrix[0]
            heapq.heapify(heapList)
            
            #Optimize this code
            for row in range(1, n):
                for col in range(n):
                    heapq.heappush(heapList, matrix[row][col])
            
            for i in range(k-1):
                heapq.heappop(heapList)
            return heapq.heappop(heapList)