class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        curr = head
        if not head:
            return None
        else:
            while curr.next:
                if curr.val == curr.next.val:
                    tmp = curr.next
                    curr.next = curr.next.next
                    tmp.next = None
                else:
                    curr = curr.next
            return head