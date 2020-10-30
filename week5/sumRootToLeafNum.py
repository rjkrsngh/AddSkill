# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sumNumbers(self, root: TreeNode) -> int:
        if root is None:
            return 0
        return self.findSum(root, 0)
        #return 10*root.val + self.sumNumbers(root.left) +  10*root.val + self.sumNumbers(root.right)
        
    def findSum(self, root: TreeNode, val: int) -> int:
        if root is None:
            return 0
        
        val = val*10 + root.val
        
        if root.left == None and root.right == None:
            return val
        return self.findSum(root.left, val) + self.findSum(root.right, val)
        
        