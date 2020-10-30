# def firstLastIndex(nums, low, high, res, target):
#     if low<=high:
#         mid = low + (high-low)//2
#         print('mid: {}'.format(mid))
#         if nums[mid] == target:
#             print('equal')
#             if mid<res[0]:
#                 res[0] = mid
#             if mid>res[1]:
#                 res[1] = mid
#             firstLastIndex(nums, low, mid-1, res, target)
#             firstLastIndex(nums, mid+1, high, res, target)
                               
#         elif nums[mid]<target:
#             firstLastIndex(nums, mid+1, high, res, target)
#         else:
#             firstLastIndex(nums, low, mid-1, res, target)
#     return res

# nums = [2,3,3,3,3,3]
# target = 3
# res = [7878, -1]
# r = firstLastIndex(nums, 0, len(nums)-1, res, target)
# if r[0] > len(nums):
#     r[0] = -1
# print(r)

class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        if not len(nums):
            return [-1, -1]

        res = [2*len(nums), -1]
        res = self.firstLastIndex(nums, 0, len(nums)-1, res, target)
        if res[0] > len(nums):
            res[0] = -1
        return res

    def firstLastIndex(self, nums, low, high, res, target):
        if low<=high:
            mid = low + (high-low)//2
        
            if nums[mid] == target:
                if mid<res[0]:
                    res[0] = mid
                if mid>res[1]:
                    res[1] = mid
                self.firstLastIndex(nums, low, mid-1, res, target)
                self.firstLastIndex(nums, mid+1, high, res, target)
                
            elif nums[mid]<target:
                    self.firstLastIndex(nums, mid+1, high, res, target)
            else:
                self.firstLastIndex(nums, low, mid-1, res, target)
        return res
        