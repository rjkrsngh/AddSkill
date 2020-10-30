# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def hasPathSum(self, root: TreeNode, sum: int) -> bool:
        if root == None:
            if sum:
                return False
            if sum == 0:
                return False
        elif root:
            #if sum - root.val < 0:
                #return False
            if root.left == None and root.right == None:
                if sum - root.val == 0:
                    return True
                else:
                    return False
            return self.hasPathSum(root.left, sum-root.val) or self.hasPathSum(root.right, sum-root.val)