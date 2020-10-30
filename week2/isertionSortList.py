# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def insertionSortList(self, head: ListNode) -> ListNode:
        #  grab the next node and detach the head from the list
        if not head:
            return 
        
        curr = head.next 
        head.next = None
        
        while curr:
            tmp = None; 
            tail = head
            while tail and tail.val < curr.val:
                tmp = tail
                tail = tail.next 
                
            currNode = curr.next 
            if tmp:
                tmp.next = curr
                curr.next = tail
            else:
                curr.next = head
                head = curr

            curr = currNode
            
        return head