class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        maxpro = 0
        
        i = 0
        while i<len(prices)-1:
            buy = 0
            
            # find the minimum price to buy
            while i+1 <= len(prices)-1 and prices[i]>prices[i+1]:
                i+=1
                
            #buy at the first local minimum price from current position
            buy = prices[i]
            i+=1
            
            # find the point of maximum price after buying
            for j in range(i-1, len(prices)):
                if prices[j]>buy and prices[j]-buy>maxpro:
                    maxpro = prices[j]-buy
                                
        return maxpro


#Optimized solution using stack
#Runtime: 56 ms, faster than 91.88% of Python3 online submissions for Best Time to Buy and Sell Stock.
#Memory Usage: 15 MB, less than 99.99% of Python3 online submissions for Best Time to Buy and Sell Stock.
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # if the stack is empty or contais only 1 element,
        # there is no sell point
        if not len(prices) or len(prices) == 1:
            return 0
        
        maxpro = 0
        # use a stack to store the minimum selling price of the stock
        stack = [prices[0]]    

        i = 1
        while i<len(prices):
            # if the current element is greater than the element in the stack
            if prices[i] >= stack[-1]:
                diff = prices[i] - stack[-1]
                if diff > maxpro:
                    maxpro = diff
                i += 1
            elif prices[i] < stack[-1]:
                stack.pop()
                stack.append(prices[i])
                i+=1
                
        return maxpro

#Runtime: 108 ms, faster than 9.17% of Python3 online submissions for Best Time to Buy and Sell Stock.
#Memory Usage: 14.9 MB, less than 99.99% of Python3 online submissions for Best Time to Buy and Sell Stock.
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # if the prices list is empty or contais only 1 element,
        # there is no sell point
        if not len(prices) or len(prices) == 1:
            return 0
        
        maxpro = 0
        minElem = prices[0]    

        i = 1
        while i<len(prices):
            # if the current element is greater than the element in the stack
            if prices[i] >= minElem:
                diff = prices[i] - minElem
                if diff > maxpro:
                    maxpro = diff
                i += 1
            elif prices[i] < stack[-1]:
                minElem = prices[i]
                i+=1
                
        return maxpro
