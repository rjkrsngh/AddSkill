class Solution:
    def isPalindrome(self, head: ListNode) -> bool:
        lst = []
        if not head:
            return True
        else:
            curr= head
            while curr:
                lst.append(curr.val)
                curr=curr.next
                
            for i in range(int(len(lst)/2)):
                if lst[i]!=lst[len(lst)-1-i]:
                    return False
            return True