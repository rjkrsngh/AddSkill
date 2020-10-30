# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    #rootInd = 0
    def __init__(self):
        self.rootInd = 0
        
    def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
        if len(preorder) == 0:
            return None
        elif len(preorder) == 1:
            return TreeNode(preorder[0])
        else:
            return self.genTree(preorder, inorder, 0, 0, len(preorder)-1)
        
    def genTree(self, preorder: List[int], inorder: [int], rootInd: int, strtInd: int, endInd: int) -> TreeNode:
        #print('rootInd: {} strtInd: {} endInd: {}'.format(rootInd, strtInd, endInd))
        if strtInd>endInd:
            return None
        
        #This operation is costly as we are searching for index each time. As the list does not contain any duplicate element,
        # use hashing to store the index of all elements, which will allow O(1) for lookup
        node = TreeNode(preorder[self.rootInd])
        self.rootInd += 1
        #print('node with value: {} created, value of rootInd incremented to: {}'.format(node.val, self.rootInd))
        if strtInd == endInd:
            #print('equal')
            return node
        else:
            indexOfRoot = inorder.index(node.val)
            #print('index of {} in inorder list is: {}'.format(node.val, indexOfRoot))
            node.left = self.genTree(preorder, inorder, rootInd, strtInd, indexOfRoot-1)
            node.right = self.genTree(preorder, inorder, rootInd, indexOfRoot+1, endInd)
            return node