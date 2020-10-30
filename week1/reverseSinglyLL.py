class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        temp = None
        curr = head
        while curr:
            nxt = curr.next
            curr.next = temp
            temp = curr
            curr = nxt
        return temp