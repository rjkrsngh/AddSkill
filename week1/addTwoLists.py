# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        retHead = None
        retCurr = retHead
        carry = 0
        
        while l1 and l2:
            sm = l1.val + l2.val + carry
            addNode = ListNode(sm%10)
            carry = sm//10
            if not retHead:
                retHead = addNode
                retCurr = retHead
            else:
                retCurr.next = addNode
                retCurr = retCurr.next
            l1=l1.next
            l2=l2.next
            
        if not l1 and l2:
            while l2:
                sm = l2.val + carry
                addNode = ListNode(sm%10)
                carry=sm//10
                retCurr.next = addNode
                retCurr = retCurr.next
                l2 = l2.next
                
        if not l2 and l1:
            while l1:
                sm = l1.val + carry
                addNode = ListNode(sm%10)
                carry=sm//10
                retCurr.next = addNode
                retCurr = retCurr.next
                l1 = l1.next
                
        if carry:
            addNode = ListNode(carry)
            retCurr.next = addNode
            retCurr = retCurr.next
        
        return retHead
        