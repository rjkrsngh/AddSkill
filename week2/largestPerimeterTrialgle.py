class Solution:
    def largestPerimeter(self, A: List[int]) -> int:
        srtdArray = sorted(A)
        
        largestPerimeter = 0
        for i in range(len(srtdArray)-2):
            if self.formsTriangle(srtdArray[i], srtdArray[i+1], srtdArray[i+2]):
                sm = sum(srtdArray[i:i+3])
                if sm > largestPerimeter:
                    largestPerimeter = sm
                
        return largestPerimeter
    
    def formsTriangle(self, a, b, c):
        if (a+b > c) and (b+c > a) and (a+c > b):
            return True
        return False


class Solution:
    def largestPerimeter(self, A: List[int]) -> int:
        A.sort()
        
        largestPerimeter = 0
        for i in range(len(A)-2):
            # since the list is sorted, we only need to check for a+b>c 
            if A[i] + A[i+1] > A[i+2]:
                sm = sum(A[i:i+3])
                if sm > largestPerimeter:
                    largestPerimeter = sm
                
        return largestPerimeter