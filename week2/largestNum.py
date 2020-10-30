class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        if len(nums) == 1:
            return str(nums[0])
        for i in range(len(nums)):
            for j in range(i+1, len(nums)):
                LR = str(nums[i]) + str(nums[j])
                RL = str(nums[j]) + str(nums[i])
                
                if RL > LR:
                    nums[i], nums[j] = nums[j], nums[i]

        largest = ''.join(str(i) for i in nums)
        if int(largest) == 0:
            return '0'
        else:
            return largest