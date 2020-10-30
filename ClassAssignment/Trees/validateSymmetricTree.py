
### 193/195 TEST CASES PASSED

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

#This solution does't work because for many configuration of a tree can generate the same inorder traversal
class Solution:
    def __init__(self):
        self.inorderList = []
        
    def isSymmetric(self, root: TreeNode) -> bool:
        if root is None or (root.right == None and root.left == None):
            return True
        self.genInorderList(root)
        #print(self.inorderList)
        ind = self.inorderList.index(root.val)
        #print(ind)
        rightSubTree = self.inorderList[ind+1:]
        rightSubTree.reverse()
        #print(self.inorderList[:ind], rightSubTree)
        
        return self.inorderList[:ind] == rightSubTree
            
    def genInorderList(self, root: TreeNode) -> None:
        if root:
            if root.left == None and root.right == None:
                self.inorderList.append(root.val)
                return
            
            if root.left is None:
                self.inorderList.append(None)
            else:
                self.genInorderList(root.left)
                
            self.inorderList.append(root.val)
            
            if root.right is None:
                self.inorderList.append(None)
            else:
                self.genInorderList(root.right)



# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def __init__(self):
        self.inorderList = []
        
    def isSymmetric(self, root: TreeNode) -> bool:
        if root is None or (root.right == None and root.left == None):
            return True
        return self.chkSym(root.left, root.right)
    
        
    def chkSym(self, leftRoot: TreeNode, rightRoot: TreeNode) -> bool:
        if (not leftRoot and rightRoot) or (not rightRoot and leftRoot):
            return False
        elif (not leftRoot and not rightRoot):
            return True
        elif leftRoot.val != rightRoot.val:
            return False
        return self.chkSym(leftRoot.left, rightRoot.right) and self.chkSym(leftRoot.right, rightRoot.left) 
