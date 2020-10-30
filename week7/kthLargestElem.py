# Built in solution 
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        heapq.heapify(nums)
        return heapq.nlargest(k,nums)[-1]


# self implementation
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        self.buildHeap(nums, len(nums))
        return self.getKthLargest(nums, len(nums), k)
    
    def heapify(self, arr, n, ind):
        largest = ind
        leftChildInd = 2*ind + 1
        rightChildInd = 2*ind + 2

        if leftChildInd < n and arr[largest] < arr[leftChildInd]:
            largest = leftChildInd

        if rightChildInd < n and arr[largest] < arr[rightChildInd]:
            largest = rightChildInd

        #if the parent isn't the largest
        if largest != ind:
            arr[largest], arr[ind] = arr[ind], arr[largest]
            self.heapify(arr, n, largest)
        

    def buildHeap(self, arr, n):
        #####################################################
        ## Algorithm for heap sort                         ##
        ## start from first non leaf node                  ##
        ## find its left and right node                    ##
        ## swap the current element with the greater child ##
        ## call heapify for the index of the child node    ##
        #####################################################

        currNode = n//2 - 1
        for i in range(currNode, -1, -1):
            self.heapify(arr, n, i)
        

    def getKthLargest(self, arr, n, k):
        for i in range(k-1):
            arr[0], arr[-1] = arr[-1], arr[0]
            arr.pop()
            self.heapify(arr, len(arr), 0)
        return arr[0]