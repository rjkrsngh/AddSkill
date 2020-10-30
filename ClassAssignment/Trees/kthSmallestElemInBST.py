# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def __init__(self):
        self.inorderList = []
        
    def kthSmallest(self, root: TreeNode, k: int) -> int:
        self.genInorderList(root)
        print(self.inorderList)
        if k>len(self.inorderList):
            return 0
        else:
            return self.inorderList[k-1]
        
    def genInorderList(self, root: TreeNode):
        if root:
            self.genInorderList(root.left)
            self.inorderList.append(root.val)
            self.genInorderList(root.right)