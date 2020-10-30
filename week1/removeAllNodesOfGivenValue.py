class Solution:
    def removeElements(self, head: ListNode, val: int) -> ListNode:
        curr = head
        if not head:
            return None
        else:
            prev = None
            while curr:
                if curr.val == val:
                    if curr==head:
                        head = head.next
                        curr = head
                    else:
                        prev.next = curr.next
                        curr = curr.next
                else:
                    prev = curr
                    curr = curr.next
            return head