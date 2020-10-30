#########################################################################################################
# NEEDS OPTIMIZAION                                                                                    ##
#                                                                                                      ##
#Runtime: 64 ms, faster than 7.85% of Python3 online submissions for Validate Binary Search Tree.      ##
#Memory Usage: 16.3 MB, less than 19.92% of Python3 online submissions for Validate Binary Search Tree.##
#########################################################################################################
class Solution:
    def __init__(self):
        self.minVal = -math.inf
        self.maxVal = math.inf
        
    def isValidBST(self, root: TreeNode) -> bool:
        return Validate().isValid(root, self.minVal, self.maxVal)
    
class Validate:
    def isValid(self, root: TreeNode, minVal: int, maxVal: int) -> bool:
        if root is None: 
            return True
        
        if root.val < minVal or root.val > maxVal: 
            return False
        
        return (self.isValid(root.left, minVal, root.val -1) and self.isValid(root.right, root.val+1, maxVal))