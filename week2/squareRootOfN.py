class Solution:
    def mySqrt(self, x: int) -> int:
        return int(x**(0.5))


 class Solution:
    def mySqrt(self, x: int) -> int:
        i = 1; 
        # While the square root is not found 
        found = False; 
        while not found:  
            if (i * i == x): 
                found = True; 
            elif (i * i > x): 
                found = True
                i = i - 1
            else:
                i += 1;
        return i