class Solution:
    def searchRange(self, nums, target):
        res = []
        if target in nums:
            minIndex = nums.index(target)
            maxIndex = minIndex
            while target in nums[maxIndex+1:]:
                maxIndex = maxIndex + nums[maxIndex+1:].index(target) + 1
            res.extend([minIndex, maxIndex])
            return res
        else:
            res.extend([-1, -1])
            return res

Solution().searchRange([1,2,3,4,5],)
