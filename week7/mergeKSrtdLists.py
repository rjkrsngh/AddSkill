# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
import heapq
class Solution:
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        if len(lists) == 0:
            return None
        elif len(lists) == 1:
            return lists[0]
        else:
            head = None
            last = head
            heapList = []
            heapq.heapify(heapList)
            
            for i in range(len(lists)):
                if lists[i] is not None:
                    currNode = lists[i]
                    while currNode:
                        heapq.heappush(heapList, currNode.val)
                        currNode = currNode.next
                        
            while len(heapList):
                if head is None:
                    head = ListNode(heapq.heappop(heapList))
                    last = head
                else:
                    last.next = ListNode(heapq.heappop(heapList))
                    last = last.next
                    
            return head