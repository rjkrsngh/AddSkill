class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        r = None
        if len(matrix) == 0 or len(matrix[0]) == 0:
            return False
        
        for i in range(len(matrix)):
            if matrix[i][0]<=target<=matrix[i][-1]:
                r = i
                break
        
        if r is not None:
            return self.binSearch(matrix[r], 0, len(matrix[0]), target)
        return False
        
    def binSearch(self, array, low, high, target):
        #print('low: {}, high: {}'.format(low, high))
        while low<=high:
            mid = low + (high-low)//2
            #print('mid: {}'.format(mid))
            if array[mid] == target:
                return True
            elif array[mid] > target:
                high = mid - 1
            else:
                low = mid + 1
                
        return False